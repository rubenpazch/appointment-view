/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import MomentUtils from '@date-io/moment';

import Routes from './app/Routes';
import { ToastContextProvider } from './components/ToastContextProvider';

function App({ persistor, store }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.Suspense fallback={<Spinner animation="border" />}>
          <BrowserRouter>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <ToastContextProvider>
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
                <Routes />
              </ToastContextProvider>
            </MuiPickersUtilsProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
App.propTypes = {
  persistor: PropTypes.object,
  store: PropTypes.object,
};

App.defaultProps = {
  persistor: null,
  store: null,
};
export default App;
