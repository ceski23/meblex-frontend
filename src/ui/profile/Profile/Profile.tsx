import React, { FC, ReactElement } from 'react';
import { styled, forTabletLandscapeUp } from 'theme';
import { NavBox } from 'ui/shared/NavBox';
import { Switch, Route } from 'react-router-dom';
import { PageNotFound } from 'ui/PageNotFound';
import {
 PROFILE, PROFILE_ORDERS, PROFILE_REQUESTS, PROFILE_ORDER,
} from 'constants/routing';
import { YOUR_ORDERS, YOUR_DATA, YOUR_REQUESTS } from 'constants/Profile';
import { UserData } from '../UserData';
import { OrdersPage } from '../OrdersPage';
import { SingleOrder } from '../SingleOrder';

const StyledNavBox = styled(NavBox)`
  margin: 20px;
  flex-direction: column;
  display: flex;
  ${forTabletLandscapeUp()} {
    flex-direction: row;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Profile: FC = (): ReactElement => (
  <Container>
    <StyledNavBox items={[
      { to: PROFILE, label: YOUR_DATA, exact: true },
      { to: PROFILE_ORDERS, label: YOUR_ORDERS },
      { to: PROFILE_REQUESTS, label: YOUR_REQUESTS },
    ]}
    />
    <Switch>
      <Route path={PROFILE_ORDER} component={SingleOrder} />
      <Route path={PROFILE_ORDERS} component={OrdersPage} />
      <Route path={PROFILE_REQUESTS} component={PageNotFound} />
      <Route component={UserData} />
    </Switch>
  </Container>
);
