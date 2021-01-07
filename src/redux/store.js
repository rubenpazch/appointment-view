import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';

const middleware = composeWithDevTools(
  applyMiddleware(thunk),
);

export default createStore(rootReducer, middleware);
