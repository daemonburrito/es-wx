import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import defaultUIState from './reducers/ui';

it('renders without crashing', () => {
  const div = document.createElement('div'),
  store = configureStore();
  ReactDOM.render(
    <Provider
      store={store({
        ui: defaultUIState
      })}
    >
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
