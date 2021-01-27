/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';
import 'moment/locale/en-in';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import 'material-react-toastify/dist/ReactToastify.css';

import { getDepartments, getDoctorCalendars } from '../Auth/_redux/authService';
import {
  setDepartments, setDoctorCalendars, setDoctors, setDoctorsUsers,
} from '../Auth/_redux/authAction';
import { setListByDateService } from './_redux/appointmentAction';
import { getListAppointmentByDateService, saveAppointment } from './_redux/appointmentService';
import AppointmentDetail from './pages/AppointmentDetail';
import Resume from './pages/Resume';
import Logout from '../Auth/pages/Logout';
import { ToastContext } from '../../../components/ToastContextProvider';

moment.locale('en');

const AppointmentWrapper = styled.div`  
  width: 100%;
`;

const LeftSideBar = styled.div`
  width: 35%;
  padding: 15px;
  min-height: 100vh;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 62%;
  padding: 15px 0 0 15px;
  margin: 0; 
  border-left: 1px solid #c3cdff;
`;

const LabelAppointmentDate = styled.div`
  padding: 0;
  margin: 0;
`;

const LabelAppointmentDepartment = styled.div`
  padding: 0;
  margin: 0;
`;

const LabelAppointmentStartTime = styled.div`
  padding: 0;
  margin: 0;
`;

const LabelAppointmentEndTime = styled.div`
  padding: 0;
  margin: 0;
`;

const DatePickerContainer = styled.div`
  padding: 1px;
  margin: 0 0 15px 0;
`;

const ContentLogout = styled.div`
  padding: 15px;
  margin: 0;
  button {
    min-width: 100px;
  }
`;

const SelectOptionContainer = styled.div`
  padding: 0;
  margin: 0;
  
  .MuiFormControl-root {
    width: 100%;
    min-width: 100%;

    label {
      font-size: 1.2rem;
    }

    label + .MuiInput-formControl {
      margin-top: 22px;
    }
  }  
`;

const ContentAvailability = styled.div`
  padding: 15px;
  margin: 0;
`;

const UserInformation = styled.div`
  padding: 15px 0 1px 15px;
  margin: 0 0 15px 0;
  background-color: #3f51b4;
  border-radius: 5px;
  color: #ffffff;

  span {
    font-weight: 800;
  }
  p {
    text-transform: uppercase;
  }
`;

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

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
}];

const getTextFromObject = text => {
  const expresionRegular = /\[|\]/;
  const result = text.split(expresionRegular);
  if (typeof (result[1]) !== 'undefined' && result[1] !== null) {
    return result[1];
  }
  return '';
};

