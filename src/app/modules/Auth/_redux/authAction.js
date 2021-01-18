import { FETCH_TOKEN } from './authReducer';

const setToken = result => ({
  type: FETCH_TOKEN,
  token: result,
});

export default setToken;
