/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Img from 'react-image';
import { useTheme, getCategoryIcon } from '../../helpers';
import config from '../../config';

const CustomSizeRequest = ({ request, ...props }) => {
  const theme = useTheme();
  const FallbackIcon = getCategoryIcon(request.pieceOfFurniture.category.categoryId);

  const style = {
    item: css`
      display: flex;
      align-items: center;
      padding: 10px 0px;
      text-decoration: none;
      width: 100%;
      margin: 0 0 30px 0;
      flex-direction: column;
      background: #fff;
      box-shadow: 0px 1px 15px rgba(4, 35, 101, 0.22);
      border-radius: 5px;
    `,

    info: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
    `,

    image: css`
      width: 70px;
      height: 70px;
      margin: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    `,

    fallbackIcon: css`
      width: 100%;
      height: 100%;
      margin: 0 15px;
      fill: ${theme.colors.text};
    `,

    textBox: css`
      flex: 1;
      margin-right: 20px;
    `,

    text: css`
      margin: 0;
      font-size: 1.1em;
    `,

    size: css`
      margin: 12px 0 0 0;
      font-size: 0.9em;
    `,

    field: css`
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        height: 42px;
      }
    `,
  };


  return (
    <div css={style.item} {...props}>
      <div css={style.info}>

        <div css={style.image}>
          <Img
            src={`${config.IMAGES_SERVER}${request.pieceOfFurniture.photos[0]}`}
            loader={<FallbackIcon css={style.fallbackIcon} />}
            unloader={<FallbackIcon css={style.fallbackIcon} />}
          />
        </div>

        <div css={style.textBox}>
          <h4 css={style.text}>{request.pieceOfFurniture.name}</h4>

          <div css={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
            <p css={{ margin: '10px 10px 0 0' }}>Rozmiar:</p>
            <h3 css={style.size}>{request.pieceOfFurniture.size.split('x').join(' x ')}</h3>
          </div>

          <div css={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
            <p css={{ margin: '10px 10px 0 0' }}>Status:</p>
            <h3 css={style.size}>NIE ZATWIERDZONO</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomSizeRequest;
