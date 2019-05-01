import React from 'react';
import cx from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import Button from '../shared/Button';
import FieldX from '../shared/FieldX';
import { email, password, required, maxLength32, postCode, nip } from '../../validationRules';

import S from './Registration.module.scss';

const postCodeMask = createTextMask({
  pattern: '99-999',
  guide: false,
});

const nipMask = createTextMask({
  pattern: '999999999',
  guide: false,
});


const RegistrationForm = ({ handleSubmit, error }) => (
  <form className={cx(S.registrationForm, 'card')} onSubmit={handleSubmit}>
    <h4 className="title">Formularz rejestracji</h4>
    {error && <p className={S.error}>{error}</p>}

    <Field
      name="email"
      component={FieldX}
      type="email"
      placeholder="Adres email"
      autoComplete="email"
      className={S.field}
      validate={[required, email]}
    />
    <Field
      name="password"
      component={FieldX}
      type="password"
      placeholder="Hasło"
      autoComplete="new-password"
      className={S.field}
      validate={[required, password]}
    />
    <Field
      name="name"
      component={FieldX}
      type="text"
      placeholder="Imię i nazwisko"
      autoComplete="name"
      className={S.field}
      validate={[required, maxLength32]}
    />
    <Field
      name="address"
      component={FieldX}
      type="text"
      placeholder="Adres"
      autoComplete="street-address"
      className={S.field}
      validate={[required, maxLength32]}
    />
    <Field
      name="state"
      component={FieldX}
      type="text"
      placeholder="Województwo"
      autoComplete="address-level1"
      className={S.field}
      validate={[required, maxLength32]}
    />
    <Field
      name="city"
      component={FieldX}
      type="text"
      placeholder="Miasto"
      autoComplete="address-level2"
      className={S.field}
      validate={[required, maxLength32]}
    />
    <Field
      name="postCode"
      component={FieldX}
      type="tel"
      placeholder="Kod pocztowy"
      autoComplete="postal-code"
      className={S.field}
      {...postCodeMask}
      validate={[required, postCode]}
    />
    <Field
      name="nip"
      component={FieldX}
      type="tel"
      placeholder="NIP"
      className={S.field}
      {...nipMask}
      validate={[nip]}
    />

    <div className={S.actions}>
      <Button className={S.register} elem="input">Zarejestruj</Button>
    </div>
  </form>
);

export default reduxForm({
  form: 'registration',
})(RegistrationForm);
