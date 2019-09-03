import React, { ReactElement, FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';

import { styled, forTabletPortraitUp, forTabletLandscapeUp } from 'theme';
import { ReactComponent as MeblexLogo } from 'assets/meblex_logo.svg';
import { AppState } from 'store/types';
import { Paper } from 'ui/shared/Paper';
import FurnitureBackground from 'assets/background.svg';
import { useReduxDispatch } from 'hooks';
import { register } from 'store/auth/actions';
import { toast } from 'react-toastify';
import { REGISTRATION_SUCCESSFUL } from 'constants/Api';
import { FormikActions } from 'formik';
import { HOME } from 'constants/routing';
import { RegisterForm } from '../RegisterForm';
import { RegisterFormValues } from '../RegisterForm/RegisterForm';

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
  
  ${forTabletLandscapeUp()} {
    width: 700px;
  }
`;

const FormTitle = styled.h4`
  margin-bottom: 30px;
  text-align: center;
  font-size: 1.2em;
`;

export const RegisterScreen: FC<RouteComponentProps> = ({ location }): ReactElement => {
  const { status, data } = useSelector(({ auth }: AppState) => auth);
  const { from } = location.state || { from: { pathname: '/' } };
  const dispatch = useReduxDispatch();

  const handleRegister = (values: RegisterFormValues, actions: FormikActions<RegisterFormValues>): void => {
    dispatch(register(values))
      .then(() => toast.success(REGISTRATION_SUCCESSFUL))
      .catch(error => {
        if (error.detail) {
          toast.error(error.detail);
        } else {
          toast.error(error.title);
          actions.setErrors(error.errors);
        }
      });
  };

  return (
    <>
      {data.accessToken && <Redirect to={from} />}
      <Welcome>
        <Icons />
        <Link to={HOME}><Logo /></Link>
        <FormContainer>
          <FormTitle>Formularz rejestracji</FormTitle>
          <RegisterForm onSubmit={handleRegister} isLoading={status.isLoading} />
        </FormContainer>
      </Welcome>
    </>
  );
};
