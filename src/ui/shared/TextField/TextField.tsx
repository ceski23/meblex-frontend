import React, { FC, ReactElement } from 'react';
import { Field as FormikField } from 'formik';

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

const Field = styled(FormikField)`
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  border: 1px solid rgb(229, 232, 237);
  padding: 10px 15px;
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 5px;
  -webkit-user-select: text;
  width: 100%;
`;

const Error = styled.span`
  color: red;
  font-size: 0.7em;
  padding-top: 10px;
`;

interface Props {
  name: string;
  type: string;
  label?: string;
  autoComplete?: string;
  error?: string;
  touched?: boolean;
}

export const TextField: FC<Props> = ({
  label, error, touched, ...props
}): ReactElement => (
  <Container>
    {label && <Label>{label}</Label>}
    <Field {...props} />
    {touched && error && <Error>{error}</Error>}
  </Container>
);
