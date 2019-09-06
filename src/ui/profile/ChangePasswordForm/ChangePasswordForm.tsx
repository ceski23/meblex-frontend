import React, { FC, ReactElement } from 'react';
import { Formik, Form, FormikActions } from 'formik';
import { TextField } from 'ui/shared/TextField';
import * as yup from 'yup';
import { REQUIRED, INVALID_PASSWORD, PASSWORD_MISMATCH } from 'constants/validation';
import { Button } from 'ui/shared/Button';
import { styled } from 'theme';
import {
 CURRENT_PASSWORD_FIELD, NEW_PASSWORD_FIELD, REPEAT_PASSWORD_FIELD, CHANGE_PASSWORD,
} from 'constants/forms';

export interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

interface Props {
  onSubmit: (values: ChangePasswordFormValues, actions: FormikActions<ChangePasswordFormValues>) => void;
  initialValues?: ChangePasswordFormValues;
  isLoading?: boolean;
}

const defaultValues: ChangePasswordFormValues = {
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
};

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, INVALID_PASSWORD)
    .required(REQUIRED),
  newPassword: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, INVALID_PASSWORD)
    .required(REQUIRED),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], PASSWORD_MISMATCH)
    .required(REQUIRED),
});

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ChangePasswordForm: FC<Props> = ({
  onSubmit, initialValues, isLoading,
}): ReactElement => (
  <Formik
    initialValues={initialValues || defaultValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    render={({ touched, errors }) => (
      <StyledForm>
        <Container>
          <TextField
            label={CURRENT_PASSWORD_FIELD}
            name="oldPassword"
            type="password"
            autoComplete="current-password"
            touched={touched.oldPassword}
            error={errors.oldPassword}
          />
          <TextField
            label={NEW_PASSWORD_FIELD}
            name="newPassword"
            type="password"
            autoComplete="new-password"
            touched={touched.newPassword}
            error={errors.newPassword}
          />
          <TextField
            label={REPEAT_PASSWORD_FIELD}
            name="repeatPassword"
            type="password"
            autoComplete="new-password"
            touched={touched.repeatPassword}
            error={errors.repeatPassword}
          />
        </Container>
        <StyledButton type="submit" isLoading={isLoading}>{CHANGE_PASSWORD}</StyledButton>
      </StyledForm>
    )}
  />
);
