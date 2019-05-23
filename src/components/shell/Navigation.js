/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { useTheme } from '../../helpers';
import { Furniture, Icons } from '../../assets';
import NavItem from './NavItem';
import { Roles } from '../../redux/auth';


const Navigation = () => {
  const theme = useTheme();
  const user = useSelector(state => state.auth.user);

  const isUserAuthorized = (roles) => {
    return !roles || user; // TODO: Remove this
    return !roles || user && user.role && roles.some(elem => elem === user.role);
  };

  const mainItems = [
    { text: 'Pulpit', icon: Icons.Home, url: '/' },
    { text: 'Katalog', icon: Icons.ShoppingBag, url: '/katalog' },
    { text: 'FITTER™', icon: Icons.JigSaw, url: '/fitter' },
    { text: 'DIY', icon: Icons.Tools, url: '/diy' },
    { text: 'Panel', icon: Icons.Settings, url: '/panel', roles: [Roles.EMPLOYEE] },
  ];

  const categories = [
    {
      text: 'Krzesła', url: '/katalog/krzesla', icon: Furniture.DiningChair, type: 'dense',
    },
    {
      text: 'Sofy', url: '/katalog/sofy', icon: Furniture.Sofa, type: 'dense',
    },
    {
      text: 'Lampy', url: '/katalog/lampy', icon: Furniture.Lamp, type: 'dense',
    },
    {
      text: 'Szafki', url: '/katalog/szafki', icon: Furniture.Cabinet1, type: 'dense',
    },
    {
      text: 'Dywany', url: '/katalog/dywany', icon: Furniture.Carpet, type: 'dense',
    },
    {
      text: 'Komody', url: '/katalog/komody', icon: Furniture.ChestOfDrawers, type: 'dense',
    },
    {
      text: 'Wieszaki', url: '/katalog/wieszaki', icon: Furniture.CoatStand, type: 'dense',
    },
    {
      text: 'Stoliki do kawy', url: '/katalog/stoliki-do-kawy', icon: Furniture.CoffeeTable, type: 'dense',
    },
    {
      text: 'Biurka', url: '/katalog/biurka', icon: Furniture.Desk, type: 'dense',
    },
    {
      text: 'Stoły', url: '/katalog/stoly', icon: Furniture.Table, type: 'dense',
    },
    {
      text: 'Lustra', url: '/katalog/lustra', icon: Furniture.Mirror, type: 'dense',
    },
    {
      text: 'Materace', url: '/katalog/materace', icon: Furniture.Mattress, type: 'dense',
    },
    {
      text: 'Łóżka', url: '/katalog/lozka', icon: Furniture.DoubleBed, type: 'dense',
    },
  ];

  const style = {
    navigation: css`
      display: flex;
      flex-direction: row;
      background: #fff;
      box-shadow: 0px 1px 20px ${theme.colors.shadowDark};
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 70px;
      z-index: 2;
    `,
  };

  return (
    <div css={style.navigation}>
      {mainItems.map((item, i) => (
        isUserAuthorized(item.roles) ? (
          <NavItem key={i} text={item.text} icon={item.icon} to={item.url} />
        ) : null
      ))}
    </div>
  );
};

export default Navigation;
