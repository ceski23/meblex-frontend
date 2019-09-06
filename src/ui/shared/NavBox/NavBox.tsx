import React, { FC, ReactElement } from 'react';
import { styled } from 'theme';
import { NavLocItem, NavItem } from './NavItem';

const Container = styled.div`
  position: relative;
`;

interface Props {
  items: NavLocItem[];
  className?: string;
}

export const NavBox: FC<Props> = ({ items, className }): ReactElement => (
  <Container className={className}>
    {items.map((item, i) => <NavItem data={item} key={i} />)}
  </Container>
);
