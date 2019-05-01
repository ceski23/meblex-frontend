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

const UserProfileForm = ({ handleSubmit, error }) => (
  <form className={S.userForm} onSubmit={handleSubmit}>
    {/* {error && <p className={S.error}>{error}</p>} */}

    <div className={S.field}>
      <h4 className={S.label}>Imię i nazwisko:</h4>
      <Field
        name="name"
        component={FieldX}
        type="text"
        placeholder="Imię i nazwisko"
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
        placeholder="Adres"
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
        placeholder="Kod pocztowy"
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
        placeholder="Województwo"
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
        placeholder="Miasto"
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
        type="number"
        placeholder="NIP"
        className={S.input}
        validate={[required, nip]}
      />
    </div>

    <Button className={S.updateProfile} elem="input">Zapisz zmiany</Button>
  </form>
);

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
})(UserProfileForm);
