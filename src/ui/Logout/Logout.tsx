import React, { useEffect, FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useReduxDispatch } from 'hooks';
import { AppState } from 'store/types';
import { logoutUser } from 'store/auth/actions';

export const Logout: FC = (): ReactElement | null => {
  const dispatch = useReduxDispatch();
  const { data } = useSelector(({ auth }: AppState) => auth);

  useEffect(() => {
    if (data.accessToken) dispatch(logoutUser());
  }, [data.accessToken, dispatch]);

  return (data.accessToken ? null : <Redirect to="/logowanie" />);
};
