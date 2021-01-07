import React from 'react';
import PropTypes from 'prop-types';
// import { useRouteMatch } from 'react-router-dom';

const Content = ({ children }) => {
  // const match = useRouteMatch() || {};
  console.log('entro a content');

  return <>{children}</>;
};

Content.defaultProps = {
  children: {},
  // component: {},
  // render: {},
};

Content.propTypes = {
  children: PropTypes.arrayOf,
  // component: PropTypes.arrayOf,
  // render: PropTypes.arrayOf,
};

export default Content;
