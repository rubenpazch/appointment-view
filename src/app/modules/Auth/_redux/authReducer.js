import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  token: '',
  username: '',
};

export const FETCH_TOKEN = 'FETCH_TOKEN';

export const tokenReducer = persistReducer(
  { storage, key: 'v713-demo1-auth', whitelist: ['username', 'token'] },
  (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TOKEN:
        return {
          ...state,
          username: action.username,
          token: action.token,
        };
      default:
        return state;
    }
  },
);
