import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

const Content = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const match = useRouteMatch() || {};
  return <>{children}</>;
};

Content.defaultProps = {
  children: {},
};

Content.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object,
};

export default Content;
