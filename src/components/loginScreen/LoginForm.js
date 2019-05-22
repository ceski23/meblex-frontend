/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { useTheme } from '../../helpers';
import Button from '../shared/Button';
import FieldX from '../shared/FieldX';
import { email, password, required } from '../../validationRules';


const LoginForm = ({ handleSubmit, error }) => {
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

    loginButton: css`
      flex: 1;
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
    `,
  };

  return (
    <form css={style.form} onSubmit={handleSubmit}>
      <h4 css={style.title}>Witaj, <strong>zaloguj się</strong> aby korzystać z aplikacji!</h4>
      {error && <p css={style.formError}>{error}</p>}

      <Field
        css={style.field}
        name="email"
        component={FieldX}
        type="email"
        placeholder="Adres email"
        autoComplete="email"
        validate={[required, email]}
      />
      <Field
        css={style.field}
        name="password"
        component={FieldX}
        type="password"
        required
        placeholder="Hasło"
        autoComplete="current-password"
        validate={[required, password]}
      />

      <div css={style.actions}>
        <Button css={style.loginButton}>Zaloguj</Button>
        <Button component={Link} variant="secondary" to="/rejestracja">Rejestracja</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'login',
})(LoginForm);
