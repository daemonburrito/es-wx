// RAA Actions for fetching data from NOAA "TGFTP" Level III data gateway.
import * as types from './types/tgftp';

const isTgftp = {
  tgftp: true
};

export const fetchLatestProductRequest = productCode => ({
  type: types.fetchLatestProductTypes[types.REQUEST],
  payload: { productCode },
  ...isTgftp
});

export const fetchLatestProductSuccess = bytes => ({
  type: types.fetchLatestProductTypes[types.SUCCESS],
  payload: { bytes },
  ...isTgftp
});

export const fetchLatestProductFailure = error => ({
  type: types.fetchLatestProductTypes[types.FAILURE],
  error
});

export { types };
