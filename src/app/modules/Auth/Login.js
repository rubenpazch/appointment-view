import React from 'react';
// import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const initialValues = {
  email: 'admin@test.com',
  password: 'demo',
};

// eslint-disable-next-line no-unused-vars
const Login = props => (
  <div>
    <input
      placeholder="Email"
      type="email"
      name="email"
    />
    <input
      placeholder="Password"
      type="password"
      name="password"
    />
    <button
      id="kt_login_signin_submit"
      type="submit"
    >
      <span>Sign In</span>
    </button>
  </div>
);
export default Login;
