import { combineReducers } from 'redux';

import { tokenReducer } from '../app/modules/Auth/_redux/authReducer';
import { appointmentReducer } from '../app/modules/Appointment/_redux/appointmentReducer';

export default combineReducers({
  tokenStore: tokenReducer,
  appointmentStore: appointmentReducer,
});
