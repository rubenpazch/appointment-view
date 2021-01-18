import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { persistStore } from 'redux-persist';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import store from './redux/store';
import setupAxios from './redux/setupAxios';

/* eslint-disable import/prefer-default-export */
export const persistor = persistStore(store);
setupAxios(axios);

ReactDOM.render(
  <Provider store={store}>
    <App persistor={persistor} />
  </Provider>,
  document.getElementById('root'),
);
