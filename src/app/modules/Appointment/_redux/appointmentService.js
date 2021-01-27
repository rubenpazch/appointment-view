import axios from 'axios';

export const APPOINTMENT_BY_DATE_AREA = 'http://localhost:3000/api/v1/getappointments';
export const CREATE_APPOINTMENT = 'http://localhost:3000/api/v1/appointments';

// eslint-disable-next-line camelcase
export function getListAppointmentByDateService(department_id, date) {
  return axios.post(APPOINTMENT_BY_DATE_AREA, {
    appointment: {
      department_id,
      date,
    },
  });
}

// eslint-disable-next-line camelcase
export function saveAppointment(appointmentDate, startTime, endTime, user_id, doctor_id) {
  return axios.post(CREATE_APPOINTMENT, {
    appointment: {
      appointmentDate,
      startTime,
      endTime,
      status: true,
      user_id,
      doctor_id,
    },
  });
}
