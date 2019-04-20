import React from 'react'
import cx from 'classnames'

import S from '../styles/Navigation.module.scss'
import { Furniture, Icons } from '../assets'
import NavItem from './NavItem'
import UserInfo from './UserInfo'


const Navigation = ({ navOpened, toggleNav }) => {
  const mainItems = [
    {text: "Katalog produktów", icon: Icons.ShoppingBag, url: "/katalog" },
    {text: "FITTER™", icon: Icons.JigSaw, url: "/fitter" },
    {text: "DIY", icon: Icons.Tools, url: "/diy" },
  ];

  const categories = [
    {text: "Krzesła", url: "/katalog/krzesla", icon: Furniture.DiningChair, type: "dense"},
    {text: "Sofy", url: "/katalog/sofy", icon: Furniture.Sofa, type: "dense"},
    {text: "Lampy", url: "/katalog/lampy", icon: Furniture.Lamp, type: "dense"},
    {text: "Szafki", url: "/katalog/szafki", icon: Furniture.Cabinet1, type: "dense"},
    {text: "Dywany", url: "/katalog/dywany", icon: Furniture.Carpet, type: "dense"},
    {text: "Komody", url: "/katalog/komody", icon: Furniture.ChestOfDrawers, type: "dense"},
    {text: "Wieszaki", url: "/katalog/wieszaki", icon: Furniture.CoatStand, type: "dense"},
    {text: "Stoliki do kawy", url: "/katalog/stoliki-do-kawy", icon: Furniture.CoffeeTable, type: "dense"},
    {text: "Biurka", url: "/katalog/biurka", icon: Furniture.Desk, type: "dense"},
    {text: "Stoły", url: "/katalog/stoly", icon: Furniture.Table, type: "dense"},
    {text: "Lustra", url: "/katalog/lustra", icon: Furniture.Mirror, type: "dense"},
    {text: "Materace", url: "/katalog/materace", icon: Furniture.Mattress, type: "dense"},
    {text: "Łóżka", url: "/katalog/lozka", icon: Furniture.DoubleBed, type: "dense"}
  ];

  return (
    <div className={cx(S.nav, {[S.open]: navOpened})}>
      <UserInfo toggleNav={toggleNav} />

      {mainItems.map((item, i) =>
        <NavItem key={i} toggleNav={toggleNav} text={item.text} icon={item.icon} url={item.url} replace={item.replace} />
      )}

      <h5 className={S.catText}>Kategorie:</h5>
      {categories.map((item, i) =>
        <NavItem key={i} toggleNav={toggleNav} text={item.text} icon={item.icon} url={item.url} type={item.type} />
      )}

      <span className={S.line}></span>
      <NavItem toggleNav={toggleNav} text='Wyloguj' type='dense' icon={Icons.Door} url='/wyloguj' replace={true} />
    </div>
  )
}

export default Navigation;