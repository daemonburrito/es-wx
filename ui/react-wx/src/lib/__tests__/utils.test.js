import * as utils from '../util';

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
});
