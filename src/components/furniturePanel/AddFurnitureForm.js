/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { useSelector } from 'react-redux';
import FieldX from '../shared/FieldX';
import Button from '../shared/Button';
import { required, maxLength32, number, size } from '../../validationRules';
import PartsSubform from './PartsSubform';
import SelectField from './fields/SelectField';
import TextareaField from '../shared/TextareaField';

const priceMask = createNumberMask({
  suffix: ' zł',
  decimalPlaces: 2,
  allowEmpty: true,
});

const AddFurnitureForm = ({ handleSubmit, error, isLoading }) => {
  const colors = useSelector(state => state.data.colors);
  const patterns = useSelector(state => state.data.patterns);
  const materials = useSelector(state => state.data.materials);

  const categories = useSelector(state => state.data.categories);
  const rooms = useSelector(state => state.data.rooms);

  const style = {
    form: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
      padding: 20px;
    `,

    formError: css`
      margin-top: -10px;
      margin-bottom: 20px;
      font-weight: bold;
      text-align: center;
      color: red;
    `,

    fieldWrapper: css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin: 10px 0;
      flex-direction: column;
    `,

    fieldLabel: css`
      margin: 0;
      margin-right: 20px;
      font-size: .9em;
      height: 42px;
      line-height: 42px;
    `,

    formField: css`
      flex: 1;
      min-width: 0;
      width: 100%;
    `,

    submitButton: css`
      margin: 30px 0;
      display: flex;
      flex-direction: column;
    `,
  };

  return (
    <form css={style.form} onSubmit={handleSubmit}>
      {error && <p css={style.formError}>{error}</p>}

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Nazwa mebla:</h4>
        <Field
          name="name"
          component={FieldX}
          type="text"
          css={style.formField}
          validate={[required, maxLength32]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Kolor:</h4>
        <Field
          name="color"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Wzór:</h4>
        <Field
          name="pattern"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {patterns.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Materiał:</h4>
        <Field
          name="material"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {materials.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Cena:</h4>
        <Field
          name="price"
          component={FieldX}
          type="tel"
          css={style.formField}
          validate={[required, maxLength32]}
          {...priceMask}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Ilość:</h4>
        <Field
          name="count"
          component={FieldX}
          type="tel"
          css={style.formField}
          parse={value => (Number.isNaN(parseInt(value, 10)) ? null : parseInt(value, 10))}
          validate={[required, maxLength32, number]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Rozmiar (Szer x Wys x Głęb):</h4>
        <Field
          name="size"
          component={FieldX}
          type="tel"
          css={style.formField}
          validate={[required, maxLength32, size]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Opis:</h4>
        <Field
          name="description"
          component={TextareaField}
          css={style.formField}
          validate={[required]}
        />
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Pomieszczenie:</h4>
        <Field
          name="room"
          component={SelectField}
          css={style.formField}
          validate={[required]}
        >
          <option disabled />
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </Field>
      </div>

      <div css={style.fieldWrapper}>
        <h4 css={style.fieldLabel}>Kategoria:</h4>
        <Field
          name="category"
          component={SelectField}
          css={style.formField}
          validate={[required]}
          parse={value => Number(value)}
        >
          <option disabled />
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Field>
      </div>

      <FieldArray name="parts" component={PartsSubform} />

      <div css={style.submitButton}>
        <Button type="submit" isLoading={isLoading}>Dodaj mebel</Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'addFurnitureForm',
})(AddFurnitureForm);
