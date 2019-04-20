import React from 'react';
import cx from 'classnames'
import S from '../styles/FieldX.module.scss';

const FieldX = ({ className, input, label, type, meta: { touched, error }, ...rest }) => (
  <div className={cx(className, S.field)}>
    {touched && error && <span className={S.fieldError}>{error}</span>}
    <input {...input} type={type} {...rest} />
  </div>
);

export default FieldX;