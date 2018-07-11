import { put, takeEvery } from 'redux-saga/effects';
import { TGFTP_URL_PATTERN, TGFTP_HOST } from '../constants';
import * as tgftpActions from '../actions/tgftp';

export const watchTgftp = function*() {
  yield takeEvery(
    action => {
      if (action.tgftp === true && action.type.indexOf('REQUEST') !== -1) {
        return true;
      }
    },
    function*(action) {
      if (!action.payload || !action.payload.productCode) {
        return yield put(
          tgftpActions.fetchLatestProductFailure(`No product code.`)
        );
      }
      const url = TGFTP_URL_PATTERN.stringify({
        productCode: action.payload.productCode,
        elevationNumber: action.payload.elevation || 0,
        index: 'last'
      });

      const resAction = yield fetch(`${TGFTP_HOST}${url}`)
        .then(function(response) {
          if (response.ok) {
            return response.arrayBuffer();
          }
          throw new Error('Network response was not ok.');
        })
        .then(function(arrayBuf) {
          return tgftpActions.fetchLatestProductSuccess(arrayBuf);
        })
        .catch(function(error) {
          console.error(`Fetch error: ${error.message}`);
          return tgftpActions.fetchLatestProductFailure(error.message);
        });
      yield put(resAction);
    }
  );
};
