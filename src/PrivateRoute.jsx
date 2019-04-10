import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './util/auth';
import { ROUTES } from './constants';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.login,
              // eslint-disable-next-line react/prop-types
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
