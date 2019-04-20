import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../shared/main.scss';

import LoginScreen from '../loginScreen/LoginScreen';
import Content from './Content';

import * as API from '../../api';
import Registration from '../registration/Registration';
import Loading from '../shared/Loading';
import { logout, setLoginStatus } from '../../redux/auth';


const App = withRouter(({ history, loggedIn, setLoginStatus, logout, accessToken }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      // logout();
      setIsLoading(false);
    } else {
      const loginStatusChecking = async () => {
        try {
          await API.checkStatus();
          setIsLoading(false);
          setLoginStatus(true);
        } catch (error) {
          setIsLoading(false);
        }
      };
      loginStatusChecking();
    }
  }, [accessToken, logout]);

  useEffect(() => {
    if (!loggedIn) history.replace('/logowanie');
  }, [loggedIn]);

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


export default connect(
  state => ({
    loggedIn: state.auth.loggedIn,
    accessToken: state.auth.access_token,
  }),
  { logout, setLoginStatus },
)(App);
