/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { setToken } from '../_redux/authAction';
import { login } from '../_redux/authService';
import { ToastContext } from '../../../../components/ToastContextProvider';

const WrapperUsername = styled.div` 
  padding: 15px;
`;

const WrapperLogin = styled.div`  
  min-width: 70vw;  
`;

const WrapperPassword = styled.div`  
  padding: 15px;
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width:100%;
  max-width: 200px;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { notifyError, notifySuccess } = useContext(ToastContext);

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
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      enableLoading();
      setTimeout(() => {
        login(values.username, values.password)
          .then(({
            data: {
              token, username, user_id, personInformation,
            },
          }) => {
            notifySuccess('Login success');
            dispatch(setToken({
              token, username, user_id, personInformation,
            }));
            disableLoading();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(error => {
            notifyError('Username or password was incorrect, try again.');
            disableLoading();
            actions.setSubmitting(false);
          });
      }, 1400);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WrapperLogin className="d-flex flex-column align-items-center">
        <WrapperUsername className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="username">username</InputLabel>
            <Input
              id="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              aria-describedby="component-error-text"
            />
            { formik.touched.username && formik.errors.username
              ? <FormHelperText id="component-error-text" error>{formik.errors.username}</FormHelperText>
              : null}

          </FormControl>
        </WrapperUsername>

        <WrapperPassword className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              aria-describedby="component-error-text"
            />
            {formik.touched.password && formik.errors.password
              ? <FormHelperText id="component-error-text" error>{formik.errors.password}</FormHelperText>
              : null}
          </FormControl>
        </WrapperPassword>
        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
            Login
          </Button>
          {loading && (
          <CircularProgress color="secondary" />
          )}
        </WrapperButton>
      </WrapperLogin>

    </form>
  );
};

export default Login;
