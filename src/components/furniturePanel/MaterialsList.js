/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { useTheme } from '../../helpers';
import { Icons } from '../../assets';

const MaterialsList = () => {
  const materials = useSelector(state => state.data.materials);
  const theme = useTheme();

  const style = {
    panel: css`
      padding: 30px 20px;
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
    `,

    subTitle: css`
      margin: 0;
      margin-bottom: 30px;
      padding-top: 70px;
    `,

    material: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 20px 0;

      h4 {
        margin: 0;
        font-size: .9em;
        flex: 1;
      }
    `,

    icon: css`
      width: 30px;
      height: 30px;
      margin-right: 20px;
      border-radius: 50%;
      box-shadow: 0px 1px 5px ${theme.colors.shadowDark};
      border: 1px solid ${theme.colors.primaryDark};
      background-size: cover;
    `,

    remove: css`
      width: 15px;
      height: 15px;
      fill: red;
      margin-right: 10px;
    `,
  };

  return (
    <React.Fragment>
      <div css={style.panel}>
        <h3 css={style.title}>Istniejące materiały</h3>

        <div css={style.list}>
          {materials.map(material => (
            <div css={style.material} key={material.id}>
              <div css={[style.icon, { backgroundImage: `url(${material.url})` }]} />
              <h4>{material.name}</h4>
              <span css={style.remove} role="button" tabIndex={0}>
                <Icons.Close2 />
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MaterialsList;
