import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { removeToken } from '../_redux/authAction';

const Logout = () => {
  const dispatch = useDispatch();
  const onSubmitLogout = () => {
    dispatch(removeToken());
  };

  return (
    <div>
      <Button variant="primary" onClick={onSubmitLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
