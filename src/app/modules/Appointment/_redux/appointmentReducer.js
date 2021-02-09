const initialState = {
  filterappointmentsby: null,
  appointmentsByPatient: null,
};

export const FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE = 'FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE';
export const SAVE_APPOINTMENT = 'SAVE_APPOINTMENT';
export const LIST_APPOINTMENT = 'LIST_APPOINTMENT';

export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_APPOINTMENT_BY_DATE_SERVICE:
      return {
        ...state,
        filterappointmentsby: action.payload.data,
      };
    case LIST_APPOINTMENT:
      return {
        ...state,
        appointmentsByPatient: action.payload.data,
      };
    default:
      return state;
  }
};
