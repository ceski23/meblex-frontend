import React, { FC, ReactElement } from 'react';
import { Formik, Form, FormikActions } from 'formik';
import { TextField } from 'ui/shared/TextField';
import * as yup from 'yup';
import { REQUIRED, INVALID_EMAIL } from 'constants/validation';
import { Button } from 'ui/shared/Button';
import styled from 'styled-components/macro';
import { FIELD_EMAIL, CHANGE_EMAIL_ADDRESS } from 'constants/forms';

export interface ChangeEmailFormValues {
  newEmail: string;
}

interface Props {
  onSubmit: (values: ChangeEmailFormValues, actions: FormikActions<ChangeEmailFormValues>) => void;
  initialValues?: ChangeEmailFormValues;
  isLoading?: boolean;
}

const defaultValues: ChangeEmailFormValues = {
  newEmail: '',
};

const validationSchema = yup.object({
  newEmail: yup
    .string()
    .email(INVALID_EMAIL)
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

export const ChangeEmailForm: FC<Props> = ({
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
            label={FIELD_EMAIL}
            name="newEmail"
            type="email"
            autoComplete="email"
            touched={touched.newEmail}
            error={errors.newEmail}
          />
        </Container>
        <StyledButton type="submit" isLoading={isLoading}>{CHANGE_EMAIL_ADDRESS}</StyledButton>
      </StyledForm>
    )}
  />
);
