import axios from 'axios';

export const LOGIN_URL = 'https://vast-tundra-77982.herokuapp.com/api/v1/tokens';
export const REGISTER_URL = 'https://vast-tundra-77982.herokuapp.com/api/v1/users';

export function login(username, password) {
  return axios.post(LOGIN_URL, { user: { username, password } });
}

export function register(email, username, password) {
  return axios.post(REGISTER_URL, {
    user: {
      email,
      username,
      password,
      password_digest: password,
      role_id: 6,
      department_id: 11,
      person_id: 21,
    },
  });
}
