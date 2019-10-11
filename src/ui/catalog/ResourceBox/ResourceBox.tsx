import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/macro';
import { transparentize } from 'polished';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 20px 0;
  width: 150px;
  height: 100px;
  box-shadow: 6px 8px 30px 0px ${({ theme }) => transparentize(0.8, theme.colors.black)};
  background-size: cover;
`;

const Name = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 2px 0px ${({ theme }) => transparentize(0.8, theme.colors.black)};
`;

interface Props {
  name: string;
  photo?: string;
  color?: string;
}

export const ResourceBox: FC<Props> = ({ name, photo, color }): ReactElement => (
  <Container style={{
    backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}${photo})`,
    backgroundColor: color,
  }}
  >
    <Name>{name}</Name>
  </Container>
);
