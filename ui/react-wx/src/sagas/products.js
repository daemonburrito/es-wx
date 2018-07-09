import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as controlActions from '../actions/control';
import * as tgftpActions from '../actions/tgftp';

const productSelect = function*(action) {
  console.log({ action });
  try {
    yield put(tgftpActions.fetchLatestProductRequest(action.productCode));
  } catch (error) {
    yield put(tgftpActions.fetchLatestProductFailure(error));
  }
};

export const productSelectSaga = function*() {
  yield takeEvery(controlActions.types.PRODUCT_SELECTED, productSelect);
};
