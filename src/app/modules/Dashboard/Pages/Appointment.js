/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';

import { getListAppointmentByDateService, saveAppointment } from '../../Appointment/_redux/appointmentService';
import { ToastContext } from '../../../../components/ToastContextProvider';
import ModalAppointment from './ModalAppointment';

const Wrapper = styled.div`
`;
const ContentLogout = styled.div`
  padding: 15px;
  margin: 0;
  button {
    min-width: 100px;
  }
`;
const LabelAppointmentDate = styled.div`
  padding: 0;
  margin: 0;
`;

const LabelAppointmentDepartment = styled.div`
  padding: 0;
  margin: 0;
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
const getTextFromObject = text => {
  const expresionRegular = /\[|\]/;
  const result = text.split(expresionRegular);
  if (typeof (result[1]) !== 'undefined' && result[1] !== null) {
    return result[1];
  }
  return '';
};

const Appointment = () => {
  const { notify } = useContext(ToastContext);
  // eslint-disable-next-line camelcase
  const { departments, user_id } = useSelector(state => state.tokenStore);
  const [currentDepartment, setCurrentDepartment] = useState(defaultDepartment);
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [open, setOpen] = React.useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitModal = values => {
    handleClose();
    console.log({ values });
    // eslint-disable-next-line camelcase
    const { startTime, endTime, doctor_id } = intervalTimeState;

    saveAppointment(appointmentDateState, startTime, endTime, user_id, doctor_id)
      .then(({ response }) => {
        if (response.status === 422) {
          // console.log(response.request.responseText);
          notify(`Error: ${getTextFromObject(response.request.responseText)}`);
        } else if (response.status === 200) {
          // console.log('success');
          handleClose();
        } else {
          // console.log('else');
        }
      }, error => {
        // if (response.data.user_id[0] !== null) {
        //   notify(response.data.user_id[0]);
        // }
        // console.log('error --> ', error);
      })
      .catch(error => {
        // console.log('error --> ', { error });
      });
  };

  return (
    <Wrapper>
      <ContentLogout className="d-flex flex-row justify-content-between">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          New
        </Button>
        <ModalAppointment
          open={open}
          handleClose={handleClose}
          handleSubmitModal={handleSubmitModal}
        />
      </ContentLogout>
    </Wrapper>
  );
};

export default Appointment;
