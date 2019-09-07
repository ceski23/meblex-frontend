import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, navigate } from '@reach/router';

import { useReduxDispatch } from 'hooks';
import { AppState } from 'store/types';
import { logoutUser } from 'store/auth/actions';
import { LOGIN } from 'constants/routing';

export const Logout: FC<RouteComponentProps> = (): null => {
  const dispatch = useReduxDispatch();
  const { data } = useSelector(({ auth }: AppState) => auth);

  useEffect(() => {
    if (data.accessToken) dispatch(logoutUser());
    navigate(LOGIN);
  }, [data.accessToken, dispatch]);

  return null;
};
