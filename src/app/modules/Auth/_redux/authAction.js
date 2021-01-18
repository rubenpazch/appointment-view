import { FETCH_TOKEN, REMOVE_TOKEN } from './authReducer';

export const setToken = result => ({
  type: FETCH_TOKEN,
  payload: result,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
  token: '',
});
