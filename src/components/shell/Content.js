import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import cx from 'classnames';

import S from './Content.module.scss';
import '../shared/main.scss';
import { Roles } from '../../redux/auth';

import Toolbar from './Toolbar';
import Navigation from './Navigation';
import NotFound from '../shared/NotFound';
import Main from '../mainScreen/Main';
import Test from '../mainScreen/Test';
import Product from '../productScreen/Product';
import UserProfile from '../userProfile/UserProfile';
import ProtectedRoute from './ProtectedRoute';

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
          <Route path="/katalog" exact component={Main} />
          <Route path="/katalog/produkty/:product" component={Product} />
          <Route path="/katalog/" component={Test} />
          <ProtectedRoute path="/profil" roles={[Roles.USER]} component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Content;
