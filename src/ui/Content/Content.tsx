import React, { FC, ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { styled } from 'theme';
import { PageNotFound } from 'ui/PageNotFound';
import { Toolbar } from 'ui/toolbar/Toolbar';
import { Profile } from 'ui/profile/Profile';
import { PROFILE } from 'constants/routing';
import { ProtectedRoute } from 'ui/shared/ProtectedRoute';
import { Roles } from 'store/auth/consts';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
`;

export const Content: FC = (): ReactElement => (
  <>
    <Toolbar />
    {/* <Navigation /> */}

    <Container>
      <Switch>
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
      </Switch>
    </Container>
  </>
  );
