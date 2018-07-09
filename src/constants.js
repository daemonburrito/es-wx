import UrlPattern from 'url-pattern';
// application-level constants
export const HEADER_TITLE = 'es-wx';

export const LOCALE = 'en-us';
export const TGFTP_HOST = 'http://localhost:3001';
export const TGFTP_URL = `/SL.us008001/DF.of/DC.radar/DS.(p:productCode)(r:elevationNumber)/SI.kewx/sn(.:index)`;

export const TGFTP_URL_PATTERN = new UrlPattern(TGFTP_URL);
console.log(
  TGFTP_URL_PATTERN.stringify({
    productCode: '94',
    elevationNumber: '0',
    index: 'last'
  })
);
