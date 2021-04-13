// eslint-disable react-hooks/exhaustive-deps
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { getListAppointmentByDateService, saveAppointment } from '../../Appointment/_redux/appointmentService';
import { ToastContext } from '../../../../components/ToastContextProvider';
import ModalAppointment from './ModalAppointment';
import { setListByDateService } from '../../Appointment/_redux/appointmentAction';
import AppointmentDetail from './AppointmentDetail';
import Resume from '../../Appointment/pages/Resume';
import Alert from '../../../../components/Alert';

const Wrapper = styled.div`
`;
const ContentLogout = styled.div`  
  width: 50%;  
  padding: 0;
  margin: 15px 3px 0 0;
  button {
    height: 30px;
    min-width: 100px;
  }
`;

const ContentAvailability = styled.div`
  padding: 0 0 0 12px;
  margin: 0;
`;

const WrapperTopContent = styled.div`  
`;

const DateWrapper = styled.div`    
  padding: 0;
  margin: 0;

  button {
    height: auto;
    min-width: auto;
    margin: 0;
    padding: 0;
  }
`;

const ModalWrapper = styled.div`  
  width: 100%;  
`;

const defaultDepartment = {
  attributes: {
    name: 'Not selected',
  },
  id: 0,
  relationships: {
    doctors: {
      data: [
        {
          id: 0,
          type: '',
        },
      ],
    },
  },
  type: '',
};

const defaultDoctorCalendar = [{
  attributes: {
    endDate: '',
    endTime: '',
    id: 0,
    shiftinterval: 0,
    startDate: '',
    startTime: '',
    totalHours: 0,
    user_id: 0,
  },
  id: 0,
  type: '',
  relationships: {
    department: {
      data: {
        id: 0,
      },
    },
  },
}];

const getTextFromObject = text => {
  const expresionRegular = /\[|\]/;
  const result = text.split(expresionRegular);
  if (typeof (result[1]) !== 'undefined' && result[1] !== null) {
    return result[1];
  }
  return '';
};

function disableWeekends(date) {
  const dateBefore = moment(date).format('dddd');
  return dateBefore === 'Saturday' || dateBefore === 'Sunday';
}

