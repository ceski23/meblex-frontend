import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import S from './Toolbar.module.scss';
import { Icons } from '../../assets';
import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';


const Toolbar = ({ navOpened, toggleNav }) => {
  const cart = useSelector(state => state.cart);
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    setCartSize(cart.items.reduce((a, b) => a + b.amount, 0));
  }, [cart]);

  return (
    <div className={S.toolbar}>
      <Icons.Hamburger className={cx(S.hamburger, { [S.open]: navOpened })} onClick={toggleNav} />

      <Link to="/">
        <Logo className={S.logo} />
      </Link>

      <Link to="/cart" className={cx('ripple', S.cart)}>
        <div>
          <Icons.ShoppingCart className={S.icon} />
          {cartSize > 0 && <span className={S.count}>{cartSize}</span>}
        </div>
      </Link>
    </div>
  );
};

export default Toolbar;
