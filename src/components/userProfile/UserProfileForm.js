import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import FieldX from '../shared/FieldX';

import S from './UserProfile.module.scss';

const postCodeMask = createTextMask({
  pattern: '99-999',
  guide: false,
});

const UserProfileForm = () => (
  <form className={S.userForm}>
    <div className={S.field}>
      <h4 className={S.label}>Imię i nazwisko:</h4>
      <Field name="name" component={FieldX} type="text" placeholder="Imię i nazwisko" autoComplete="name" className={S.input} />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Adres:</h4>
      <Field name="address" component={FieldX} type="text" placeholder="Adres" autoComplete="street-address" className={S.input} />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Kod pocztowy:</h4>
      <Field name="postCode" component={FieldX} type="tel" placeholder="Kod pocztowy" autoComplete="postal-code" className={S.input} {...postCodeMask} />
    </div>

    {/* <Field name="password" component={FieldX} type="password" required placeholder="Hasło" autoComplete="new-password" className={S.field} /> */}


    {/* <Field name="name" component={FieldX} type="text" placeholder="Imię i nazwisko" autoComplete="name" className={S.field} />
      <Field name="address" component={FieldX} type="text" placeholder="Adres" autoComplete="street-address" className={S.field} />
      <Field name="state" component={FieldX} type="text" placeholder="Województwo" autoComplete="address-level1" className={S.field} />
      <Field name="city" component={FieldX} type="text" placeholder="Miasto" autoComplete="address-level2" className={S.field} />

      <Field name="nip" component={FieldX} type="number" placeholder="NIP" className={S.field} /> */}
  </form>
);

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
})(UserProfileForm);
