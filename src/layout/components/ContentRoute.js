import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Content from './Content';

const ContentRoute = ({ component }) => (
  <Route>
    {routeProps => {
      if (component) {
        return (
          <Content>{React.createElement(component, routeProps)}</Content>
        );
      }
      return null;
    }}
  </Route>
);
ContentRoute.defaultProps = {
  component: null,
};

ContentRoute.propTypes = {
  component: PropTypes.func,
};

export default ContentRoute;
