import React, { FC, ReactElement } from 'react';
import { Field as FormikField, FieldProps } from 'formik';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

import { styled } from 'theme';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  flex-direction: column;
`;

const Label = styled.h4`
  margin: 0;
  margin-right: 20px;
  font-size: .9em;
  height: 42px;
  line-height: 42px;
`;

const Field = styled(MaskedInput)`
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px 15px;
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 5px;
  user-select: text;
  width: 100%;
`;

const Error = styled.span`
  color: red;
  font-size: 0.7em;
  padding-top: 10px;
`;

interface Props {
  label?: string;
  error?: string;
  touched?: boolean;
}

export const TextField: FC<MaskedInputProps & Props> = ({ // InputHTMLAttributes<HTMLInputElement>
  name, label, error, touched, mask = false, ...props
}): ReactElement => (
  <Container>
    {label && <Label>{label}</Label>}
    <FormikField
      name={name}
      render={({ field }: FieldProps) => (
        <Field mask={mask} {...field} {...props} />
      )}
    />
    {touched && error && <Error>{error}</Error>}
  </Container>
);
