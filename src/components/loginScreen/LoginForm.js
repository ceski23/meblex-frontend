import React from 'react';
import cx from 'classnames';
import { Field, reduxForm } from 'redux-form';
import Button from '../shared/Button';
import FieldX from '../shared/FieldX';
import { email, password, required } from '../../validationRules';

import S from './LoginScreen.module.scss';


const LoginForm = ({ handleSubmit, error }) => (
  <form className={cx(S.loginForm, 'card')} onSubmit={handleSubmit}>
    <h4 className="title">Witaj, <strong>zaloguj się</strong> aby korzystać z aplikacji!</h4>
    {error && <p className={S.error}>{error}</p>}

    <Field
      className={S.email}
      name="email"
      component={FieldX}
      type="email"
      placeholder="Adres email"
      autoComplete="email"
      validate={[required, email]}
    />
    <Field
      className={S.password}
      name="password"
      component={FieldX}
      type="password"
      required
      placeholder="Hasło"
      autoComplete="current-password"
      validate={[required, password]}
    />

    <div className={S.actions}>
      <Button className={S.login} elem="input">Zaloguj</Button>
      <Button elem="link" type="secondary" to="/rejestracja">Rejestracja</Button>
    </div>
  </form>
);

export default reduxForm({
  form: 'login',
})(LoginForm);
