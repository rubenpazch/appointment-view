import PropTypes from 'prop-types';
import React from 'react';

const Alert = ({ message, footerMessage }) => (
  <div className="alert alert-warning m-5" role="alert">
    <h4 className="alert-heading">This is not an error</h4>
    <p>{message}</p>
    <hr />
    <p className="mb-0">{footerMessage}</p>
  </div>
);

Alert.propTypes = {
  message: PropTypes.string,
  footerMessage: PropTypes.string,
};

Alert.defaultProps = {
  message: null,
  footerMessage: null,
};

export default Alert;
