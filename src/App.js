/* eslint-disable react/prop-types */
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './app/Routes';
// import Login from './app/modules/Auth/pages/Login';

function App({ persistor }) {
  return (
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </PersistGate>
  );
}

export default App;
