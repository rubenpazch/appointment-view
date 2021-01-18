import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  token: '',
  username: '',
};

export const FETCH_TOKEN = 'FETCH_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

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
      case REMOVE_TOKEN:
        return initialState;
      default:
        return state;
    }
  },
);
