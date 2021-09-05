import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.scss';
import store from './store';
import App from './App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
