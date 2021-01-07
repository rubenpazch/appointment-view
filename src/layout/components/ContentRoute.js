import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Content from './Content';

const ContentRoute = ({ component, path }) => {
  console.log('path ==> ', path);

  return (
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
};

ContentRoute.defaultProps = {
  component: null,
  path: '',
  // render: {},
};

ContentRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
  // render: PropTypes.arrayOf,
};

export default ContentRoute;
