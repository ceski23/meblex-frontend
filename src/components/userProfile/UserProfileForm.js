import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32, postCode, nip } from '../../validationRules';

import S from './UserProfile.module.scss';

const postCodeMask = createTextMask({
  pattern: '99-999',
  guide: false,
});

const nipMask = createTextMask({
  pattern: '9999999999',
  guide: false,
});

const UserProfileForm = ({ handleSubmit, error }) => (
  <form className={S.userForm} onSubmit={handleSubmit}>
    {error && <p className={S.error}>{error}</p>}

    <div className={S.field}>
      <h4 className={S.label}>Imię i nazwisko:</h4>
      <Field
        name="name"
        component={FieldX}
        type="text"
        autoComplete="name"
        className={S.input}
        validate={[required, maxLength32]}
      />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Adres:</h4>
      <Field
        name="address"
        component={FieldX}
        type="text"
        autoComplete="street-address"
        className={S.input}
        validate={[required, maxLength32]}
      />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Kod pocztowy:</h4>
      <Field
        name="postCode"
        component={FieldX}
        type="tel"
        autoComplete="postal-code"
        className={S.input}
        validate={[required, postCode]}
        {...postCodeMask}
      />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Województwo:</h4>
      <Field
        name="state"
        component={FieldX}
        type="text"
        autoComplete="address-level1"
        className={S.input}
        validate={[required, maxLength32]}
      />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Miasto:</h4>
      <Field
        name="city"
        component={FieldX}
        type="text"
        autoComplete="address-level2"
        className={S.input}
        validate={[required, maxLength32]}
      />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>NIP:</h4>
      <Field
        name="nip"
        component={FieldX}
        type="tel"
        className={S.input}
        validate={[nip]}
        {...nipMask}
      />
    </div>

    <Button className={S.updateProfile} elem="input">Aktualizuj dane</Button>
  </form>
);

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
})(UserProfileForm);
