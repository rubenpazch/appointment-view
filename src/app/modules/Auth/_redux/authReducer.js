import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  token: '',
  username: '',
  patient: '',
  userInformation: '',
};

export const FETCH_TOKEN = 'FETCH_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const PATIENT_INFORMATION = 'PATIENT_INFORMATION';
export const USER_INFORMATION = 'USER_INFORMATION';

export const tokenReducer = persistReducer(
  { storage, key: 'appointment-auth', whitelist: ['username', 'token'] },
  (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TOKEN:
        return {
          ...state,
          token: action.payload.token,
          username: action.payload.username,
        };
      case PATIENT_INFORMATION:
        return {
          ...state,
          patient: action.payload,
        };
      case USER_INFORMATION:
        return {
          ...state,
          userInformation: action.payload,
        };
      case REMOVE_TOKEN:
        return initialState;
      default:
        return state;
    }
  },
);
