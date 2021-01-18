import axios from 'axios';

export const LOGIN_URL = 'http://localhost:3000/api/v1/tokens';
export const REGISTER_URL = 'api/v1/register';

export function login(username, password) {
  return axios.post(LOGIN_URL, { user: { username, password } });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, {
    email, fullname, username, password,
  });
}
