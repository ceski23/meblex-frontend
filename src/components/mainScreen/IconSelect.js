/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useTheme } from '../../helpers';

const IconSelect = ({ options, current, setCurrent, iconKey, ...props }) => {
  const theme = useTheme();

  const style = {
    filterInput: css`
      padding-top: 20px;
      padding-bottom: 20px;
    `,

    paddedInput: css`
      padding-left: 60px;
    `,

    iconDot: css`
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      left: 17px;
      top: 17px;
      z-index: 10;
      border: 1px solid ${theme.colors.text};
      background-size: cover;
    `,

    selectWrapper: css`
      display: flex;
      position: relative; 
    `,
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10) || undefined;
    setCurrent(newValue);
  };

  return (
    <div css={style.selectWrapper} {...props}>
      {current && (
      <span css={[style.iconDot, iconKey === 'url' ? {
        backgroundImage: `url(${options.filter(c => c.id === current)[0][iconKey]})`,
      } : {
        background: options.filter(c => c.id === current)[0][iconKey],
      }]}
      />
      )}

      <select
        css={[style.filterInput, current ? style.paddedInput : null]}
        {...props}
        value={current}
        onChange={handleChange}
      >
        <option value={undefined}>Dowolny</option>

        {options.map(value => (
          <option key={value.id} value={value.id}>{value.name}</option>
        ))}

      </select>
    </div>
  );
};
export default IconSelect;