const Appointment = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line camelcase
  const { departments, user_id } = useSelector(state => state.tokenStore);
  const [currentDepartment, setCurrentDepartment] = useState(defaultDepartment);
  const [calendarState, setCalendarState] = useState(null);
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [currentDate, setCurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [open, setOpen] = React.useState(false);
  const { doctorcalendars, doctors, doctorsusers } = useSelector(state => state.tokenStore);
  const [doctorInformation, setDoctorInformation] = useState(null);
  const [availability, setAvailability] = useState();
  const [startTimeState, setStartTimeState] = useState('08:00');
  const [intervalTimeState, setIntervalTimeState] = useState('');
  const [listShiftDetailsState, setListShiftDetailsState] = useState([
    {
      endTime: '',
      firstName: '',
      id: 0,
      lastName: '',
      startTime: '',
      status: true,
    },
  ]);
  const doctorCalendarId = new URLSearchParams(useLocation().search).get('id');
  const doctorUserId = new URLSearchParams(useLocation().search).get('user_id');
  const [filterAppointmentsBy, setFilterAppointmentsBy] = useState();
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date()));
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const history = useHistory();

  const handleDateChange = date => {
    setAvailability(null);
    const newDate = moment(date).format('YYYY-MM-DD');
    setCurrentDate(newDate);
    setSelectedDate(newDate);
    if (doctorcalendars !== null) {
      const DoctorCalendarObject = doctorcalendars
        .find(item => Number(item.attributes.user_id) === Number(doctorUserId)
           && item.attributes.startDate === newDate);

      if (DoctorCalendarObject !== null && typeof (DoctorCalendarObject) !== 'undefined') {
        const resultDepartments = departments.find(
          item => item.id === DoctorCalendarObject.relationships.department.data.id,
        );

        if (typeof (resultDepartments) !== 'undefined') {
          setCurrentDepartment(resultDepartments);
        }
        const doctorCalendar = doctorcalendars.filter(
          item => item.attributes.startDate === newDate
        && Number(item.attributes.user_id) === Number(doctorUserId),
        );
        getListAppointmentByDateService(
          DoctorCalendarObject.relationships.department.data.id,
          newDate,
        )
          .then(({ data }) => {
            dispatch(setListByDateService(data));
            setFilterAppointmentsBy(data.data);
            const appointmentList = data.data;
            const includedList = data.included;
            const arrayOfPerson = [];
            const arrayOfUsers = [];
            for (let indexIL = 0; indexIL < includedList.length; indexIL += 1) {
              if (includedList[indexIL].type === 'person') {
                arrayOfPerson.push(includedList[indexIL]);
              }
              if (includedList[indexIL].type === 'user') {
                arrayOfUsers.push(includedList[indexIL]);
              }
            }

            const arrayHours = [];
            doctorCalendar.filter(x => {
              const obj = {
                startTime: moment.utc(x.attributes.startTime),
                endTime: moment.utc(x.attributes.endTime),
                user_id: x.attributes.user_id,
                totalHours: x.attributes.totalHours,
                shiftinterval: x.attributes.shiftinterval,
                totalShift: ((
                  Number(x.attributes.totalHours) * 60)
                  / (Number(x.attributes.shiftinterval))),
                userInformation: null,
                doctorpersonInformation: null,
              };
              arrayHours.push(obj);
              return defaultDoctorCalendar;
            });
            for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
              arrayHours[indexAH].userInformation = doctorsusers
                .find(x => Number(x.id)
            === Number(arrayHours[indexAH].user_id));
            }

            for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
              arrayHours[indexAH].doctorpersonInformation = doctors
                .find(x => Number(x.id)
            === Number(arrayHours[indexAH].userInformation.attributes.person_id));
            }
            setDoctorInformation(arrayHours);
            const ShiftByHour = [];
            let indexKey = 1;
            for (let indexj = 0; indexj < arrayHours.length; indexj += 1) {
              const r = 0;
              let nextStartTime = moment.utc(arrayHours[indexj].startTime);
              for (let r = 0; r < arrayHours[indexj].totalShift; r += 1) {
                const obj = {
                  id: indexKey,
                  startTime: moment.utc(nextStartTime).format('HH:mm'),
                  endTime: moment.utc(nextStartTime).add(15, 'minutes').format('HH:mm'),
                  status: false,
                  doctor_id: arrayHours[indexj].user_id,
                  patient_id: '',
                  firstName: ' ... ',
                  lastName: '',
                };
                ShiftByHour.push(obj);
                nextStartTime = moment.utc(nextStartTime).add(15, 'minutes');
                indexKey += 1;
              }
            }
            setListShiftDetailsState(ShiftByHour);
            for (let indexh = 0; indexh < appointmentList.length; indexh += 1) {
              const foundIndex = ShiftByHour.findIndex(
                x => x.startTime === moment.utc(appointmentList[indexh].attributes.startTime).format('HH:mm'),
              );
              if (foundIndex !== -1) {
                ShiftByHour[foundIndex].status = true;
                ShiftByHour[foundIndex].patient_id = appointmentList[indexh].attributes.user_id;
                const objectUser = arrayOfUsers.find(u => Number(u.id)
              === Number(appointmentList[indexh].attributes.user_id));
                const objectPerson = arrayOfPerson.find(p => Number(p.id)
              === Number(objectUser.attributes.person_id));
                ShiftByHour[foundIndex].firstName = objectPerson.attributes.firstName;
                ShiftByHour[foundIndex].lastName = objectPerson.attributes.lastName;
              }
            }
            setAvailability(ShiftByHour);
          })
          .catch(error => {
            notifyError(error.message);
          });
      }
    }
  };

  useEffect(() => {
    setCalendarState(doctorcalendars);
  }, [doctorcalendars]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitModal = (values, SelectDate) => {
    handleClose();
    const { idtime } = values;
    const intervalItemSelected = listShiftDetailsState
      .find(item => Number(item.id) === Number(idtime));
    // eslint-disable-next-line camelcase
    const { startTime, endTime, doctor_id } = intervalItemSelected;
    setIntervalTimeState();
    // eslint-disable-next-line camelcase

    saveAppointment(SelectDate, startTime, endTime, user_id, doctor_id)
      .then(({ response, data }) => {
        if (typeof (data) !== 'undefined') {
          notifySuccess('The appointment was successfully registered');
          history.push('/Appointments');
        }
        if (typeof (response) !== 'undefined') {
          if (response.status === 422) {
            notifyError(`Error: ${getTextFromObject(response.request.responseText)}`);
          } else if (response.status === 200) {
            notifySuccess('The appointment was successfully registered');
            handleClose();
          } else {
            notifyError('else paso algo');
          }
        }
      })
      .catch(error => {
        if (typeof (error.response.data.appointmentDate) !== 'undefined') {
          notifyError(error.response.data.appointmentDate.join(''));
        }
        if (typeof (error.response.data.user_id) !== 'undefined') {
          notifyError(error.response.data.user_id.join(''));
        }
      });
  };

  useEffect(() => {
    setAvailability(null);
    if (doctorcalendars !== null) {
      const DoctorCalendarObject = doctorcalendars
        .find(item => item.id === doctorCalendarId);

      const resultDepartments = departments.find(
        item => item.id === DoctorCalendarObject.relationships.department.data.id,
      );

      if (typeof (resultDepartments) !== 'undefined') {
        setCurrentDepartment(resultDepartments);
      }
      const doctorCalendar = doctorcalendars.filter(
        item => item.attributes.startDate === currentDate
      && item.id === doctorCalendarId,
      );

      getListAppointmentByDateService(
        DoctorCalendarObject.relationships.department.data.id,
        currentDate,
      )
        .then(({ data }) => {
          dispatch(setListByDateService(data));
          setFilterAppointmentsBy(data.data);
          const appointmentList = data.data;
          const includedList = data.included;
          const arrayOfPerson = [];
          const arrayOfUsers = [];
          for (let indexIL = 0; indexIL < includedList.length; indexIL += 1) {
            if (includedList[indexIL].type === 'person') {
              arrayOfPerson.push(includedList[indexIL]);
            }
            if (includedList[indexIL].type === 'user') {
              arrayOfUsers.push(includedList[indexIL]);
            }
          }

          const arrayHours = [];
          doctorCalendar.filter(x => {
            const obj = {
              startTime: moment.utc(x.attributes.startTime),
              endTime: moment.utc(x.attributes.endTime),
              user_id: x.attributes.user_id,
              totalHours: x.attributes.totalHours,
              shiftinterval: x.attributes.shiftinterval,
              totalShift: ((
                Number(x.attributes.totalHours) * 60)
                / (Number(x.attributes.shiftinterval))),
              userInformation: null,
              doctorpersonInformation: null,
            };
            arrayHours.push(obj);
            return defaultDoctorCalendar;
          });

          for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
            arrayHours[indexAH].userInformation = doctorsusers
              .find(x => Number(x.id)
          === Number(arrayHours[indexAH].user_id));
          }

          for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
            arrayHours[indexAH].doctorpersonInformation = doctors
              .find(x => Number(x.id)
          === Number(arrayHours[indexAH].userInformation.attributes.person_id));
          }
          setDoctorInformation(arrayHours);
          const ShiftByHour = [];
          let indexKey = 1;
          for (let indexj = 0; indexj < arrayHours.length; indexj += 1) {
            const r = 0;
            let nextStartTime = moment.utc(arrayHours[indexj].startTime);
            for (let r = 0; r < arrayHours[indexj].totalShift; r += 1) {
              const obj = {
                id: indexKey,
                startTime: moment.utc(nextStartTime).format('HH:mm'),
                endTime: moment.utc(nextStartTime).add(15, 'minutes').format('HH:mm'),
                status: false,
                doctor_id: arrayHours[indexj].user_id,
                patient_id: '',
                firstName: ' ... ',
                lastName: '',
              };
              ShiftByHour.push(obj);
              nextStartTime = moment.utc(nextStartTime).add(15, 'minutes');
              indexKey += 1;
            }
          }
          setListShiftDetailsState(ShiftByHour);
          for (let indexh = 0; indexh < appointmentList.length; indexh += 1) {
            const foundIndex = ShiftByHour.findIndex(
              x => x.startTime === moment.utc(appointmentList[indexh].attributes.startTime).format('HH:mm'),
            );
            if (foundIndex !== -1) {
              ShiftByHour[foundIndex].status = true;
              ShiftByHour[foundIndex].patient_id = appointmentList[indexh].attributes.user_id;
              const objectUser = arrayOfUsers.find(u => Number(u.id)
            === Number(appointmentList[indexh].attributes.user_id));
              const objectPerson = arrayOfPerson.find(p => Number(p.id)
            === Number(objectUser.attributes.person_id));
              ShiftByHour[foundIndex].firstName = objectPerson.attributes.firstName;
              ShiftByHour[foundIndex].lastName = objectPerson.attributes.lastName;
            }
          }

          setAvailability(ShiftByHour);
        })
        .catch(error => {
          notifyError(error.message);
        });
    }
  }, [doctorCalendarId]);

  return (
    <Wrapper>
      <WrapperTopContent className="d-flex fle-row">
        {doctorInformation !== null
          ? doctorInformation.map(item => (
            <Resume
              key={item.user_id}
              doctorName={`${item.doctorpersonInformation.attributes.firstName} ${item.doctorpersonInformation.attributes.lastName}`}
              location={currentDepartment.attributes.location}
              startTime={moment.utc(item.startTime).format('HH:mm')}
              endTime={moment.utc(item.endTime).format('HH:mm')}
            />
          ))
          : null}
        <ContentLogout className="d-flex flex-row justify-content-between">
          <DateWrapper>
            <KeyboardDatePicker
              disableToolbar
              minDate={appointmentDateState}
              shouldDisableDate={disableWeekends}
              variant="inline"
              format="MM/DD/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Appointment Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className="m-0 p-0"
            />
          </DateWrapper>
          <ModalWrapper className="d-flex flex-row align-items-center justify-content-end mr-3">
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              New
            </Button>
            <ModalAppointment
              open={open}
              handleClose={handleClose}
              handleSubmitModal={handleSubmitModal}
              selectObjectList={listShiftDetailsState}
            />
          </ModalWrapper>
        </ContentLogout>
      </WrapperTopContent>
      <ContentAvailability className="d-flex flex-wrap">
        { availability !== null && typeof (availability) !== 'undefined'
          ? availability.map(item => (
            <AppointmentDetail
              key={item.id}
              time={item.startTime}
              endTime={item.endTime}
              status={item.status}
              patient={`${item.firstName} ${item.lastName} `}
              service="ODONTOLOGIA BASICA"
              office="Consultorio 105 (Ubicado en el piso 4 modulo 3)"
            />
          ))
          : (
            <Alert
              message="Please try again a select a service or choose a different date"
              footerMessage="Click a service in the list or choose a different date"
            />
          ) }
      </ContentAvailability>
    </Wrapper>
  );
};

export default Appointment;
