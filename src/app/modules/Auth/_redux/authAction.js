import { FETCH_TOKEN, REMOVE_TOKEN, PATIENT_INFORMATION } from './authReducer';

export const setToken = result => ({
  type: FETCH_TOKEN,
  payload: result,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
  token: '',
});

export const setPatientInformation = result => ({
  type: PATIENT_INFORMATION,
  payload: result,
});
