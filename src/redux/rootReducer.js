import { combineReducers } from 'redux';

import { tokenReducer } from '../app/modules/Auth/_redux/authReducer';

export default combineReducers({
  tokenStore: tokenReducer,
});
