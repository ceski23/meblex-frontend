/** @jsx jsx */

import { jsx } from '@emotion/core';
import ReactSelect from 'react-select';
import { useTheme } from '../../helpers';


const Select = ({ defaultValue, ...props }) => {
  const theme = useTheme();

  const style = {
    control: styles => ({
      ...styles,
      boxShadow: `0 2px 4px ${theme.colors.shadow}`,
      border: '1px solid rgb(229, 232, 237)',
      padding: '5px',
      fontSize: '0.9em',
      color: theme.colors.textDark,
      background: theme.colors.backgroundGray,
      borderRadius: '5px',
    }),
    multiValue: styles => ({
      ...styles,
      background: theme.colors.primary,
      color: 'white',
      padding: '5px 7px',
      fontSize: '1.1em',
      borderRadius: '5px',
    }),
    multiValueLabel: styles => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: styles => ({
      ...styles,
      color: theme.colors.textDark,
    }),
  };

  return (
    <ReactSelect
      styles={style}
      {...props}
    />
  );
};

export default Select;
