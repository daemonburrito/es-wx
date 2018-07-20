/**
 * Nexrad codecs
 */
import { bunzip } from '../utils';

// This is a list of products we know how to decode, for UIs.
export const KNOWN_PRODUCTS = [
  {
    code: `99`,
    ntr: `2`,
    productName: `Base Velocity Data Array`,
    resolution: `.13 x 1 Nmi x Deg`,
    range: `124`,
    dataLevel: `256`,
    format: `Radial Image`
  },
  {
    code: `94`,
    ntr: `1`,
    productName: `Base Reflectivity Data Array`,
    resolution: `.54 x 1 Nmi x Deg`,
    range: `248`,
    dataLevel: `256`,
    format: `Radial Image`
  }
];

// Retrieve the ascii prefixed header data
export const getAsciiHeader = arrayBuf => {
  let asciiDecoder = new TextDecoder('ascii');

  let uInt8Array = new Uint8Array(arrayBuf, 0, 31);
  return {
    dataType: asciiDecoder.decode(uInt8Array.slice(4, 5)),
    region: asciiDecoder.decode(uInt8Array.slice(5, 6)),
    station: asciiDecoder.decode(uInt8Array.slice(7, 11)),
    dayOfMonth: asciiDecoder.decode(uInt8Array.slice(12, 14)),
    hour: asciiDecoder.decode(uInt8Array.slice(14, 16)),
    minute: asciiDecoder.decode(uInt8Array.slice(16, 18)),
    productCode: asciiDecoder.decode(uInt8Array.slice(21, 24)),
    stationCode: asciiDecoder.decode(uInt8Array.slice(24, 27)),
    lineFeeds: asciiDecoder.decode(uInt8Array.slice(27, 30))
  };
};

export const getHeader = arrayBuf => {
  let view = new DataView(arrayBuf, 30, 48);
  return {
    messageCode: view.getInt16(),
    julianDate: view.getInt16(2),
    timeOfMessage: view.getInt32(4),
    messageLength: view.getInt32(8),
    sourceId: view.getInt16(12),
    destinationId: view.getInt16(14),
    blocksCount: view.getInt16(16)
  };
};

// Described in 2620001X Fig 3-6
export const getDescription = arrayBuf => {
  let view = new DataView(arrayBuf, 50, 100);
  return {
    // Figure 3-6. Graphic Product Message (Sheet 5)
    latitude: view.getInt32(), // * .001 deg N
    longitude: view.getInt32(4), // * .001 deg E
    height: view.getInt16(8), // ft
    productCode: view.getInt16(10),
    operationalMode: view.getInt16(12), // 0-2 c.OPERATIONAL_MODES
    volCovPattern: view.getInt16(14), // 1-767 Volume Coverage Pattern
    // "RDA volume coverage pattern for the scan strategy being used"

    seqNumber: view.getInt16(16), // -13, 0-32767 Sequence Number of request
    // (not from us, but the RPGOP or Class 1 user). -13 if pushed by an alert.

    volScanNumber: view.getInt16(18), // 1-80, counter
    volScanDate: view.getInt16(20), // 1-32767 MJD
    volScanTime: view.getInt32(22), // start time, s since 00:00GMT
    generationDate: view.getInt16(26), // MJD
    generationTime: view.getInt32(28), // s since 00:00GMT
    elevationNumber: view.getInt16(36), // 0-20, 0 for volume-based scans
    // The following product-dependent values are for 94, other formats
    // to follow.
    elevationAngle: view.getInt16(38), // (HWORD 30) * .1 deg -1.0 to 45.0
    // 94 has 254 values, 2-255
    thresholdMinimum: view.getInt16(40), // dBZ * 10 0="Below TH" 1="Missing"
    thresholdIncrement: view.getInt16(42), // dBZ * 10
    thresholdLevels: view.getInt16(44), // 0-255
    // this gap was levels for old product 19 (16 levels)
    maxReflectivity: view.getInt16(72), // (HWORD 47) dBZ-32 to +95, (-33 n/a)
    compressionMethod: view.getInt16(80), // 0 or 1 for bzip
    uncompressedDataSize: view.getInt32(82), // bytes
    version: view.getInt8(86),
    spotBlanking: view.getInt8(87), // bool if product
    offsetToSymbology: view.getInt32(88), // in hwords
    offsetToGraphic: view.getInt32(92), //
    offsetToTabular: view.getInt32(96) //
  };
};

// Get the array of Int8Array-packed radials
// arrayBuf: ArrayBuffer starting at Symbology
const getRadials = (arrayBuf, radialsCount, binsCount) => {
  let view = new DataView(arrayBuf, 30);

  return Array.from(
    Array(radialsCount),
    function(v, i) {
      let offset = this.offset;
      let length = view.getInt16(offset);

      let data = {
        // These are apparently contrary to the ICD documentation in Figure
        // 3-11c. Digital Radial Data Array Packet - Packet Code 16 (Sheet 1),
        // where only delta and bins are repeated for each radial. This may
        // have been mixed up with the older 16-level format (p19). Examination
        // shows that length and start angle are repeated for each radial in
        // code 16 packets.
        lengthBytes: length, // number of 8-bit values
        startAngle: view.getInt16(2 + offset), // * .1 0.0-359.9
        deltaAngle: view.getInt16(4 + offset), // * .1 0.0-2.0
        bins: new Uint8Array(view.buffer, 6 + offset, length)
      };
      this.offset = offset + length + 6;
      return data;
    },
    {
      offset: 0
    }
  );
};

// Format decribed in this Interface Control Document
// https://www.roc.noaa.gov/wsr88d/PublicDocs/ICDs/2620001X.pdf
// For packet code 16, see
// Figure 3-11c. Digital Radial Data Array Packet
const getSymbology = arrayBuf => {
  let view = new DataView(bunzip(arrayBuf.slice(150)));

  const symbology = {
    blockId: view.getInt16(2),
    blockLength: view.getInt32(4),
    layersCount: view.getInt16(8)
  };

  const layers = Array(symbology.layersCount)
    .fill()
    .map(_ => {
      return {
        length: view.getInt32(12),
        packetCode: view.getInt16(16),
        firstBinIndex: view.getInt16(18), // 0-230 Location of first range bin
        binsCount: view.getInt16(20), // 0-1840 Range bin count in radial
        centerI: view.getInt16(22), // km/4 -2048 to 2047
        centerJ: view.getInt16(24), // km/4 -2048 to 2047
        elevationCos: view.getInt16(26), // * .001 cos of elev angle for elev
        // products, 1.00 for volume products
        radialsCount: view.getInt16(28), // 1-720 total radials in product
        radials: getRadials(view.buffer, view.getInt16(28), view.getInt16(20))
      };
    });

  return {
    ...symbology,
    layers
  };
};

export const decodeP94 = arrayBuf => {
  // Example URL:
  // ftp://tgftp.nws.noaa.gov/SL.us008001/DF.of/DC.radar/DS.p94r0/SI.kewx/sn.last
  let asciiHeader = getAsciiHeader(arrayBuf),
  productHeader = getHeader(arrayBuf),
  productDescription = getDescription(arrayBuf),
  productSymbology = getSymbology(arrayBuf);

  return {
    asciiHeader,
    productHeader,
    productDescription,
    data: productSymbology
  };
};

export default {
  decodeP94
};
