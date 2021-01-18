/* eslint-disable react/prop-types */
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './app/Routes';
// import Login from './app/modules/Auth/pages/Login';

function App({ persistor, store }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
