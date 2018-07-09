import { all, fork } from 'redux-saga/effects';
import { productSelectSaga } from './products';
import { watchTgftp } from './api';

export default function* root() {
  yield all([fork(productSelectSaga), fork(watchTgftp)]);
}
