import {
  FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE,
} from './appointmentReducer';

export const setListByDateService = result => ({
  type: FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE,
  payload: result,
});

export const test = result => ({
  type: FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE,
  payload: result,
});
