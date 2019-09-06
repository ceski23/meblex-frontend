import React, { FC, ReactElement } from 'react';
import { Formik, Form, FormikActions } from 'formik';
import { TextField } from 'ui/shared/TextField';
import * as yup from 'yup';
import {
 REQUIRED, MAX_CHARACTERS, INVALID_POST_CODE, INVALID_NIP,
} from 'constants/validation';
import { Button } from 'ui/shared/Button';
import { styled } from 'theme';
import {
 FULL_NAME_FIELD, ADDRESS_FIELD, STATE_FIELD, CITY_FIELD, POST_CODE_FIELD, NIP_FIELD, UPDATE_DATA,
} from 'constants/forms';

export interface UserDataFormValues {
  name: string;
  address: string;
  city: string;
  postCode: string;
  nip: string;
  state: string;
}

interface Props {
  onSubmit: (values: UserDataFormValues, actions: FormikActions<UserDataFormValues>) => void;
  initialValues?: UserDataFormValues;
  isLoading?: boolean;
}

const defaultValues: UserDataFormValues = {
  name: '',
  address: '',
  city: '',
  postCode: '',
  nip: '',
  state: '',
};

const validationSchema = yup.object({
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

export const UserDataForm: FC<Props> = ({
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
            label={FULL_NAME_FIELD}
            name="name"
            type="text"
            autoComplete="name"
            touched={touched.name}
            error={errors.name}
          />
          <TextField
            label={ADDRESS_FIELD}
            name="address"
            type="text"
            autoComplete="street-address"
            touched={touched.address}
            error={errors.address}
          />
          <TextField
            label={STATE_FIELD}
            name="state"
            type="text"
            autoComplete="address-level1"
            touched={touched.state}
            error={errors.state}
          />
          <TextField
            label={CITY_FIELD}
            name="city"
            type="text"
            autoComplete="address-level2"
            touched={touched.city}
            error={errors.city}
          />
          <TextField
            label={POST_CODE_FIELD}
            name="postCode"
            type="tel"
            autoComplete="postal-code"
            mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            touched={touched.postCode}
            error={errors.postCode}
          />
          <TextField
            label={NIP_FIELD}
            name="nip"
            type="tel"
            touched={touched.nip}
            error={errors.nip}
          />
        </Container>
        <StyledButton type="submit" isLoading={isLoading}>{UPDATE_DATA}</StyledButton>
      </StyledForm>
    )}
  />
);
