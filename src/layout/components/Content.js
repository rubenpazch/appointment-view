import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => <>{children}</>;

Content.defaultProps = {
  children: {},
};

Content.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object,
};

export default Content;
