import React, { FC, ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { styled } from 'theme';

// import ProtectedRoute from './ProtectedRoute';

const Container = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  transition: transform .3s ease-in-out; 
  padding-bottom: 70px;
  overflow: hidden;
`;

export const Content: FC = (): ReactElement => (
  <>
    {/* <Toolbar /> */}
    {/* <Navigation /> */}

    <Container>
      <Switch>
        {/* <Route path="/katalog/produkty/:product" component={Product} /> */}
        {/* <Route path="/katalog" component={Catalog} /> */}
        {/* <ProtectedRoute path="/koszyk" roles={[Roles.USER, Roles.EMPLOYEE]} component={Cart} /> */}
        {/* <ProtectedRoute path="/zamowienie/dostawa" roles={[Roles.USER, Roles.EMPLOYEE]} component={Order} /> */}
        {/* <ProtectedRoute path="/zamowienie/platnosc" roles={[Roles.USER, Roles.EMPLOYEE]} component={FakePayment} /> */}
        {/* <ProtectedRoute path="/profil" roles={[Roles.USER, Roles.EMPLOYEE]} component={UserProfile} /> */}
        {/* <ProtectedRoute path="/niestandardowy" component={CustomSizeRequestPage} roles={[Roles.USER, Roles.EMPLOYEE]} /> */}
        {/* <ProtectedRoute path="/panel" component={WorkerPanel} roles={[Roles.EMPLOYEE]} /> */}
        {/* <Route path="/fitter" component={Fitter} /> */}
        {/* <Route path="/" exact component={Home} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Container>
  </>
  );
