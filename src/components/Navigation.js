import React, { Component } from 'react'
import cx from 'classnames'

import S from '../styles/Navigation.module.scss'
import Icons from '../icons'
import NavItem from './NavItem'
import { TestContext } from '../contexts'


export default class Navigation extends Component {
  static contextType = TestContext;
  
  render() {
    return (
      <div className={cx({[S.nav]: true, [S.open]: this.context.navigationOpened})}>
        <div>
          <NavItem text="Katalog produktów" url="/katalog" />
          <NavItem text="FITTER™" icon={Icons.JigSaw} url="/fitter" />
          <NavItem text="DIY" icon={Icons.Tools} url="/diy" />
          <NavItem text="Wyloguj" icon={Icons.Door} url="/wyloguj" />

          <h5 className={S.catText}>Kategorie:</h5>
          <NavItem text="Krzesła" url="/" icon={Icons.DiningChair} type="dense" />
          <NavItem text="Sofy" url="/" icon={Icons.Sofa} type="dense" />
          <NavItem text="Lampy" url="/" icon={Icons.Lamp} type="dense" />
          <NavItem text="Szafki" url="/" icon={Icons.Cabinet1} type="dense" />
          <NavItem text="Dywany" url="/" icon={Icons.Carpet} type="dense" />
          <NavItem text="Komody" url="/" icon={Icons.ChestOfDrawers} type="dense" />
          <NavItem text="Wieszaki" url="/" icon={Icons.CoatStand} type="dense" />
          <NavItem text="Stoliki do kawy" url="/" icon={Icons.CoffeeTable} type="dense" />
          <NavItem text="Biurka" url="/" icon={Icons.Desk} type="dense" />
          <NavItem text="Stoły" url="/" icon={Icons.Table} type="dense" />
          <NavItem text="Lustra" url="/" icon={Icons.Mirror} type="dense" />
          <NavItem text="Materace" url="/" icon={Icons.Mattress} type="dense" />
          <NavItem text="Łóżka" url="/" icon={Icons.DoubleBed} type="dense" />
        </div>
      </div>
    )
  }
}
