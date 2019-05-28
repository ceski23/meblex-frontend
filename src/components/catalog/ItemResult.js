/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { useTheme } from '../../helpers';

const ItemResult = ({ data, ...props }) => {
  const theme = useTheme();

  const style = {
    result: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px 20px;
      text-decoration: none;
    `,

    image: css`
      width: 70px;
      height: 70px;
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      & > img {
        max-width: 70px;
        max-height: 70px;
      }
    `,

    textBox: css`
      flex: 1;
    `,

    text: css`
      margin: 0;
      font-size: .8em;
    `,

    price: css`
      margin: 0 0 0 20px;
      font-size: 1.5em;
    `,

    currency: css`
      color: ${theme.colors.gray};
      font-size: 0.7em;
      margin-left: 3px;
    `,
  };

  return (
    <Link to={`katalog/produkty/${data.id}`} css={style.result} {...props}>
      <div css={style.image}>
        <img src={data.photos[0]} alt={data.name} />
      </div>
      <div css={style.textBox}>
        <h4 css={style.text}>{data.name}</h4>
      </div>
      <h3 css={style.price}>
        {data.price}
        <span css={style.currency}>zł</span>
      </h3>
    </Link>
  );
};

export default ItemResult;
