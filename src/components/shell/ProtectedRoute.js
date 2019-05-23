import React, { useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../redux/auth';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

  const isUserAuthorized = () => {
    return !roles || user; // TODO: Remove this
    if (user && user.role) return roles.some(elem => elem === user.role);
    logout();
    return false;
  };

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