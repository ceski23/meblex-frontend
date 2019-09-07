import React, { FC, ReactElement } from 'react';
import { styled } from 'theme';
import { Link, Match } from '@reach/router';

const StyledNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Merriweather Sans', 'Noto Sans', sans-serif;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2em;
  transition: all .3s;
  margin: 20px;
  border-bottom: 3px solid transparent;
  padding-bottom: 15px;
`;

const StyledActiveNavLink = styled(StyledNavLink)`
  color: ${({ theme }) => theme.colors.textDark};
  border-color: ${({ theme }) => theme.colors.primary};
`;

export interface NavLocItem {
  to: string;
  label: string;
}

interface Props {
  data: NavLocItem;
}

export const NavItem: FC<Props> = ({ data: { label, to } }): ReactElement => (
  <Match path={to}>
    {({ match }) => (
      match
      ? <StyledActiveNavLink to={to}>{label}</StyledActiveNavLink>
      : <StyledNavLink to={to}>{label}</StyledNavLink>
    )}
  </Match>
);
