import React, { FC, ReactElement } from 'react';
import { styled, forTabletLandscapeUp } from 'theme';
import { NavBox } from 'ui/shared/NavBox';
import { PageNotFound } from 'ui/PageNotFound';
import {
 PROFILE, PROFILE_ORDERS, PROFILE_REQUESTS,
} from 'constants/routing';
import { YOUR_ORDERS, YOUR_DATA, YOUR_REQUESTS } from 'constants/Profile';
import { RouteComponentProps, Router } from '@reach/router';
import { UserData } from '../UserData';
import { OrdersPage } from '../OrdersPage';

const StyledNavBox = styled(NavBox)`
  margin: 20px 20px 0px;
  flex-direction: column;
  display: flex;
  ${forTabletLandscapeUp()} {
    flex-direction: row;
  }
`;

export const Profile: FC<RouteComponentProps> = (): ReactElement => (
  <div>
    <StyledNavBox items={[
      { to: PROFILE, label: YOUR_DATA },
      { to: PROFILE_ORDERS, label: YOUR_ORDERS },
      { to: PROFILE_REQUESTS, label: YOUR_REQUESTS },
    ]}
    />
    <Router primary={false}>
      <OrdersPage path={PROFILE_ORDERS} />
      <PageNotFound path={PROFILE_REQUESTS} />
      <UserData default />
    </Router>
  </div>
);
