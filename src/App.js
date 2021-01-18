/* eslint-disable react/prop-types */
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import Routes from './app/Routes';
// import Login from './app/modules/Auth/pages/Login';

function App({ persistor, store }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.Suspense fallback={<Spinner animation="border" />}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
