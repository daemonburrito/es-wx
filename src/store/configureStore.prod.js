import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(sagaMiddleware))
  );

  // For SSR
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
};

export default configureStore;
