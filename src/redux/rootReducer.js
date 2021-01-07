import { combineReducers } from 'redux';

import tokenReducer from '../app/modules/Auth/_redux/authRedux';

export default combineReducers({
  tokenStore: tokenReducer,
});
