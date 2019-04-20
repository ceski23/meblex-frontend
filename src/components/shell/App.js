import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAsyncEffect } from 'use-async-effect';

import '../shared/main.scss';

import LoginScreen from '../loginScreen/LoginScreen';
import Content from './Content';

import * as API from '../../api';
import Registration from '../registration/Registration';
import Loading from '../shared/Loading';
import { setLoginStatus } from '../../redux/auth';


const App = withRouter(({ history, loggedIn, setLoginStatus }) => {
  const [isLoading, setIsLoading] = useState(true);

  useAsyncEffect(async () => {
    // if (!localStorage.getItem('access_token') || localStorage.getItem('access_token') === '') {
    //   setLoginStatus(false);
    //   setTimeout(() => setIsLoading(false), 0);
    // }
    // else {
    //   setIsLoading(true);
    //   try {
    //     // await API.checkStatus();
    //     setLoginStatus(true);
    //     setIsLoading(false);
    //   } catch (error) {
    setIsLoading(false);
    //   }
    // }
  }, []);

  // useEffect(() => {
  //   if (!loggedIn) history.replace('/logowanie');
  // }, [loggedIn])

  return (
    <Switch>
      <Route path="/logowanie" component={LoginScreen} />
      <Route path="/rejestracja" component={Registration} />

      <Route
        path="/wyloguj"
        render={() => {
          localStorage.setItem('access_token', '');
          localStorage.setItem('refresh_token', '');
          setTimeout(() => setLoginStatus(false), 0);
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
  state => ({ loggedIn: state.auth.loggedIn }),
  { setLoginStatus },
)(App);
