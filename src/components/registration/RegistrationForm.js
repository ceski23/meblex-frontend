/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';
import { useTheme } from '../../helpers';
import Button from '../shared/Button';
import FieldX from '../shared/FieldX';
import { email, password, required, maxLength32, postCode, nip } from '../../validationRules';

const postCodeMask = createTextMask({
  pattern: '99-999',
  guide: false,
});

const nipMask = createTextMask({
  pattern: '9999999999',
  guide: false,
});


const RegistrationForm = ({ handleSubmit, error }) => {
  const theme = useTheme();

  const style = {
    form: css`
      z-index: 1;
      width: 100%;
      border-radius: 0;
      padding: 40px;
      box-shadow: 0 2px 4px ${theme.colors.shadow};
      border: 1px solid rgb(229, 232, 237);
      background: #fff;
      display: flex;
      flex-direction: column;
      text-align: justify;
      margin-bottom: 100px;
    `,

    formError: css`
      color: red;
      font-weight: bold;
      text-align: center;
    `,

    field: css`
      margin: 10px 0;
    `,

    actions: css`
      display: flex;
      justify-content: center;
      margin-top: 20px;
      flex-direction: row;

      & > :first-child {
        margin-left: 0;
      }

      & > :last-child {
        margin-right: 0;
      }
    `,

    button: css`
      /* flex: 1; */
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
    `,
  };

  return (
    <form css={style.form} onSubmit={handleSubmit}>
      <h4 css={style.title}>Formularz rejestracji</h4>
      {error && <p css={style.formError}>{error}</p>}

      <Field
        name="email"
        component={FieldX}
        type="email"
        placeholder="Adres email"
        autoComplete="email"
        css={style.field}
        validate={[required, email]}
      />
      <Field
        name="password"
        component={FieldX}
        type="password"
        placeholder="Hasło"
        autoComplete="new-password"
        css={style.field}
        validate={[required, password]}
      />
      <Field
        name="name"
        component={FieldX}
        type="text"
        placeholder="Imię i nazwisko"
        autoComplete="name"
        css={style.field}
        validate={[required, maxLength32]}
      />
      <Field
        name="address"
        component={FieldX}
        type="text"
        placeholder="Adres"
        autoComplete="street-address"
        css={style.field}
        validate={[required, maxLength32]}
      />
      <Field
        name="state"
        component={FieldX}
        type="text"
        placeholder="Województwo"
        autoComplete="address-level1"
        css={style.field}
        validate={[required, maxLength32]}
      />
      <Field
        name="city"
        component={FieldX}
        type="text"
        placeholder="Miasto"
        autoComplete="address-level2"
        css={style.field}
        validate={[required, maxLength32]}
      />
      <Field
        name="postcode"
        component={FieldX}
        type="tel"
        placeholder="Kod pocztowy"
        autoComplete="postal-code"
        css={style.field}
        {...postCodeMask}
        validate={[required, postCode]}
      />
      <Field
        name="nip"
        component={FieldX}
        type="tel"
        placeholder="NIP"
        css={style.field}
        {...nipMask}
        validate={[nip]}
      />

      <div css={style.actions}>
        <Button css={style.button}>Zarejestruj</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'registration',
})(RegistrationForm);
