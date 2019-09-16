import React, { FC, ReactElement } from 'react';
import { Formik, Form, FormikActions } from 'formik';
import { TextField } from 'ui/shared/TextField';
import * as yup from 'yup';
import { INVALID_EMAIL, INVALID_PASSWORD, REQUIRED } from 'constants/validation';
import { Button } from 'ui/shared/Button';
import { forTabletPortraitUp } from 'theme';
import styled from 'styled-components/macro';
import { history } from 'utils/history';
import { REGISTER } from 'constants/routing';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: LoginFormValues, actions: FormikActions<LoginFormValues>) => void;
  initialValues?: LoginFormValues;
  isLoading?: boolean;
}

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email(INVALID_EMAIL)
    .required(REQUIRED),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, INVALID_PASSWORD)
    .required(REQUIRED),
});

const StyledButton = styled(Button)`
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  ${forTabletPortraitUp()} {
    flex: 1;

    &:not(:first-child) {
      margin-left: 20px;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const LoginActions = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  ${forTabletPortraitUp()} {
    flex-direction: row;
  }
`;

export const LoginForm: FC<Props> = ({
  onSubmit, initialValues, isLoading,
}): ReactElement => {
  const handleRedirect = (): void => history.push(REGISTER);

  return (
    <Formik
      initialValues={initialValues || defaultValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={({ touched, errors }) => (
        <Form>
          <TextField
            label="Adres email:"
            name="email"
            type="email"
            autoComplete="email"
            touched={touched.email}
            error={errors.email}
          />
          <TextField
            label="Hasło:"
            name="password"
            type="password"
            autoComplete="current-password"
            touched={touched.password}
            error={errors.password}
          />
          <LoginActions>
            <StyledButton type="submit" isLoading={isLoading}>Zaloguj</StyledButton>
            <StyledButton variant="secondary" onClick={handleRedirect}>Rejestracja</StyledButton>
          </LoginActions>
        </Form>
      )}
    />
  );
};
