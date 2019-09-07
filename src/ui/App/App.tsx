import React, {
 FC, ReactElement, useEffect,
} from 'react';
import { getUserData } from 'store/user/actions';
import { useReduxDispatch } from 'hooks';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { Content } from 'ui/Content';
import { Logout } from 'ui/Logout';
import { LoginScreen } from 'ui/loginScreen';
import { LOGIN, LOGOUT, REGISTER } from 'constants/routing';
import { RegisterScreen } from 'ui/registration/RegisterScreen';
import { Router } from '@reach/router';

export const App: FC = (): ReactElement => {
  const dispatch = useReduxDispatch();
  const { data } = useSelector(({ auth }: AppState) => auth);

  useEffect(() => {
    if (data.accessToken) dispatch(getUserData());
  }, [data.accessToken, dispatch]);

  return (
    <Router>
      <LoginScreen path={LOGIN} />
      <Logout path={LOGOUT} />
      <RegisterScreen path={REGISTER} />
      <Content default />
    </Router>
  );
};
