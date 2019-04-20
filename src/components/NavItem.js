import React from 'react'
import {  NavLink } from 'react-router-dom'
import cx from 'classnames'

import S from '../styles/NavItem.module.scss'


const NavItem = ({ text, url, type, icon, replace, toggleNav }) => {
  const Icon = icon;

  return (
    <NavLink to={url} activeClassName={S.active} exact replace={replace} className={cx(S.link, {[S.dense]: type === 'dense'})} onClick={toggleNav}>
      {Icon && <Icon className={S.icon} />}
      <p className={S.text}>{text}</p>
    </NavLink>
  )
}

export default NavItem;