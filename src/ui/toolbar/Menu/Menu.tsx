import React, { FC, ReactElement } from 'react';
import styled from 'styled-components/macro';
import { CATALOG, FITTER } from 'constants/routing';
import { MenuItem } from '../MenuItem';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Menu: FC = (): ReactElement => (
  <Container>
    <MenuItem to={CATALOG} text="Katalog" />
    <MenuItem to={FITTER} text="FITTER™" />
  </Container>
  );
