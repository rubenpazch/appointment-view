/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/en-in';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

import { getDepartments, getDoctorCalendars } from '../Auth/_redux/authService';
import { setDepartments, setDoctorCalendars } from '../Auth/_redux/authAction';
import { setListByDateService } from './_redux/appointmentAction';
import { getListAppointmentByDateService, saveAppointment } from './_redux/appointmentService';
import AppointmentDetail from './pages/AppointmentDetail';
import Logout from '../Auth/pages/Logout';

moment.locale('en');

const AppointmentWrapper = styled.div`  
  width: 100%;
`;

const LeftSideBar = styled.div`
  width: 30%;
`;

const ContentWrapper = styled.div`
  width: 65%;
  padding: 15px 0 0 15px;
  margin: 0;
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

const Appointment = () => {
  // const [loading, setLoading] = useState(true);
  const loading = true;
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [currentDepartmentValue, setCurrentDepartmentValue] = useState(0);
  const [currentDepartment, setCurrentDepartment] = useState(defaultDepartment);
  const [doctorCalendarByDay, setDoctorCalendarByDay] = useState(defaultDoctorCalendar);
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
  const notify = message => toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  const [locale] = useState('en');
  // const { filterappointmentsby } = useSelector(state => state.appointmentStore);
  const [filterAppointmentsBy, setFilterAppointmentsBy] = useState();
  const [availability, setAvailability] = useState();
  // eslint-disable-next-line camelcase
  const { departments, user_id } = useSelector(state => state.tokenStore);
  const { doctorcalendars } = useSelector(state => state.tokenStore);
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
        console.log('ok --> ', response);
        if (response.status === 422) {
          console.log('--> ', response.data.appointmentDate[0]);
          notify(response.data.appointmentDate[0]);
        } else if (response.status === 200) {
          console.log('success');
        } else {
          console.log('else');
        }
      }, error => {
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
          };
          arrayHours.push(obj);
          return defaultDoctorCalendar;
        });

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
            };
            arrayShiftDetailByHour.push(obj);
            nextStartTime = moment.utc(nextStartTime).add(15, 'minutes');
            indexKey += 1;
          }
        }
        setListShiftDetailsState(arrayShiftDetailByHour);
        for (let indexh = 0; indexh < data.data.length; indexh += 1) {
          const foundIndex = arrayShiftDetailByHour.findIndex(
            x => x.startTime === moment.utc(data.data[indexh].attributes.startTime).format('HH:mm'),
          );
          if (foundIndex !== -1) {
            arrayShiftDetailByHour[foundIndex].status = true;
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
        dispatch(setDoctorCalendars(data));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);doctorcalendars
        // setStatus('not working');
      });
  }, []);

  return (
    <AppointmentWrapper className="d-flex flex-row">
      <LeftSideBar>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
          <DatePicker
            autoOkshrink
            orientation="landscape"
            variant="static"
            openTo="date"
            value={appointmentDateState}
            onChange={changeAppointmentDate}
          />
          <div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </MuiPickersUtilsProvider>
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
          <FormHelperText>Label + placeholder</FormHelperText>
        </FormControl>
        { loading ? <Logout /> : null }
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            New
          </Button>
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
      </LeftSideBar>
      <ContentWrapper className="d-flex flex-column justify-content-center">
        { availability !== null && typeof (availability) !== 'undefined'
          ? availability.map(item => (
            <AppointmentDetail
              key={item.id}
              time={item.startTime}
              endTime={item.endTime}
              status={item.status}
              patient="Mia Maria Fernando Baca Paz"
              service="ODONTOLOGIA BASICA"
              office="Consultorio 105 (Ubicado en el piso 4 modulo 3)"
            />
          ))
          : <h1>no data</h1> }
      </ContentWrapper>
    </AppointmentWrapper>
  );
};

export default Appointment;
