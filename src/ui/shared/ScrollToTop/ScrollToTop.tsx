import React, { useEffect, FC, ReactElement } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const RawScrollToTop: FC<RouteComponentProps> = ({
  children, location: { pathname },
}): ReactElement => {
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <>{children}</>;
};

export const ScrollToTop = withRouter(RawScrollToTop);
