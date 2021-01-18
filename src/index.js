import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import store from './redux/store';
import setupAxios from './redux/setupAxios';

setupAxios(axios);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
