import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers/root';

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/root', () => {
      store.replaceReducer(rootReducer);
    });
  }

  // For SSR
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
