import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as tgftpActions from '../actions/tgftp';
import { TGFTP_URL_PATTERN, TGFTP_HOST } from '../constants';

export const watchTgftp = function*() {
  yield takeEvery(
    // tgftpActions.types.fetchLatestProductTypes[tgftpActions.types.REQUEST],
    action => {
      if (action.tgftp === true) {
        if (action.type.indexOf('REQUEST' !== -1)) {
          return true;
        }
      }
    },
    function*(action) {
      const url = TGFTP_URL_PATTERN.stringify({
        productCode: action.payload.productCode,
        elevationNumber: '0',
        index: 'last'
      });
      // console.log({
      //   action,
      //   url
      // });
      yield fetch(`${TGFTP_HOST}${url}`)
        .then(function(response) {
          if (response.ok) {
            //
            console.log(response);
            return response;
          }
          throw new Error('Network response was not ok.');
        })
        .then(function(myBlob) {
          //
          console.log(myBlob);
          return myBlob;
        })
        .catch(function(error) {
          console.log(
            'There has been a problem with your fetch operation: ',
            error.message
          );
        });
    }
  );
};
