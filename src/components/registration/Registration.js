import React, { useState } from 'react';
import { SubmissionError } from 'redux-form';
import { useActions } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/meblex_logo.svg';
import S from './Registration.module.scss';
import { Furniture } from '../../assets';
import * as API from '../../api';
import RegistrationForm from './RegistrationForm';
import Loading from '../shared/Loading';
import { setLoginStatus as loginStatusAction } from '../../redux/auth';

const Registration = ({ history }) => {
  const setLoginStatus = useActions(status => loginStatusAction(status));
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      await API.register(values);
      setLoginStatus(true);
      history.replace('/');
    } catch (err) {
      setIsLoading(false);

      Object.keys(err.errors).forEach((key) => {
        err.errors[key.toLowerCase()] = String(err.errors[key]);
        delete err.errors[key];
      });

      throw new SubmissionError({
        _error: err.title,
        ...err.errors,
      });
    }
  };

  return (
    <React.Fragment>
      <Loading isLoading={isLoading} text="Rejestrowanie..." />

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
