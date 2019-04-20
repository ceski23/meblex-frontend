import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import S from '../styles/UserInfo.module.scss';
import { Icons } from '../assets';


const UserInfo = ({ toggleNav, user }) => (
  <Link to="/profil" className={S.link} onClick={toggleNav}>
    <Icons.User className={S.photo} />
    <p className={S.text}>{user.name}</p>
  </Link>
);

export default connect(state => ({
  user: state.auth.user,
}))(UserInfo);
