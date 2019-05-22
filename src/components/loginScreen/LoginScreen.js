/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { useActions, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTheme } from '../../helpers';

import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';
import { Furniture } from '../../assets';
import * as API from '../../api';
import LoginForm from './LoginForm';
import Loading from '../shared/Loading';
import { setUserData as setUserDataAction } from '../../redux/auth';


const LoginScreen = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const setUserData = useActions(data => setUserDataAction(data));
  const user = useSelector(state => state.auth.user);

  const { from } = location.state || { from: { pathname: '/' } };

  const style = {
    welcome: css`
      display: flex;
      width: 100%;
      height: 100%;
      min-height: 100vh;
      background: ${theme.colors.primary};
      position: relative;
      padding: 0;
    `,

    logo: css`
      margin-bottom: 20px;
      fill: #fff;
      height: 70px;
    `,

    icons: css`
      opacity: .5;
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      overflow: hidden;
    `,

    icon: css`
      margin: 40px;
      display: inline-block;
      width: 40px;
      height: 40px;
      fill: #fff;
    `,
  };

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

      <section css={style.welcome}>
        <div css={style.icons}>
          {Object.keys(Furniture).map((key, i) => {
            const Icon = Furniture[key];
            return <Icon key={i} css={style.icon} />;
          })}
        </div>

        <Logo css={style.logo} />
        <LoginForm onSubmit={handleLogin} />
      </section>
    </React.Fragment>
  );
};

export default LoginScreen;
