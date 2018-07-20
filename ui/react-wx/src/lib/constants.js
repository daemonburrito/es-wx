// The old 16-level thresholds and colors (19, etc)
// precip mode
// These form points for interpolating values in the
// 254-level products (94, etc), with a few changes:
/*
For products 32, 94, 153, 193, and 195, data level codes 0 and 1 correspond to
"Below Threshold" and "Missing", respectively. Data level codes 2 through 255
denote data values starting from the minimum data value in even data increments
except data level 2 for product 193 corresponds to "edit/remove". The threshold
level fields are used to describe the 256 levels as follows:

halfword 31 contains the minimum data value in dBZ * 10
halfword 32 contains the increment in dBZ * 10.
halfword 33 contains the number of levels (0-255)
*/
// There seems to be some artistic license for rendering the 254-level colors.
// The important parts are the ~50-60dBZ "Heavy" precip, 60-65dBZ "Severe", and
// >75dBZ "Intense". Heavy is traditionally red->dark red, Severe is
// white->purple, and Intense is cyan->aquamarine.
export const COLOR_CODES_16_PRECIP = [
  {
    code: 0,
    display: 0, // display dBZ (was actually "no display")
    range: [null, 5], // SNR < TH || dBZ < 5
    color: '000000'
  },
  {
    code: 1,
    display: 5, // display dBZ
    range: [5, 10], // 5 ⋜ dBZ ⋜ 10
    color: '9c9c9c'
  },
  {
    code: 2,
    display: 10,
    range: [10, 15],
    color: '767676'
  },
  {
    code: 3,
    display: 15,
    range: [15, 20],
    color: 'ffaaaa'
  },
  {
    code: 4,
    display: 20,
    range: [20, 25],
    color: 'ee8c8c'
  },
  {
    code: 5,
    display: 25,
    range: [25, 30],
    color: 'c97070'
  },
  {
    code: 6,
    display: 30,
    range: [30, 35],
    color: '00fb90'
  },
  {
    code: 7,
    display: 35,
    range: [35, 40],
    color: '00bb00'
  },
  {
    code: 8,
    display: 40,
    range: [40, 45],
    color: 'ffff70'
  },
  {
    code: 9,
    display: 45,
    range: [45, 50],
    color: 'd0d060'
  },
  {
    code: 'A',
    display: 50,
    range: [50, 55],
    color: 'ff6060'
  },
  {
    code: 'B',
    display: 55,
    range: [55, 60],
    color: 'da0000'
  },
  {
    code: 'C',
    display: 60,
    range: [60, 65],
    color: 'ae0000'
  },
  {
    code: 'D',
    display: 65,
    range: [65, 70],
    color: '0000ff'
  },
  {
    code: 'E',
    display: 70,
    range: [70, 75],
    color: 'ffffff'
  },
  {
    code: 'F',
    display: 75,
    range: [75],
    color: 'e700ff'
  }
];

// Float32Array lookup table
export const DEGS_TO_RADS = Float32Array.of(
  ...[...Array(360).keys()].map(i => (i * Math.PI) / 180)
);
