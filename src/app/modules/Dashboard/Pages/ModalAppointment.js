/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';

import {
  useFormik, Formik,
} from 'formik';

const ModalAppointment = ({
  handleSubmitModal,
  handleClose,
  open,
}) => {
  const [startTimeState, setStartTimeState] = useState('08:00');
  const [intervalTimeState, setIntervalTimeState] = useState('');

  const LoginSchema = Yup.object().shape({
    startTimeState: Yup.string()
      .required('this field is required'),
  });

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
  // const [openModal, setOpenModal] = useState(open);
  const handleChangeStartTime = event => {
    setStartTimeState(event.target.value);
    // const shiftDetail = listShiftDetailsState.find(
    //   item => Number(item.id) === Number(event.target.value),
    // );
    // setIntervalTimeState(shiftDetail);
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Use this form to register a new appointment
            </DialogContentText>
            <Formik
              initialValues={{ email: '', name: '', comment: '' }}
              onSubmit={values => handleSubmitModal(values)}
              validationSchema={
                Yup.object().shape({
                  email: Yup.string()
                    .email()
                    .required('Required'),
                  name: Yup.string()
                    .required('Required'),
                  comment: Yup.string()
                    .required('Required'),
                })
              }
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>

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

                    <TextField
                      label="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.name && touched.name) && errors.name}
                      margin="normal"
                    />

                    <TextField
                      error={errors.email && touched.email}
                      label="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.email && touched.email) && errors.email}
                      margin="normal"
                    />

                    <TextField
                      label="comment"
                      name="comment"
                      value={values.comment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.comment && touched.comment) && errors.comment}
                      margin="normal"
                    />
                    <DialogActions>
                      <Button onClick={handleClose} className="outline">
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        className="outline"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                      >
                        Reset
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        Submit
                      </Button>
                      {/* <DisplayFormikState {...props} /> */}
                    </DialogActions>
                  </form>
                );
              }}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ModalAppointment;
