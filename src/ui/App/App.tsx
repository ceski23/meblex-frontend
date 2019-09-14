import React, { FC, ReactElement, useEffect } from 'react';
import { Switch, Route } from 'react-router';

import { Loading } from 'ui/shared/Loading';
import { LOADING } from 'constants/App';
import { getUserData } from 'store/user/actions';
import { useReduxDispatch } from 'hooks';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { Content } from 'ui/Content';
import { Logout } from 'ui/Logout';
import { LoginScreen } from 'ui/loginScreen';
import { LOGIN, LOGOUT, REGISTER } from 'constants/routing';
import { RegisterScreen } from 'ui/registration/RegisterScreen';

export const App: FC = (): ReactElement => {
  const dispatch = useReduxDispatch();
  const { status, data: { accessToken } } = useSelector(({ auth }: AppState) => auth);

  useEffect(() => {
    if (accessToken) dispatch(getUserData());
  }, [accessToken, dispatch]);

  return (
    <Switch>
      <Route path={LOGIN} component={LoginScreen} />
      <Route path={REGISTER} component={RegisterScreen} />
      <Route path={LOGOUT} component={Logout} />

      <Route render={routeProps => (
        <Loading isLoading={status.isLoading} text={LOADING}>
          <Content {...routeProps} />
        </Loading>
      )}
      />
    </Switch>
  );
};
