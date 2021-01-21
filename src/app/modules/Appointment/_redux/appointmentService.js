import axios from 'axios';

export const APPOINTMENT_BY_DATE_AREA = 'http://localhost:3000/api/v1/getappointments';

// eslint-disable-next-line camelcase
export function getListAppointmentByDateService(department_id, date) {
  return axios.post(APPOINTMENT_BY_DATE_AREA, {
    appointment: {
      department_id,
      date,
    },
  });
}
