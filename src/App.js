import { BrowserRouter } from 'react-router-dom';
import Routes from './app/Routes';
// import Login from './app/modules/Auth/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
