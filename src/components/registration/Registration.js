import React, { useState, useCallback } from 'react';
import { SubmissionError } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';
import S from './Registration.module.scss';
import { Furniture } from '../../assets';
import * as API from '../../api';
import RegistrationForm from './RegistrationForm';
import Loading from '../shared/Loading';
import { setUserData as setUserDataAction } from '../../redux/auth';

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const setUserData = useCallback(data => dispatch(setUserDataAction(data)), [dispatch]);
  const user = useSelector(state => state.auth.user);

  const handleRegister = async (values) => {
    setIsLoading(true);

    try {
      await API.register(values);
      const userData = await API.getUserData();
      setUserData(userData);
    } catch (err) {
      setIsLoading(false);

      throw new SubmissionError({
        _error: err.title,
        ...err.errors,
      });
    }
  };

  return (
    <React.Fragment>
      <Loading isLoading={isLoading} text="Rejestrowanie..." />
      {user && <Redirect to="/" />}

      <section className={S.registration}>
        <div className={S.icons}>
          {Object.keys(Furniture).map((key, i) => {
            const Icon = Furniture[key];
            return <Icon key={i} className={S.icon} />;
          })}
        </div>

        <Logo className={S.logo} />
        <RegistrationForm onSubmit={handleRegister} />
      </section>
    </React.Fragment>
  );
};

export default Registration;
