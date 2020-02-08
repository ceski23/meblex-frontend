import React, { ReactElement, FC } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';

import { forTabletPortraitUp } from 'theme';
import styled from 'styled-components/macro';
import { ReactComponent as MeblexLogo } from 'assets/meblex_logo.svg';
import { AppState } from 'store/types';
import { Paper } from 'ui/shared/Paper';
import { LoginForm } from 'ui/loginScreen/LoginForm';
import { LoginFormValues } from 'ui/loginScreen/LoginForm/LoginForm';
import FurnitureBackground from 'assets/background.svg';
import { useReduxDispatch } from 'hooks';
import { login } from 'store/auth/actions';
import { LOGIN_SUCCESSFUL } from 'constants/Api';
import { WELCOME_1, LOG_IN, WELCOME_2 } from 'constants/LoginScreen';
import { HOME } from 'constants/routing';
import { toast } from 'utils/toaster';
import { history } from 'utils/history';
import { ApiError } from 'apiService';
import { defaultErrorHandler } from 'utils/apiErrorHandlers';

const Welcome = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
  padding-bottom: 50px;
`;

const Icons = styled.div`
  opacity: .5;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url(${FurnitureBackground});
  background-size: 550px;

  ${forTabletPortraitUp()} {
    background-size: 750px;
  }
`;

const Logo = styled(MeblexLogo)`
  margin: 30px 0;
  fill: ${({ theme }) => theme.colors.primary};
  height: 70px;
`;

const FormContainer = styled(Paper)`
  width: 90%;
  z-index: 1;
  
  ${forTabletPortraitUp()} {
    width: 600px;
  }
`;

const FormTitle = styled.h4`
  margin-bottom: 30px;
  text-align: center;
  font-size: 1.2em;
`;

export const LoginScreen: FC<RouteComponentProps> = ({ location }): ReactElement => {
  const { status } = useSelector(({ auth }: AppState) => auth);
  const { from } = location.state || { from: { pathname: '/' } };
  const dispatch = useReduxDispatch();

  const handleLogin = ({ email, password }: LoginFormValues): void => {
    dispatch(login({
      identifier: email,
      password,
    }))
      .then(() => {
        toast(LOGIN_SUCCESSFUL, 'success');
        history.push(from.pathname);
      })
      .catch(defaultErrorHandler);
  };

  return (
    <Welcome>
      <Icons />
      <Link to={HOME}><Logo /></Link>
      <FormContainer>
        <FormTitle>{WELCOME_1} <strong>{LOG_IN}</strong> {WELCOME_2}</FormTitle>
        <LoginForm onSubmit={handleLogin} isLoading={status.isLoading} />
      </FormContainer>
    </Welcome>
  );
};
