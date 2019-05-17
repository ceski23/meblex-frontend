import React, { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { useActions, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';
import S from './LoginScreen.module.scss';
import { Furniture } from '../../assets';
import * as API from '../../api';
import LoginForm from './LoginForm';
import Loading from '../shared/Loading';
import { setUserData as setUserDataAction } from '../../redux/auth';


const LoginScreen = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setUserData = useActions(data => setUserDataAction(data));
  const user = useSelector(state => state.auth.user);

  const { from } = location.state || { from: { pathname: '/' } };

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const { accessToken, refreshToken, ...userData } = await API.login(values);
      setUserData(userData);
    } catch (err) {
      setIsLoading(false);
      throw new SubmissionError({ _error: err.title });
    }
  };

  return (
    <React.Fragment>
      {user && <Redirect to={from} />}

      <Loading isLoading={isLoading} text="Logowanie..." />

      <section className={S.welcome}>
        <div className={S.icons}>
          {Object.keys(Furniture).map((key, i) => {
            const Icon = Furniture[key];
            return <Icon key={i} className={S.icon} />;
          })}
        </div>

        <Logo className={S.logo} />
        <LoginForm onSubmit={handleLogin} />
      </section>
    </React.Fragment>
  );
};

export default LoginScreen;
