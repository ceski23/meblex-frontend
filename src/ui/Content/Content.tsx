import React, { FC, ReactElement } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { styled } from 'theme';
import { PageNotFound } from 'ui/PageNotFound';
import { Toolbar } from 'ui/toolbar/Toolbar';
import { Profile } from 'ui/profile/Profile';
import { PROFILE } from 'constants/routing';
import { ProtectedRoute } from 'ui/shared/ProtectedRoute';
import { Roles } from 'store/auth/consts';
import { AnimatedSwitch } from 'ui/shared/AnimatedSwitch';
import { FadeAnimation } from 'ui/shared/FadeAnimation';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
`;

export const Content: FC<RouteComponentProps> = ({ location }): ReactElement => (
  <>
    <Toolbar />
    {/* <Navigation /> */}

    <Container>
      <AnimatedSwitch location={location} posedAnimation={FadeAnimation}>
        {/* <Route path="/katalog/produkty/:product" component={Product} /> */}
        {/* <Route path="/katalog" component={Catalog} /> */}
        {/* <ProtectedRoute path="/koszyk" roles={[Roles.USER, Roles.EMPLOYEE]} component={Cart} /> */}
        {/* <ProtectedRoute path="/zamowienie/dostawa" roles={[Roles.USER, Roles.EMPLOYEE]} component={Order} /> */}
        {/* <ProtectedRoute path="/zamowienie/platnosc" roles={[Roles.USER, Roles.EMPLOYEE]} component={FakePayment} /> */}
        {/* <ProtectedRoute path="/niestandardowy" component={CustomSizeRequestPage} roles={[Roles.USER, Roles.EMPLOYEE]} /> */}
        {/* <ProtectedRoute path="/panel" component={WorkerPanel} roles={[Roles.EMPLOYEE]} /> */}
        {/* <Route path="/fitter" component={Fitter} /> */}
        {/* <Route path="/" exact component={Home} /> */}
        <ProtectedRoute path={PROFILE} component={Profile} roles={[Roles.USER, Roles.EMPLOYEE]} />
        <Route component={PageNotFound} />
      </AnimatedSwitch>
    </Container>
  </>
);
