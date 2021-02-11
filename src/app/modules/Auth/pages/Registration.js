import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  setUserInformation,
  setActiveStep,
} from '../_redux/authAction';

import { register } from '../_redux/authService';

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

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { patient } = useSelector(state => state.tokenStore);

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
    email: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    username: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: values => {
      enableLoading();
      dispatch(setActiveStep(2));
      setTimeout(() => {
        /* eslint-disable camelcase */
        register(values.email, values.username, values.password, patient.id)
          .then(({ data: { data: { attributes: { email, username, role_id } } } }) => {
            dispatch(setUserInformation({
              email, username, role_id,
            }));
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
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              id="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              aria-describedby="component-error-text"
            />
            {formik.errors.email ? <FormHelperText id="component-error-text" error>{formik.errors.email}</FormHelperText> : null}

          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="username">username</InputLabel>
            <Input
              id="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              aria-describedby="component-error-text"
            />
            {formik.errors.username ? <FormHelperText id="component-error-text" error>{formik.errors.username}</FormHelperText> : null}

          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              aria-describedby="component-error-text"
            />
            {formik.errors.password ? <FormHelperText id="component-error-text" error>{formik.errors.password}</FormHelperText> : null}
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

export default Registration;
