import React from 'react'
import S from '../styles/Button.module.scss'
import cx from 'classnames'
import { Link } from 'react-router-dom'

const Button = (props) => {
  const {children, handleClick, className, type, elem, ...rest} = props;
  let classes = cx(S.button, className, {
    [S.secondary]: type === 'secondary'
  });

  return (
    <React.Fragment>
      {elem === 'button' && (
        <button {...rest} className={classes} onClick={handleClick}>
          {children}
        </button>
      )}
  
      {elem === 'input' && (
        <input {...rest} className={classes} type="submit" value={children} />
      )}
  
      {elem === 'link' && (
        <Link {...rest} className={classes}>
          {children}
        </Link>
      )}
    </React.Fragment>
  )
}

Button.defaultProps = {
  type: 'normal',
  elem: 'button',
}

export default Button;