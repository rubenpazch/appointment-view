import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// eslint-disable-next-line no-unused-vars
const initialValues = {
  email: 'admin@test.com',
  password: 'demo',
};

// eslint-disable-next-line no-unused-vars
const Login = props => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimun 3 symbols')
      .required({
        id: 'AUTH.VALIDATION.REQUIRED_FIELD',
      }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log({ values });
      setSubmitting(false);
      setStatus({
        id: 'AUTH.VALIDATION.INVALID_LOGIN',
      });
    },
  });

  return (
    <div>
      {/* begin::Head */}
      <div>
        <h3>
          formated message
        </h3>
        <p>
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/* begin::Form */}
      <form>
        {formik.status ? (
          <div>
            <div>{formik.status}</div>
          </div>
        ) : (
          <div>
            <div>
              Use account
              {' '}
              <strong>admin@demo.com</strong>
              {' '}
              and password
              {' '}
              <strong>demo</strong>
              {' '}
              to continue.
            </div>
          </div>
        )}
        <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div>
              <div>{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            name="password"
          />
        </div>
        <div>
          <Link
            to="/auth/forgot-password"
            id="kt_login_forgot"
          >
            forgot password
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
          >
            <span>Sign In</span>
          </button>
        </div>
      </form>
      {/* end::Form */}
    </div>
  );
};
export default Login;
