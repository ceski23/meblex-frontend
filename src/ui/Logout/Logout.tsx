import React, { useEffect, FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useReduxDispatch } from 'hooks';
import { AppState } from 'store/types';
import { logoutUser } from 'store/auth/actions';

export const Logout: FC = (): ReactElement | null => {
  const dispatch = useReduxDispatch();
  const { data } = useSelector(({ user }: AppState) => user);

  useEffect(() => {
    if (data.user) dispatch(logoutUser());
  }, [data.user, dispatch]);

  return (data.user ? null : <Redirect to="/logowanie" />);
};
