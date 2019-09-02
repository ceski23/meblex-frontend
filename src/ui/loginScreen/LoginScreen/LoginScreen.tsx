import React, { ReactElement, FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { styled, forTabletPortraitUp } from 'theme';
import { ReactComponent as MeblexLogo } from 'assets/meblex_logo.svg';
import { AppState } from 'store/types';
import { Paper } from 'ui/shared/Paper';
import { LoginForm } from 'ui/loginScreen/LoginForm';
import { LoginFormValues } from 'ui/loginScreen/LoginForm/LoginForm';
import FurnitureBackground from 'assets/background.svg';
import { useReduxDispatch } from 'hooks';
import { login } from 'store/auth/actions';
import { toast } from 'react-toastify';
import { LOGIN_SUCCESSFUL } from 'constants/Api';
import { WELCOME_1, LOG_IN, WELCOME_2 } from 'constants/LoginScreen';

const Welcome = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
`;

const Icons = styled.div`
  opacity: .5;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
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
  const { data } = useSelector(({ user }: AppState) => user);
  const { isLoading } = useSelector(({ auth }: AppState) => auth.status);
  const { from } = location.state || { from: { pathname: '/' } };
  const dispatch = useReduxDispatch();

  const handleLogin = (values: LoginFormValues): void => {
    dispatch(login(values))
      .then(() => toast.success(LOGIN_SUCCESSFUL))
      .catch(error => toast.error(error));
  };

  return (
    <>
      {data.user && <Redirect to={from} />}
      <Welcome>
        <Icons />
        <Logo />
        <FormContainer>
          <FormTitle>{WELCOME_1} <strong>{LOG_IN}</strong> {WELCOME_2}</FormTitle>
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </FormContainer>
      </Welcome>
    </>
  );
};
