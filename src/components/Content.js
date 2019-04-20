import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import cx from 'classnames';

import S from '../styles/Content.module.scss';
import '../styles/main.scss';

import Toolbar from './Toolbar';
import Navigation from './Navigation';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import Test from './Test';
import Product from '../pages/Product';

// import * as API from '../api'


const Content = () => {
  const [navOpened, setNavOpened] = useState(false);
  const toggleNav = () => setNavOpened(!navOpened);

  useEffect(() => {
    // const listing = API.getListing();
    // context.setListing(listing);
  }, []);

  return (
    <React.Fragment>
      <Toolbar navOpened={navOpened} toggleNav={toggleNav} />
      <Navigation navOpened={navOpened} toggleNav={toggleNav} />
      <div role="button" tabIndex={0} className={cx(S.shadow, { [S.enabled]: navOpened })} onClick={toggleNav} />

      <div className={cx(S.content, { [S.opened]: navOpened })}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/produkty/:product" component={Product} />
          <Route path="/katalog/:category" component={Test} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Content;
