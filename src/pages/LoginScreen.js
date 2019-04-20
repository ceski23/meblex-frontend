import React, { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../assets/meblex_logo.svg';
import S from '../styles/LoginScreen.module.scss';
import { Furniture } from '../assets';
import * as API from '../api';
import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';
import { setLoginStatus } from '../redux/loginStatus';


const LoginScreen = ({ history, setLoginStatus }) => {
  const [isLoading, setIsLoading] = useState(false);

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

export default connect(
  state => ({ loggedIn: state.loginStatus.loggedIn }),
  { setLoginStatus },
)(LoginScreen);
