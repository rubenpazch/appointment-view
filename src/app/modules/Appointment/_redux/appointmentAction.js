import {
  FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE,
  LIST_APPOINTMENT,
} from './appointmentReducer';

export const setListByDateService = result => ({
  type: FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE,
  payload: result,
});

export const setListAppointmentByPatient = result => ({
  type: LIST_APPOINTMENT,
  payload: result,
});

export const test = result => ({
  type: FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE,
  payload: result,
});
