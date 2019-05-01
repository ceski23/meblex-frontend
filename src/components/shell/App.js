import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector, useActions } from 'react-redux';

import '../shared/main.scss';

import LoginScreen from '../loginScreen/LoginScreen';
import Content from './Content';

import * as API from '../../api';
import Registration from '../registration/Registration';
import Loading from '../shared/Loading';
import { logout as logoutAction, setLoginStatus as loginStatusAction } from '../../redux/auth';


const App = withRouter(({ history }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const accessToken = useSelector(state => state.auth.accessToken);

  const { logout, setLoginStatus } = useActions({
    logout: logoutAction,
    setLoginStatus: loginStatusAction,
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      logout();
      setIsLoading(false);
    } else {
      const loginStatusChecking = async () => {
        try {
          await API.checkStatus();
          await API.ping(); // TODO: Remove this
          setLoginStatus(true);
        } catch (error) {
          if (error === 401) setLoginStatus(false);
        }
        setIsLoading(false);
      };
      loginStatusChecking();
    }
  }, [accessToken, logout, setLoginStatus]);

  useEffect(() => {
    if (!loggedIn) history.replace('/logowanie');
  }, [history, loggedIn]);

  return (
    <Switch>
      <Route path="/logowanie" component={LoginScreen} />
      <Route path="/rejestracja" component={Registration} />
      <Route
        path="/wyloguj"
        render={() => {
          setTimeout(() => { logout(); });
        }}
      />

      <Route render={() => (
        <Loading isLoading={isLoading} type="alt" text="Ładowanie...">
          <Content />
        </Loading>
      )}
      />
    </Switch>
  );
});


export default App;
