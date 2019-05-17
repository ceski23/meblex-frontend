import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, email } from '../../validationRules';

import S from './UserProfile.module.scss';

const EmailChangeForm = ({ handleSubmit, error }) => (
  <form className={S.emailForm} onSubmit={handleSubmit}>
    {error && <p className={S.error}>{error}</p>}

    <div className={S.field}>
      <h4 className={S.label}>Adres email:</h4>
      <Field
        name="newemail"
        component={FieldX}
        type="email"
        autoComplete="email"
        className={S.input}
        validate={[required, email]}
      />
    </div>

    <Button className={S.updateProfile}>Zmień adres email</Button>
  </form>
);

export default reduxForm({
  form: 'userEmail',
  enableReinitialize: true,
})(EmailChangeForm);
