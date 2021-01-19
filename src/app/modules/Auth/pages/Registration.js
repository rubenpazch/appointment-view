/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { setToken } from '../_redux/authAction';
// import * as auth from '../_redux/authRedux';
import { register } from '../_redux/authService';

const Registration = () => {
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    return () => setLoading(false);
  }, []);

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

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ 
          email: '', 
          username: '', 
          password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          enableLoading();
          setTimeout(() => {
            register(values.email, values.username, values.password)
              .then(() => {
                // dispatch(setToken());
                disableLoading();
              })
              .catch(() => {
                disableLoading();
                setSubmitting(false);
                setStatus('not working');
              });
          }, 1400);
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <h1>{status}</h1>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="username" name="username" />
            <ErrorMessage name="username" component="div" />            
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              <span>Sign Up</span>
              {loading && (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              )}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