const Appointment = () => {
  // const [loading, setLoading] = useState(true);
  const loading = true;
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [currentDepartmentValue, setCurrentDepartmentValue] = useState(0);
  const [currentDepartment, setCurrentDepartment] = useState(defaultDepartment);
  const [doctorCalendarByDay, setDoctorCalendarByDay] = useState(defaultDoctorCalendar);
  const [doctorCalendarByDepartment, setDoctorCalendarByDepartment] = useState(null);
  const { notify } = useContext(ToastContext);
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
  const [startTimeState, setStartTimeState] = useState('08:00');
  const [intervalTimeState, setIntervalTimeState] = useState('');

  const [locale] = useState('en');
  // const { filterappointmentsby } = useSelector(state => state.appointmentStore);
  const [filterAppointmentsBy, setFilterAppointmentsBy] = useState();
  const [availability, setAvailability] = useState();
  // eslint-disable-next-line camelcase
  const { departments, user_id } = useSelector(state => state.tokenStore);
  const { doctorcalendars } = useSelector(state => state.tokenStore);
  const { doctors } = useSelector(state => state.tokenStore);
  const { userInformation } = useSelector(state => state.tokenStore);
  const { doctorsusers } = useSelector(state => state.tokenStore);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitModal = event => {
    // eslint-disable-next-line camelcase
    const { startTime, endTime, doctor_id } = intervalTimeState;

    saveAppointment(appointmentDateState, startTime, endTime, user_id, doctor_id)
      .then(({ response }) => {
        if (response.status === 422) {
          console.log(response.request.responseText);
          notify(`Error: ${getTextFromObject(response.request.responseText)}`);
        } else if (response.status === 200) {
          console.log('success');
          handleClose();
        } else {
          console.log('else');
        }
      }, error => {
        if (response.data.user_id[0] !== null) {
          notify(response.data.user_id[0]);
        }
        console.log('error --> ', error);
      })
      .catch(error => {
        console.log('error --> ', { error });
      });
  };

  const handleChangeStartTime = event => {
    setStartTimeState(event.target.value);
    const shiftDetail = listShiftDetailsState.find(
      item => Number(item.id) === Number(event.target.value),
    );
    setIntervalTimeState(shiftDetail);
  };

  const handleChangeDepartment = event => {
    setCurrentDepartmentValue(event.target.value);

    const resultDepartments = departments.find(
      item => item.id === event.target.value,
    );

    const resultDoctorCalendars = doctorcalendars.filter(
      item => item.attributes.startDate === appointmentDateState,
    );

    if (typeof (resultDepartments) !== 'undefined') {
      setCurrentDepartment(resultDepartments);
    }
    if (typeof (resultDoctorCalendars) !== 'undefined') {
      setDoctorCalendarByDay(resultDoctorCalendars);
    }
    getListAppointmentByDateService(event.target.value, appointmentDateState)
      .then(({ data }) => {
        dispatch(setListByDateService(data));
        setFilterAppointmentsBy(data.data);
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

        const appointmentList = data.data;
        const doctorsCalendarFounded = [];
        resultDepartments.relationships.doctors.data.filter(itemDepartment => {
          resultDoctorCalendars.filter(itemCalendar => {
            if (Number(itemDepartment.id) === Number(itemCalendar.attributes.user_id)) {
              doctorsCalendarFounded.push(itemCalendar);
              return itemCalendar;
            }
            return defaultDoctorCalendar;
          });
          return defaultDepartment;
        });

        const arrayHours = [];
        doctorsCalendarFounded.filter(x => {
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
        console.log({ arrayHours });
        for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
          arrayHours[indexAH].userInformation = doctorsusers.find(x => Number(x.id) === Number(arrayHours[indexAH].user_id));
        }

        for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
          arrayHours[indexAH].doctorpersonInformation = doctors.find(x => Number(x.id) === Number(arrayHours[indexAH].userInformation.attributes.person_id));
        }
        setDoctorCalendarByDepartment(arrayHours);
        const arrayShiftDetailByHour = [];
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
            arrayShiftDetailByHour.push(obj);
            nextStartTime = moment.utc(nextStartTime).add(15, 'minutes');
            indexKey += 1;
          }
        }

        setListShiftDetailsState(arrayShiftDetailByHour);
        for (let indexh = 0; indexh < appointmentList.length; indexh += 1) {
          const foundIndex = arrayShiftDetailByHour.findIndex(
            x => x.startTime === moment.utc(appointmentList[indexh].attributes.startTime).format('HH:mm'),
          );
          if (foundIndex !== -1) {
            arrayShiftDetailByHour[foundIndex].status = true;
            arrayShiftDetailByHour[foundIndex].patient_id = appointmentList[indexh].attributes.user_id;
            const objectUser = arrayOfUsers.find(u => Number(u.id) === Number(appointmentList[indexh].attributes.user_id));
            const objectPerson = arrayOfPerson.find(p => Number(p.id) === Number(objectUser.attributes.person_id));
            arrayShiftDetailByHour[foundIndex].firstName = objectPerson.attributes.firstName;
            arrayShiftDetailByHour[foundIndex].lastName = objectPerson.attributes.lastName;
          }
        }

        setAvailability(arrayShiftDetailByHour);
      })
      .catch(error => {
        console.log({ error });
      // setSubmitting(false);
      // setStatus('not working');
      });
  };

  const changeAppointmentDate = selectedDate => {
    setAppointmentDateState(moment(selectedDate).format('YYYY-MM-DD'));
    const currentDateSelected = moment(selectedDate).format('YYYY-MM-DD');
    setCurrentDepartmentValue(currentDepartmentValue);

    const resultDepartments = departments.find(
      item => item.id === currentDepartmentValue,
    );

    const resultDoctorCalendars = doctorcalendars.filter(
      item => item.attributes.startDate === currentDateSelected,
    );

    if (typeof (resultDepartments) !== 'undefined') {
      setCurrentDepartment(resultDepartments);
    }
    if (typeof (resultDoctorCalendars) !== 'undefined') {
      setDoctorCalendarByDay(resultDoctorCalendars);
    }
    getListAppointmentByDateService(currentDepartmentValue, currentDateSelected)
      .then(({ data }) => {
        dispatch(setListByDateService(data));
        setFilterAppointmentsBy(data.data);
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

        const appointmentList = data.data;
        const doctorsCalendarFounded = [];
        resultDepartments.relationships.doctors.data.filter(itemDepartment => {
          resultDoctorCalendars.filter(itemCalendar => {
            if (Number(itemDepartment.id) === Number(itemCalendar.attributes.user_id)) {
              doctorsCalendarFounded.push(itemCalendar);
              return itemCalendar;
            }
            return defaultDoctorCalendar;
          });
          return defaultDepartment;
        });

        const arrayHours = [];
        doctorsCalendarFounded.filter(x => {
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
        console.log({ arrayHours });
        for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
          arrayHours[indexAH].userInformation = doctorsusers.find(x => Number(x.id) === Number(arrayHours[indexAH].user_id));
        }

        for (let indexAH = 0; indexAH < arrayHours.length; indexAH += 1) {
          arrayHours[indexAH].doctorpersonInformation = doctors.find(x => Number(x.id) === Number(arrayHours[indexAH].userInformation.attributes.person_id));
        }
        setDoctorCalendarByDepartment(arrayHours);
        const arrayShiftDetailByHour = [];
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
            arrayShiftDetailByHour.push(obj);
            nextStartTime = moment.utc(nextStartTime).add(15, 'minutes');
            indexKey += 1;
          }
        }

        setListShiftDetailsState(arrayShiftDetailByHour);
        for (let indexh = 0; indexh < appointmentList.length; indexh += 1) {
          const foundIndex = arrayShiftDetailByHour.findIndex(
            x => x.startTime === moment.utc(appointmentList[indexh].attributes.startTime).format('HH:mm'),
          );
          if (foundIndex !== -1) {
            arrayShiftDetailByHour[foundIndex].status = true;
            arrayShiftDetailByHour[foundIndex].patient_id = appointmentList[indexh].attributes.user_id;
            const objectUser = arrayOfUsers.find(u => Number(u.id) === Number(appointmentList[indexh].attributes.user_id));
            const objectPerson = arrayOfPerson.find(p => Number(p.id) === Number(objectUser.attributes.person_id));
            arrayShiftDetailByHour[foundIndex].firstName = objectPerson.attributes.firstName;
            arrayShiftDetailByHour[foundIndex].lastName = objectPerson.attributes.lastName;
          }
        }

        setAvailability(arrayShiftDetailByHour);
      })
      .catch(error => {
        console.log({ error });
      // setSubmitting(false);
      // setStatus('not working');
      });
  };

  useEffect(() => {
    getDepartments()
      .then(({ data }) => {
        dispatch(setDepartments(data));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);
        // setStatus('not working');
      });
  }, []);

  useEffect(() => {
    getDoctorCalendars()
      .then(({ data }) => {
        const includedList = data.included;
        const arrayOfDoctors = [];
        const arrayOfUsersDoctors = [];
        for (let indexIL = 0; indexIL < includedList.length; indexIL += 1) {
          if (includedList[indexIL].type === 'person') {
            arrayOfDoctors.push(includedList[indexIL]);
          }
          if (includedList[indexIL].type === 'user') {
            arrayOfUsersDoctors.push(includedList[indexIL]);
          }
        }
        dispatch(setDoctorCalendars(data));
        dispatch(setDoctors(arrayOfDoctors));
        dispatch(setDoctorsUsers(arrayOfUsersDoctors));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);doctorcalendars
        // setStatus('not working');
      });
  }, []);

  return (
    <AppointmentWrapper className="d-flex flex-row">
      <LeftSideBar>
        <UserInformation>
          <span>Welcome</span>
          {userInformation !== null
            ? <p>{`${userInformation.firstName} ${userInformation.lastName}`}</p>
            : <p>No results founded</p>}

        </UserInformation>
        <DatePickerContainer>
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
            <DatePicker
              autoOkshrink
              orientation="landscape"
              variant="static"
              openTo="date"
              value={appointmentDateState}
              onChange={changeAppointmentDate}
            />
          </MuiPickersUtilsProvider>
        </DatePickerContainer>
        <SelectOptionContainer>
          <FormControl>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
              Department
            </InputLabel>
            <NativeSelect
              value={currentDepartmentValue}
              onChange={handleChangeDepartment}
            >
              <option value="0">Select Department</option>
              {departments !== null
                ? departments.map(item => (
                  <option value={item.id} key={item.id}>{item.attributes.name}</option>
                ))
                : null}
            </NativeSelect>
            <FormHelperText>Choose an option</FormHelperText>
          </FormControl>

        </SelectOptionContainer>

      </LeftSideBar>
      <ContentWrapper className="d-flex flex-column justify-content-start">
        <ContentLogout className="d-flex flex-row justify-content-between">
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            New
          </Button>
          <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to t
                  occasionally.
                </DialogContentText>
                <div className="my-3">
                  <FormControl>
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                      Start Time:
                    </InputLabel>
                    <NativeSelect
                      value={startTimeState}
                      onChange={handleChangeStartTime}
                    >
                      <option value="0">Select Department</option>
                      {listShiftDetailsState !== null
                        ? listShiftDetailsState.map(item => (
                          <option value={item.id} key={item.id}>{item.startTime}</option>
                        ))
                        : null}
                    </NativeSelect>
                    <FormHelperText>Label + placeholder</FormHelperText>
                  </FormControl>
                  <LabelAppointmentDate className="d-flex flex-row my-3">
                    <InputLabel htmlFor="age-native-label-placeholder">
                      End Time:
                    </InputLabel>

                    <InputLabel htmlFor="age-native-label-placeholder">
                      {intervalTimeState.endTime}
                    </InputLabel>
                  </LabelAppointmentDate>
                </div>

                <LabelAppointmentDate className="d-flex flex-row my-3">
                  <InputLabel htmlFor="age-native-label-placeholder">
                    Date:
                  </InputLabel>

                  <InputLabel htmlFor="age-native-label-placeholder">
                    {appointmentDateState}
                  </InputLabel>
                </LabelAppointmentDate>
                <LabelAppointmentDepartment className="d-flex flex-row my-3">
                  <InputLabel htmlFor="age-native-label-placeholder">
                    Service:
                  </InputLabel>
                  <InputLabel htmlFor="age-native-label-placeholder">
                    {currentDepartment.attributes.name}
                  </InputLabel>
                </LabelAppointmentDepartment>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmitModal} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          { loading ? <Logout /> : null }
        </ContentLogout>
        {doctorCalendarByDepartment !== null
          ? doctorCalendarByDepartment.map(item => (
            <Resume
              key={item.user_id}
              doctorName={`${item.doctorpersonInformation.attributes.firstName} ${item.doctorpersonInformation.attributes.lastName}`}
              location={currentDepartment.attributes.location}
              startTime={moment.utc(item.startTime).format('HH:mm')}
              endTime={moment.utc(item.endTime).format('HH:mm')}
            />
          ))
          : null}

        <ContentAvailability>
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
            : <h1>no data</h1> }
        </ContentAvailability>
      </ContentWrapper>
    </AppointmentWrapper>
  );
};

export default Appointment;
