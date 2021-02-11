import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  setPatientInformation,
  setActiveStep,
} from '../_redux/authAction';
import { registerPeople } from '../_redux/authService';

const WrapperField = styled.div` 
  padding: 15px;
`;

const WrapperLogin = styled.div`  
  min-width: 70vw;  
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width:100%;
  max-width: 200px;
`;

const PatientInformation = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    return () => setLoading(false);
  }, []);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    lastname: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    documentid: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    phone: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    historynumber: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstname: '', lastname: '', documentid: '', phone: '', historynumber: '',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      enableLoading();
      dispatch(setActiveStep(1));
      setTimeout(() => {
        registerPeople(
          values.firstname,
          values.lastname,
          values.documentid,
          values.phone,
          values.historynumber,
        )
          .then(({
            data: {
              data: {
                attributes: {
                  firstName, lastName, documentId, phone, historyNumber,
                },
                id,
              },
            },
          }) => {
            dispatch(
              setPatientInformation({
                firstName, lastName, documentId, phone, historyNumber, id,
              }),
            );
            disableLoading();
          })
          .catch(() => {
            disableLoading();
            // setSubmitting(false);
            // setStatus('not working');
          });
      }, 1400);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WrapperLogin className="d-flex flex-column align-items-center">

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input
              id="firstname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstname}
              aria-describedby="component-error-text"
            />
            {formik.errors.firstname ? <FormHelperText id="component-error-text" error>{formik.errors.firstname}</FormHelperText> : null}

          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              id="lastname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              aria-describedby="component-error-text"
            />
            {formik.errors.lastname ? <FormHelperText id="component-error-text" error>{formik.errors.lastname}</FormHelperText> : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="documentid">Document ID</InputLabel>
            <Input
              id="documentid"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.documentid}
              aria-describedby="component-error-text"
            />
            {formik.errors.documentid ? <FormHelperText id="component-error-text" error>{formik.errors.documentid}</FormHelperText> : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input
              id="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              aria-describedby="component-error-text"
            />
            {formik.errors.phone ? <FormHelperText id="component-error-text" error>{formik.errors.phone}</FormHelperText> : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="historynumber">History Number</InputLabel>
            <Input
              id="historynumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.historynumber}
              aria-describedby="component-error-text"
            />
            {formik.errors.historynumber ? <FormHelperText id="component-error-text" error>{formik.errors.historynumber}</FormHelperText> : null}
          </FormControl>
        </WrapperField>

        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          {loading && (
          <CircularProgress color="secondary" />
          )}
        </WrapperButton>
      </WrapperLogin>

    </form>
  );
};

export default PatientInformation;
