import bzip2 from 'bzip2';
import fs from 'fs';

export const bunzip = arrayBuf => {
  if (process.env.REACT_APP_DUMP_BZIP) {
    const OUTPUT_PATH = `${process.cwd()}/dump/out.last`,
    bytes = new Uint8Array(arrayBuf);

    console.warn('Dumping data to filesystem...');

    fs.writeFileSync(`${OUTPUT_PATH}.bz`, bytes);
    let data = Buffer.from(bzip2.simple(bzip2.array(new Uint8Array(arrayBuf))));
    fs.writeFileSync(OUTPUT_PATH, data);
  }
  return bzip2.simple(bzip2.array(new Uint8Array(arrayBuf))).buffer;
};

// Get the bit at position i on a byte or bytes
export const getBit = (uint8r, i, rIdx = 0) => (uint8r[rIdx] & (1 << i)) !== 0;

// Get the "modified julian date" from days since unix epoch
export const MJDtoDate = unixEpochDaysUTC => {
  return new Date(unixEpochDaysUTC * 86400 * 1000);
};

export const hydrateProductJSON = productJson => {
  // in-place
  const hydrateRadial = (radial, i, r) => {
    r[i].bins = Uint8Array.from(Object.values(radial.bins));
  };

  productJson.data.layers[0].radials.forEach(hydrateRadial);

  return productJson;
};

// feature scaling factory function
export const makeScale = (min, max) => value => (value - min) / (max - min);

// extract hue from scaled rgb r,g,b ∈ [0,1]
const hue = ({ r, g, b }) => {
  const min = Math.min(r, g, b),
  max = Math.max(r, g, b),
  Δ = max - min;

  if (Δ === 0) return undefined;

  let h;

  switch (max) {
  case r:
    h = ((g - b) / Δ) * 60;
    break;

  case g:
    h = (2 + (b - r) / Δ) * 60;
    break;

  case b:
    h = (4 + (r - g) / Δ) * 60;
    break;

  default:
    return;
  }

  return h < 0 ? h + 360 : h;
};

// rgb r,g,b ∈ [0,1]
// returns h ∈ [0,360] or undefined; s,v ∈ [0,1]
const rgbToHsv = ({ r, g, b }) => {
  const max = Math.max(r, g, b),
  min = Math.min(r, g, b),
  Δ = max - min;

  return {
    h: hue({ r, g, b }),
    s: max === 0 ? 0 : Δ / max,
    v: max
  };
};

// rgb r,g,b ∈ [0,1]
// returns h ∈ [0,360] or undefined; s,l ∈ [0,1]
const rgbToHsl = ({ r, g, b }) => {
  const max = Math.max(r, g, b),
  min = Math.min(r, g, b),
  Δ = max - min,
  l = max - Δ;

  return {
    h: hue({ r, g, b }),
    s: Δ === 0 ? 0 : Δ / (l < 0.5 ? l * 2 : 2 - l * 2),
    l
  };
};

export const color = {
  hexToDec: hexColor => ({
    r: (parseInt(hexColor, 16) & 0xff0000) >> 16,
    g: (parseInt(hexColor, 16) & 0x00ff00) >> 8,
    b: parseInt(hexColor, 16) & 0x0000ff
  }),
  decToHex: decColor =>
    `${Number(decColor.r)
      .toString(16)
      .padStart(2, '0')}${Number(decColor.g)
      .toString(16)
      .padStart(2, '0')}${Number(decColor.b)
      .toString(16)
      .padStart(2, '0')}`,
  lerpRGB: (a, b, t) => ({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t
  }),
  rgbToHsv,
  rgbToHsl,

  hslToRgb: ({ h, s, l }) => {},

  lerpHSV: (a, b, t) => {}
};
