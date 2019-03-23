import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import S from '../styles/Toolbar.module.scss'
import { TestContext } from '../contexts'
import { ReactComponent as Hamburger } from '../assets/hamburger.svg'
import { ReactComponent as Logo } from '../assets/meblex_logo.svg'
import { ReactComponent as ShoppingCart } from '../assets/shopping_cart.svg'

export default class Toolbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  static contextType = TestContext;
  
  render() {
    return (
      <div className={S.toolbar}>
        <Hamburger className={cx({[S.hamburger]: true, [S.open]: this.context.navigationOpened})} onClick={this.context.toggleNavigation} />

        <Link to="/" className={S.cart}>
          <Logo className={S.logo} />
        </Link>

        <Link to="/cart" className={S.cart} onClick={this.context.incrementCart}>
          <div>
            <ShoppingCart className={S.icon} />
            <span className={S.count}>{this.context.cartCount}</span>
          </div>
        </Link>
      </div>
    )
  }
}
