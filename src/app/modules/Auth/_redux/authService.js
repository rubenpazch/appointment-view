import axios from 'axios';

export const LOGIN_URL = 'http://localhost:3000/api/v1/tokens';
export const REGISTER_URL = 'http://localhost:3000/api/v1/users';
export const PEOPLE_REGISTER = 'http://localhost:3000/api/v1/people';
export const GET_DEPARTMENTS = 'http://localhost:3000/api/v1/departments';

export function login(username, password) {
  return axios.post(LOGIN_URL, { user: { username, password } });
}

export function register(email, username, password, personid) {
  return axios.post(REGISTER_URL, {
    user: {
      email,
      username,
      password,
      password_digest: password,
      role_id: 9,
      department_id: 15,
      person_id: personid,
    },
  });
}

export function registerPeople(firstName, lastName, documentId, phone, historyNumber) {
  return axios.post(PEOPLE_REGISTER, {
    person: {
      firstName,
      lastName,
      documentId,
      phone,
      historyNumber,
    },
  });
}

export function getDepartments() {
  return axios.get(GET_DEPARTMENTS);
}
