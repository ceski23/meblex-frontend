import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import S from './Button.module.scss';

const Button = (props) => {
  const {
    children, handleClick, className, type, elem, ...rest
  } = props;
  const classes = cx(S.button, className, {
    [S.secondary]: type === 'secondary',
  });

  const handleFocus = ({ target }) => {
    setTimeout(() => { target.blur(); }, 300);
  };

  return (
    <React.Fragment>
      {elem === 'button' && (
        <button {...rest} type="button" className={classes} onClick={handleClick} onMouseUp={handleFocus}>
          {children}
        </button>
      )}

      {elem === 'input' && (
        <input {...rest} className={classes} type="submit" value={children} onMouseUp={handleFocus} />
      )}

      {elem === 'link' && (
        <Link {...rest} className={classes} onFocus={handleFocus}>
          {children}
        </Link>
      )}
    </React.Fragment>
  );
};

Button.defaultProps = {
  type: 'normal',
  elem: 'button',
};

export default Button;
