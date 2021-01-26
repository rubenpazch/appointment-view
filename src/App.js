/* eslint-disable react/prop-types */
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ToastContainer } from 'material-react-toastify';
import MomentUtils from '@date-io/moment';

import Routes from './app/Routes';
import { ToastContextProvider } from './components/ToastContextProvider';
// import Login from './app/modules/Auth/pages/Login';

function App({ persistor, store }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.Suspense fallback={<Spinner animation="border" />}>
          <BrowserRouter>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <ToastContextProvider>
                <Routes />
              </ToastContextProvider>
              <div>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            </MuiPickersUtilsProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
