import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, password, passwordMatch } from '../../validationRules';

import S from './UserProfile.module.scss';

const PasswordChangeForm = ({ handleSubmit, error }) => (
  <form className={S.passwordForm} onSubmit={handleSubmit}>
    {error && <p className={S.error}>{error}</p>}

    <div className={S.field}>
      <h4 className={S.label}>Aktualne hasło:</h4>
      <Field
        name="oldPassword"
        component={FieldX}
        type="password"
        autoComplete="current-password"
        className={S.input}
        validate={[required, password]}
      />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Nowe hasło:</h4>
      <Field
        name="newPassword"
        component={FieldX}
        type="password"
        autoComplete="new-password"
        className={S.input}
        validate={[required, password]}
      />
    </div>

    <div className={S.field}>
      <h4 className={S.label}>Powtórz hasło:</h4>
      <Field
        name="repeatPassword"
        component={FieldX}
        type="password"
        autoComplete="new-password"
        className={S.input}
        validate={[required, passwordMatch]}
      />
    </div>

    <Button className={S.updateProfile} elem="input">Zmień hasło</Button>
  </form>
);

export default reduxForm({
  form: 'userPassword',
})(PasswordChangeForm);
