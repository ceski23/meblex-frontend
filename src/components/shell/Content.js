/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../shared/main.scss';
import { Roles } from '../../redux/auth';
import Toolbar from './Toolbar';
import Navigation from './Navigation';
import NotFound from '../shared/NotFound';
import Catalog from '../catalog/Catalog';
import Product from '../productScreen/Product';
import UserProfile from '../userProfile/UserProfile';
import ProtectedRoute from './ProtectedRoute';

// import * as API from '../api'


const Content = () => {
  useEffect(() => {
    // const listing = API.getListing();
    // context.setListing(listing);
  }, []);

  const style = {
    content: css`
      min-height: calc(100vh - 70px);
      display: flex;
      flex-direction: column;
      transition: transform .3s ease-in-out; 
      padding-bottom: 70px;
    `,
  };

  return (
    <React.Fragment>
      <Toolbar />
      <Navigation />

      <div css={style.content}>
        <Switch>
          <Route path="/katalog/produkty/:product" component={Product} />
          <Route path="/katalog" component={Catalog} />
          <ProtectedRoute path="/profil" roles={[Roles.USER]} component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Content;
