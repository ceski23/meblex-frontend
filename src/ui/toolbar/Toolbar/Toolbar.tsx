import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { styled, forTabletLandscapeUp } from 'theme';
import { useScroll } from 'hooks';
import { AppState } from 'store/types';
import { LOGOUT, HOME } from 'constants/routing';
import { ReactComponent as LogoutIcon } from 'assets/logout.svg';
import { ReactComponent as MeblexLogo } from 'assets/meblex_logo.svg';
import { UserInfo } from '../UserInfo';

const IconLink = styled(Link)`
  height: 50px;
  margin: 5px;
  padding: 10px;
  position: relative;
  order: 2;
`;

const Icon = styled(LogoutIcon)`
  height: 25px;
  fill: ${({ theme }) => theme.colors.textDark};
`;

const Filler = styled.span`
  flex: 1;
  order: 1;
  ${forTabletLandscapeUp()} {
    order: 0;
  }
`;

const Wrapper: FC<{
  scroll: number;
  className?: string;
}> = ({ children, className }): ReactElement => (
  <div className={className}>{children}</div>
);

const Container = styled(Wrapper)`
  background: white;
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

  return (
    <Container scroll={scroll}>
      <Link to={HOME}><Logo /></Link>
      <Filler />
      <UserInfo user={data.user} />
      {data.user && (
        <IconLink to={LOGOUT}><Icon /></IconLink>
      )}
    </Container>
  );
};
