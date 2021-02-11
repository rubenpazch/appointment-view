import {
  FETCH_TOKEN,
  REMOVE_TOKEN,
  PATIENT_INFORMATION,
  USER_INFORMATION,
  FETCH_GET_DEPARTMENTS,
  FETCH_DOCTOR_CALENDARS,
  FETCH_DOCTORS,
  FETCH_DOCTORS_USERS,
  ACTIVE_STEP,
  SET_PATIENT_ROLE,
  SET_PATIENT_DEPARTMENT,
} from './authReducer';

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

export const setUserInformation = result => ({
  type: USER_INFORMATION,
  payload: result,
});

export const setDepartments = result => ({
  type: FETCH_GET_DEPARTMENTS,
  payload: result.data,
});

export const setDoctorCalendars = result => ({
  type: FETCH_DOCTOR_CALENDARS,
  payload: result.data,
});

export const setDoctors = result => ({
  type: FETCH_DOCTORS,
  payload: result,
});

export const setDoctorsUsers = result => ({
  type: FETCH_DOCTORS_USERS,
  payload: result,
});

export const setActiveStep = result => ({
  type: ACTIVE_STEP,
  payload: result,
});

export const setPatientRole = result => ({
  type: SET_PATIENT_ROLE,
  payload: result,
});

export const setPatientDepartment = result => ({
  type: SET_PATIENT_DEPARTMENT,
  payload: result,
});
