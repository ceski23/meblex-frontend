import React, { FC, ReactElement } from 'react';
import { forTabletLandscapeUp } from 'theme';
import styled from 'styled-components/macro';
import { NavBox } from 'ui/shared/NavBox';
import { Route } from 'react-router-dom';
import { PageNotFound } from 'ui/PageNotFound';
import {
 PROFILE, PROFILE_ORDERS, PROFILE_REQUESTS, PROFILE_ORDER,
} from 'constants/routing';
import { YOUR_ORDERS, YOUR_DATA, YOUR_REQUESTS } from 'constants/Profile';
import { AnimatedSwitch } from 'ui/shared/AnimatedSwitch';
import { FadeAnimation } from 'ui/shared/FadeAnimation';
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
    <Route render={({ location }) => (
      <AnimatedSwitch location={location} posedAnimation={FadeAnimation}>
        <Route path={PROFILE_ORDER} component={SingleOrder} />
        <Route path={PROFILE_ORDERS} component={OrdersPage} />
        <Route path={PROFILE_REQUESTS} component={PageNotFound} />
        <Route component={UserData} />
      </AnimatedSwitch>
    )}
    />
  </Container>
);
