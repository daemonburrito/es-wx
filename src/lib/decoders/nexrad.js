/**
 * Nexrad codecs
 */
import { bunzip } from '../util';

// This is a list of products we know how to decode, for UIs.
export const KNOWN_PRODUCTS = [
  {
    code: `94`,
    ntr: `1`,
    productName: `Base Reflectivity Data Array`,
    resolution: `.54 x 1 Nmi x Deg`,
    range: `248`,
    dataLevel: `256`,
    format: `Radial Image`
  },
  {
    code: `99`,
    ntr: `2`,
    productName: `Base Velocity Data Array`,
    resolution: `.13 x 1 Nmi x Deg`,
    range: `124`,
    dataLevel: `256`,
    format: `Radial Image`
  }
];

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
    latitude: view.getInt32(),
    longitude: view.getInt32(4),
    height: view.getInt16(8),
    productCode: view.getInt16(10),
    operationalMode: view.getInt16(12),
    volCovPattern: view.getInt16(14),
    seqNumber: view.getInt16(16),
    volScanNumber: view.getInt16(18),
    volScanDate: view.getInt16(20),
    volScanTime: view.getInt32(22),
    generationDate: view.getInt16(26),
    generationTime: view.getInt32(28),
    elevationNumber: view.getInt16(36),
    elevationAngle: view.getInt16(38),
    thresholdMinimum: view.getInt16(40),
    thresholdIncrement: view.getInt16(42),
    thresholdLevels: view.getInt16(44),
    maxReflectivity: view.getInt16(72),
    compressionMethod: view.getInt16(80),
    uncompressedDataSize: view.getInt32(82),
    version: view.getInt8(86),
    offsetToSymbology: view.getInt32(88),
    offsetToGraphic: view.getInt32(92),
    offsetToTabular: view.getInt32(96)
  };
};

export const decodeP94 = arrayBuf => {
  // Example URL:
  // ftp://tgftp.nws.noaa.gov/SL.us008001/DF.of/DC.radar/DS.p94r0/SI.kewx/sn.last

  // Format decribed in this Interface Control Document
  // https://www.roc.noaa.gov/wsr88d/PublicDocs/ICDs/2620001X.pdf

  const getSymbology = arrayBuf => {
    let view = new DataView(bunzip(arrayBuf.slice(150)));

    const symbology = {
      blockId: view.getInt16(2),
      blockLength: view.getInt32(4),
      layersCount: view.getInt16(8)
    };

    const getRadials = (arrayBuf, radialsCount, binsCount) => {
      let view = new DataView(arrayBuf, 30);

      return Array.from(
        Array(radialsCount),
        function(v, i) {
          let offset = this.offset;
          let length = view.getInt16(offset);

          let data = {
            lengthBytes: length,
            startAngle: view.getInt16(2 + offset),
            deltaAngle: view.getInt16(4 + offset),
            bins: new Int8Array(view.buffer, 6 + offset, length)
          };
          this.offset = offset + length + 6;
          return data;
        },
        {
          offset: 0
        }
      );
    };

    const layers = Array(symbology.layersCount)
      .fill()
      .map(_ => {
        return {
          length: view.getInt32(12),
          packetCode: view.getInt16(16),
          firstBinIndex: view.getInt16(18),
          binsCount: view.getInt16(20),
          centerI: view.getInt16(22),
          centerJ: view.getInt16(24),
          elevationCos: view.getInt16(26),
          radialsCount: view.getInt16(28),
          radials: getRadials(view.buffer, view.getInt16(28), view.getInt16(20))
        };
      });

    return {
      ...symbology,
      layers
    };
  };

  let asciiHeader = getAsciiHeader(arrayBuf),
  productHeader = getHeader(arrayBuf),
  productDescription = getDescription(arrayBuf),
  productSymbology = getSymbology(arrayBuf);

  return {
    asciiHeader,
    productHeader,
    productDescription,
    productSymbology
  };
};
