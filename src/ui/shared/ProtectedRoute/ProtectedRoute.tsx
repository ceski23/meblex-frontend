import React, { ReactElement, FC, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGIN } from 'constants/routing';
import { AppState } from 'store/types';
import { PageNotFound } from 'ui/PageNotFound';
import { logoutUser } from 'store/auth/actions';
import { useReduxDispatch } from 'hooks';

interface Props {
  component: FC;
  roles: string[];
}

export const ProtectedRoute: FC<Props & RouteProps> = ({
  component: Component, roles, ...rest
}): ReactElement => {
  const { data: { user } } = useSelector((state: AppState) => state.user);
  const dispatch = useReduxDispatch();

  const getRouteBody = ({ location }): ReactNode => {
    if (user) user.role.name = 'Client'; // TODO: Remove this hack
    if (user && user.role) {
      if (roles.some(elem => elem === user.role.name)) return <Component />;
      return <PageNotFound />;
    }
    dispatch(logoutUser());
    return (
      <Redirect to={{
        pathname: LOGIN,
        state: { from: location },
      }}
      />
    );
  };

  return (
    <Route {...rest} render={getRouteBody} />
  );
};
