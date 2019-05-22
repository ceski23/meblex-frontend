/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useState, useCallback } from 'react';
import { SubmissionError } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTheme } from '../../helpers';

import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';
import { Furniture } from '../../assets';
import * as API from '../../api';
import RegistrationForm from './RegistrationForm';
import Loading from '../shared/Loading';
import { setUserData as setUserDataAction } from '../../redux/auth';

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const setUserData = useCallback(data => dispatch(setUserDataAction(data)), [dispatch]);
  const user = useSelector(state => state.auth.user);
  const theme = useTheme();

  const handleRegister = async (values) => {
    setIsLoading(true);

    try {
      await API.register(values);
      const userData = await API.getUserData();
      setUserData(userData);
    } catch (err) {
      setIsLoading(false);

      throw new SubmissionError({
        _error: err.title,
        ...err.errors,
      });
    }
  };

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
      margin: 30px 0;
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

  return (
    <React.Fragment>
      <Loading isLoading={isLoading} text="Rejestrowanie..." />
      {user && <Redirect to="/" />}

      <section css={style.welcome}>
        <div css={style.icons}>
          {Object.keys(Furniture).map((key, i) => {
            const Icon = Furniture[key];
            return <Icon key={i} css={style.icon} />;
          })}
        </div>

        <Logo css={style.logo} />
        <RegistrationForm onSubmit={handleRegister} />
      </section>
    </React.Fragment>
  );
};

export default Registration;
