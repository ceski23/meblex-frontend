import React, { FC, ReactElement } from 'react';
import { Formik, Form, FormikActions } from 'formik';
import { TextField } from 'ui/shared/TextField';
import * as yup from 'yup';
import {
 INVALID_EMAIL, INVALID_PASSWORD, REQUIRED, MAX_CHARACTERS, INVALID_POST_CODE, INVALID_NIP,
} from 'constants/validation';
import { Button } from 'ui/shared/Button';
import { forTabletLandscapeUp } from 'theme';
import styled from 'styled-components/macro';

export interface RegisterFormValues {
  email: string;
  password: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  nip: string;
  state: string;
}

interface Props {
  onSubmit: (values: RegisterFormValues, actions: FormikActions<RegisterFormValues>) => void;
  initialValues?: RegisterFormValues;
  isLoading?: boolean;
}

const defaultValues: RegisterFormValues = {
  email: '',
  password: '',
  name: '',
  address: '',
  city: '',
  postCode: '',
  nip: '',
  state: '',
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
  name: yup
    .string()
    .max(32, MAX_CHARACTERS)
    .required(REQUIRED),
  address: yup
    .string()
    .max(32, MAX_CHARACTERS)
    .required(REQUIRED),
  state: yup
    .string()
    .max(32, MAX_CHARACTERS)
    .required(REQUIRED),
  city: yup
    .string()
    .max(32, MAX_CHARACTERS)
    .required(REQUIRED),
  postCode: yup
    .string()
    .matches(/^\d{2}-\d{3}$/, INVALID_POST_CODE)
    .required(REQUIRED),
  nip: yup
    .string()
    .matches(/^\d{10}$/, INVALID_NIP),
});

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 40px;
  ${forTabletLandscapeUp()} {
    width: 300px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${forTabletLandscapeUp()} {
    flex-direction: row;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Column = styled.div`
  ${forTabletLandscapeUp()} {
    &:not(:first-child) {
      margin-left: 20px;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export const RegisterForm: FC<Props> = ({
  onSubmit, initialValues, isLoading,
}): ReactElement => (
  <Formik
    initialValues={initialValues || defaultValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    render={({ touched, errors }) => (
      <StyledForm>
        <Container>
          <Column>
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
              autoComplete="new-password"
              touched={touched.password}
              error={errors.password}
            />
          </Column>
          <Column>
            <TextField
              label="Imię i nazwisko:"
              name="name"
              type="text"
              autoComplete="name"
              touched={touched.name}
              error={errors.name}
            />
            <TextField
              label="NIP:"
              name="nip"
              type="tel"
              touched={touched.nip}
              error={errors.nip}
            />
          </Column>
          <Column>
            <TextField
              label="Adres:"
              name="address"
              type="text"
              autoComplete="street-address"
              touched={touched.address}
              error={errors.address}
            />
            <TextField
              label="Województwo:"
              name="state"
              type="text"
              autoComplete="address-level1"
              touched={touched.state}
              error={errors.state}
            />
            <TextField
              label="Miasto:"
              name="city"
              type="text"
              autoComplete="address-level2"
              touched={touched.city}
              error={errors.city}
            />
            <TextField
              label="Kod pocztowy:"
              name="postCode"
              type="tel"
              autoComplete="postal-code"
              mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/]}
              touched={touched.postCode}
              error={errors.postCode}
            />
          </Column>
        </Container>
        <StyledButton type="submit" isLoading={isLoading}>Zarejestruj się</StyledButton>
      </StyledForm>
    )}
  />
);
