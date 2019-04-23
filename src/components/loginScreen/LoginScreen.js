import React, { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { useActions } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';
import S from './LoginScreen.module.scss';
import { Furniture } from '../../assets';
import * as API from '../../api';
import LoginForm from './LoginForm';
import Loading from '../shared/Loading';
import { setLoginStatus as loginAction } from '../../redux/auth';


const LoginScreen = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLoginStatus = useActions(status => loginAction(status));

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      await API.login(values);
      setLoginStatus(true);
      history.replace('/');
    } catch (err) {
      setIsLoading(false);
      throw new SubmissionError({ _error: err });
    }
  };

  return (
    <Loading isLoading={isLoading} text="Logowanie...">
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
    </Loading>
  );
};

export default LoginScreen;