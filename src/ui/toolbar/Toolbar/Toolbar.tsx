import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { forTabletLandscapeUp } from 'theme';
import styled from 'styled-components/macro';
import { useScroll, useMediaQuery } from 'hooks';
import { AppState } from 'store/types';
import { LOGOUT, HOME } from 'constants/routing';
import { ReactComponent as LogoutIcon } from 'assets/logout.svg';
import { ReactComponent as MeblexLogo } from 'assets/meblex_logo.svg';
import { UserInfo } from '../UserInfo';
import { Menu } from '../Menu';

const IconLink = styled(Link)`
  height: 50px;
  margin: 5px;
  padding: 10px;
  position: relative;
`;

const Icon = styled(LogoutIcon)`
  height: 25px;
  fill: ${({ theme }) => theme.colors.textDark};
`;

const Filler = styled.span`
  flex: 1;
`;

const Wrapper: FC<{
  scroll: number;
  className?: string;
}> = ({ children, className }): ReactElement => (
  <div className={className}>{children}</div>
);

const Container = styled(Wrapper)`
  background: ${({ theme }) => theme.colors.background};
  height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 3;
  position: fixed;
  top: 0;
  padding: 0 20px;
  transition: box-shadow .3s;
  box-shadow: ${props => (props.scroll > 0 ? props.theme.colors.shadowDark : 'transparent')} 0px 1px 20px;
`;

const Logo = styled(MeblexLogo)`
  height: 40px;
  fill: ${({ theme }) => theme.colors.primary};
  display: none;
  ${forTabletLandscapeUp()} {
    display: block;
  }
`;

export const Toolbar: FC = (): ReactElement => {
  const scroll = useScroll();
  const { data } = useSelector(({ user }: AppState) => user);
  const renderMenu = useMediaQuery(forTabletLandscapeUp());

  return (
    <Container scroll={scroll}>
      <Link to={HOME}><Logo /></Link>
      {renderMenu && <Menu />}
      <UserInfo user={data.user} />
      {!renderMenu && <Filler />}
      {data.user && (
        <IconLink to={LOGOUT}><Icon /></IconLink>
      )}
    </Container>
  );
};
