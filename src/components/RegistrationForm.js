import React from 'react';
import cx from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import Button from './Button';
import FieldX from './FieldX';

import S from '../styles/Registration.module.scss';

const postCodeMask = createTextMask({
  pattern: '99-999',
  guide: false,
});


const RegistrationForm = ({ handleSubmit, error }) => (
  <form className={cx(S.registrationForm, 'card')} onSubmit={handleSubmit}>
    <h4 className="title">Formularz rejestracji</h4>
    {error && <p className={S.error}>{error}</p>}

    <Field name="email" component={FieldX} type="email" required placeholder="Adres email" autoComplete="email" className={S.field} />
    <Field name="password" component={FieldX} type="password" required placeholder="Hasło" autoComplete="new-password" className={S.field} />

    <Field name="name" component={FieldX} type="text" placeholder="Imię i nazwisko" autoComplete="name" className={S.field} />
    <Field name="address" component={FieldX} type="text" placeholder="Adres" autoComplete="street-address" className={S.field} />
    <Field name="state" component={FieldX} type="text" placeholder="Województwo" autoComplete="address-level1" className={S.field} />
    <Field name="city" component={FieldX} type="text" placeholder="Miasto" autoComplete="address-level2" className={S.field} />
    <Field name="postCode" component={FieldX} type="tel" placeholder="Kod pocztowy" autoComplete="postal-code" className={S.field} {...postCodeMask} />
    <Field name="nip" component={FieldX} type="number" placeholder="NIP" className={S.field} />

    <div className={S.actions}>
      <Button className={S.register} elem="input">Zarejestruj</Button>
    </div>
  </form>
);

export default reduxForm({
  form: 'registration',
})(RegistrationForm);
