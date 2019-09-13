import React, { FC, ReactElement } from 'react';
import { styled } from 'theme';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Merriweather Sans', 'Noto Sans', sans-serif;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2em;
  transition: all .3s;
  margin: 20px;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export interface NavLocItem {
  to: string;
  label: string;
  exact?: boolean;
}

interface Props {
  data: NavLocItem;
}

export const NavItem: FC<Props> = ({ data: { label, to, exact } }): ReactElement => (
  <StyledNavLink to={to} exact={exact}>{label}</StyledNavLink>
);
