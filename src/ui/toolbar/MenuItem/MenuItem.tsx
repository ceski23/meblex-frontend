import React, { FC, ReactElement } from 'react';
import { styled } from 'theme';
import { Link } from '@reach/router';

const Text = styled.h4`
  transition: all .3s;
`;

const Container = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;

  &:hover > ${Text} {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface Props {
  text: string | ReactElement;
  to: string;
}

export const MenuItem: FC<Props> = ({
  text, to,
}): ReactElement => (
  <Container to={to}>
    <Text>{text}</Text>
  </Container>
);
