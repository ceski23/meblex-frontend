import React, { FC, ReactElement } from 'react';
import Spinner from 'react-spinner-material';
import styled from 'styled-components/macro';

import { theme as appTheme } from 'theme';
import { LOADING } from 'constants/App';

const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 2;
`;

const Text = styled.h3`
  margin-left: 30px;
  font-size: 1.5em;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 0;
`;

interface Props {
  isLoading: boolean;
  text?: string;
}

export const Loading: FC<Props> = ({
  children, isLoading, text,
}): ReactElement => (
  <>
    {isLoading ? (
      <Container>
        <Spinner
          size={50}
          spinnerColor={appTheme.colors.primary}
          spinnerWidth={4}
          visible
        />
        <Text>{text || LOADING}</Text>
      </Container>
    ) : children}
  </>
);
