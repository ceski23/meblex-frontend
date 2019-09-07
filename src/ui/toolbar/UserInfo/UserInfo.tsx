import React, { FC, ReactElement } from 'react';

import { ReactComponent as UserIcon } from 'assets/user.svg';
import { styled } from 'theme';
import { LOGIN, PROFILE } from 'constants/routing';
import { User } from 'store/user/types';
import { LOG_IN } from 'constants/Toolbar';
import { roleName } from 'store/auth/consts';
import { Link, RouteComponentProps } from '@reach/router';

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 15px;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  transition: .3s;
`;

const Icon = styled(UserIcon)`
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-right: 25px;
  transition: .3s;
  border-radius: 30px;
  fill: ${({ theme }) => theme.colors.primaryDark};
`;

const Name = styled.h5`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 1em;
`;

const Role = styled.p`
  margin: 0;
  font-size: .8em;
`;

interface Props {
  user?: User;
}

export const UserInfo: FC<RouteComponentProps<{}> & Props> = ({
  user, location,
}): ReactElement => (
  <StyledLink to={user ? PROFILE : LOGIN} state={user ? { from: location } : undefined}>
    <Icon />
    <div>
      <Name>{user ? user.name : LOG_IN}</Name>
      {user && <Role>{roleName(user.role)}</Role>}
    </div>
  </StyledLink>
);
