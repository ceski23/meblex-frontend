import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const user = useSelector(state => state.auth.user);
  const isUserAuthorized = () => user && roles.some(elem => elem === user.role);

  return (
    <Route
      {...rest}
      render={props => (isUserAuthorized() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/logowanie',
          state: { from: props.location },
        }}
        />
      ))}
    />
  );
};

export default ProtectedRoute;
