import React, { FC, ReactElement } from 'react';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';

import { ReactComponent as UserIcon } from 'assets/user.svg';
import { styled } from 'theme';
import { LOGIN, PROFILE } from 'constants/routing';
import { User } from 'store/user/types';
import { LOG_IN } from 'constants/Toolbar';
import { roleName } from 'store/auth/consts';

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

const RawUserInfo: FC<RouteComponentProps<{}> & Props> = ({
  user, location,
}): ReactElement => {
  const to = user ? PROFILE : {
    pathname: LOGIN,
    state: { from: location },
  };

  return (
    <StyledLink to={to}>
      <Icon />
      <div>
        <Name>{user ? user.name : LOG_IN}</Name>
        {user && <Role>{roleName(user.role)}</Role>}
      </div>
    </StyledLink>
  );
};

export const UserInfo = withRouter(RawUserInfo);
