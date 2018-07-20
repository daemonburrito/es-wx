import * as utils from '../utils';

describe('es-wx utils', () => {
  describe('MJDtoDate', () => {
    it('translates Modified Julian Date days to a Date object', () => {
      // fixture is 2018-07-04 20:33 CDT, which will be 2018-07-05 zulu
      const DATE_MJD_DAYS = 17717,
      expectedToString = `Wed Jul 04 2018 19:00:00 GMT-0500 (Central Daylight Time)`,
      d = utils.MJDtoDate(DATE_MJD_DAYS);
      expect(d.toString()).toBe(expectedToString);
    });
  });

  describe('scaling', () => {
    const scale8bit = utils.makeScale(0, 254);
    it('rescales', () => {
      expect(scale8bit(128)).toBeCloseTo(0.5);
    });
  });

  describe('color utils', () => {
    const scale8bit = utils.makeScale(0, 255);

    const RED_HEX = 'ff0000',
    GREEN_HEX = '00ff00',
    BLUE_HEX = '0000ff',
    WHITE_HEX = 'ffffff',
    BLACK_HEX = '000000',
    RED_DEC = { r: 255, g: 0, b: 0 },
    GREEN_DEC = { r: 0, g: 255, b: 0 },
    BLUE_DEC = { r: 0, g: 0, b: 255 },
    WHITE_DEC = { r: 255, g: 255, b: 255 },
    BLACK_DEC = { r: 0, g: 0, b: 0 },
    WHITE_HSL_SCALED = { h: undefined, s: 0.0, l: 1.0 },
    WHITE_HSV_SCALED = { h: undefined, s: 0.0, v: 1.0 },
    TURQUOISE_DEC = { r: 64, g: 224, b: 208 },
    TURQUOISE_HSV_SCALED = { h: 174, s: 0.71, v: 0.88 };

    describe('hexToDec', () => {
      it('converts from hex to decimal RGB', () => {
        expect(utils.color.hexToDec(RED_HEX)).toEqual(RED_DEC);
        expect(utils.color.hexToDec(GREEN_HEX)).toEqual(GREEN_DEC);
        expect(utils.color.hexToDec(BLUE_HEX)).toEqual(BLUE_DEC);
        expect(utils.color.hexToDec(WHITE_HEX)).toEqual(WHITE_DEC);
        expect(utils.color.hexToDec(BLACK_HEX)).toEqual(BLACK_DEC);
      });
    });

    describe('decToHex', () => {
      it('converts from decimal RGB to hex', () => {
        expect(utils.color.decToHex(RED_DEC)).toBe(RED_HEX);
        expect(utils.color.decToHex(GREEN_DEC)).toBe(GREEN_HEX);
        expect(utils.color.decToHex(BLUE_DEC)).toBe(BLUE_HEX);
        expect(utils.color.decToHex(WHITE_DEC)).toBe(WHITE_HEX);
        expect(utils.color.decToHex(BLACK_DEC)).toBe(BLACK_HEX);
      });
    });

    describe('interpolate RGB', () => {
      const color1 = { r: 127, g: 88, b: 182 },
      color2 = { r: 255, g: 140, b: 0 },
      lerp1and2 = { r: 191, g: 114, b: 91 };

      it('interpolates between colors, unweighted', () => {
        expect(utils.color.lerpRGB(color1, color2, 0.5)).toEqual(lerp1and2);
      });
    });

    describe('RGB -> HSV', () => {
      const turqHsv = utils.color.rgbToHsv({
        r: scale8bit(TURQUOISE_DEC.r),
        b: scale8bit(TURQUOISE_DEC.b),
        g: scale8bit(TURQUOISE_DEC.g)
      });

      it('converts white (s===0)', () => {
        expect(
          utils.color.rgbToHsv({
            r: scale8bit(WHITE_DEC.r),
            g: scale8bit(WHITE_DEC.g),
            b: scale8bit(WHITE_DEC.b)
          })
        ).toEqual(WHITE_HSV_SCALED);
      });

      it('converts black (s===0)', () => {
        expect(
          utils.color.rgbToHsv({
            r: 0,
            g: 0,
            b: 0
          })
        ).toEqual({ h: undefined, s: 0, v: 0 });
      });

      describe('hue', () => {
        it('converts a turquoise hue', () => {
          expect(turqHsv.h).toBeCloseTo(TURQUOISE_HSV_SCALED.h);
        });
      });

      describe('saturation', () => {
        it('converts a turquoise saturation', () => {
          expect(turqHsv.s).toBeCloseTo(TURQUOISE_HSV_SCALED.s);
        });
      });

      describe('value', () => {
        it('converts a turquoise value', () => {
          expect(turqHsv.v).toBeCloseTo(TURQUOISE_HSV_SCALED.v);
        });
      });
    });

    describe('RGB -> HSL', () => {
      it('converts from RGB to HSL color space', () => {
        expect(
          utils.color.rgbToHsl({
            r: scale8bit(WHITE_DEC.r),
            g: scale8bit(WHITE_DEC.g),
            b: scale8bit(WHITE_DEC.b)
          })
        ).toEqual(WHITE_HSL_SCALED);
      });
    });
  });
});
