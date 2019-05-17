/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../helpers';


import { Icons } from '../../assets';


const UserInfo = ({ toggleNav, location }) => {
  const user = useSelector(state => state.auth.user);
  const theme = useTheme();

  const style = {
    user: css`
      text-decoration: none;
      color: $colorText;
      padding: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: none;
      transition: .3s;
      border-bottom: 1px solid ${theme.colors.shadowDark};

      &:hover {
        background: ${theme.colors.primary_01};
        color: ${theme.colors.primary};
      }
    `,

    icon: css`
      height: 40px;
      width: 40px;
      margin-left: 10px;
      margin-right: 25px;
      transition: .3s;
      border-radius: 30px;
      fill: ${theme.colors.primaryDark};
    `,

    username: css`
      font-weight: bold;
    `,
  };

  return (user ? (
    <Link to="/profil" css={style.user} onClick={toggleNav}>
      <Icons.User css={style.icon} />
      <p css={style.username}>{user.name}</p>
    </Link>
  ) : (
    <Link
      to={{
        pathname: '/logowanie',
        state: { from: location },
      }}
      css={style.user}
      onClick={toggleNav}
    >
      <Icons.User css={style.icon} />
      <p css={style.username}>Zaloguj się</p>
    </Link>
  ));
};

export default withRouter(UserInfo);
