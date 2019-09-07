import React, { FC, ReactElement } from 'react';
import { styled } from 'theme';
import { PageNotFound } from 'ui/PageNotFound';
import { Toolbar } from 'ui/toolbar/Toolbar';
import { Profile } from 'ui/profile/Profile';
import { RouteComponentProps, Router } from '@reach/router';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { Loading } from 'ui/shared/Loading';
import { LOADING } from 'constants/App';
import { PROFILE_ALL } from 'constants/routing';

// import ProtectedRoute from './ProtectedRoute';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  min-height: 100vh;
`;

export const Content: FC<RouteComponentProps> = (): ReactElement => {
  const { status } = useSelector(({ auth }: AppState) => auth);

  return (
    <Loading isLoading={status.isLoading} text={LOADING}>
      <Toolbar />
      {/* <Navigation /> */}

      <Container>
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
        <Router primary={false}>
          <Profile path={PROFILE_ALL} />
          <PageNotFound default />
        </Router>
      </Container>
    </Loading>
  );
};
