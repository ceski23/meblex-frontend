import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import S from './UserInfo.module.scss';
import { Icons } from '../../assets';


const UserInfo = ({ toggleNav }) => {
  const user = useSelector(state => state.auth.user);

  return (
    <Link to="/profil" className={S.link} onClick={toggleNav}>
      <Icons.User className={S.photo} />
      <p className={S.text}>{user.name}</p>
    </Link>
  );
};

export default UserInfo;
