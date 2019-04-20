import React, { useState } from 'react';
import { SubmissionError } from 'redux-form'
import { connect } from "react-redux";

import { ReactComponent as Logo } from '../assets/meblex_logo.svg';
import S from '../styles/Registration.module.scss';
import { Furniture } from '../assets'
import * as API from '../api'
import RegistrationForm from '../components/RegistrationForm';
import Loading from '../components/Loading'
import { setLoginStatus } from '../redux/loginStatus';

const Registration = ({ history, setLoginStatus }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      await API.register(values);
      setLoginStatus(true);
      history.replace('/');
    }
    catch (err) {
      setIsLoading(false);

      Object.keys(err.errors).forEach(key => {
        err.errors[key.toLowerCase()] = String(err.errors[key]);
        delete err.errors[key];
      });

      throw new SubmissionError({
        _error: err.title,
        ...err.errors
      });
    }
  }

  return (
    <Loading isLoading={isLoading} text="Rejestrowanie...">
      <section className={S.registration}>
        <div className={S.icons}>
          {Object.keys(Furniture).map((key, i) => {
            const Icon = Furniture[key];
            return <Icon key={i} className={S.icon} />
          })}
        </div>

        <Logo className={S.logo} />
        <RegistrationForm onSubmit={handleRegister} />
      </section>
    </Loading>
  );
}

export default connect(
  state => ({ loggedIn: state.loginStatus.loggedIn }), 
  { setLoginStatus }
)(Registration);