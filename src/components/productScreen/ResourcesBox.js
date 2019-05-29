/** @jsx jsx */

import { css, jsx } from '@emotion/core';

const ResourcesBox = ({ title, parts, type }) => {
  const materials = {
    1: 'https://media.istockphoto.com/photos/beech-wood-texture-picture-id185869660',
    2: 'http://www.tkaniny-meblowe.pl/6039/tkanina-cablo-10-ag.jpg',
  };

  const style = {
    box: css`
      padding: 20px 30px;
    `,

    title: css`

    `,

    resource: css`
      display: flex;
      flex-direction: row;
    `,

    img: css`
      width: 40px;
      height: 40px;
      display: inline-block;
      border-radius: 50%;
      border: 2px solid;
      margin-right: 20px;
    `,

    info: css`
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;

      p {
        margin: 0;
        font-size: 0.8em;
      }

      h5 {
        font-weight: bold;
        margin: 0;
      }
    `,
  };

  return (
    <div css={style.box}>
      <h3 css={style.title}>{title}</h3>
      {parts.map((part) => {
        const background = {
          material: `url(${materials[part.material.materialId]})`,
          color: part.color.hexCode,
        }[type];

        return (
          <div css={style.resource} key={part.id}>
            <span css={[style.img, { background }]} />
            <div css={style.info}>
              <h5>{part[type].name}</h5>
              <p>{part.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResourcesBox;
