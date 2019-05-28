/** @jsx jsx */

import React, { useState, useRef } from 'react';
import { jsx, css } from '@emotion/core';
import SwipeableViews from 'react-swipeable-views';
import ColorsForm from './ColorsForm';
import ColorsList from './ColorsList';
import { useTheme } from '../../helpers';
import { ripple } from '../../styles';
import MaterialsForm from './MaterialsForm';
import MaterialsList from './MaterialsList';
import PatternsForm from './PatternsForm';
import PatternsList from './PatternsList';
import AddFurnitureForm from './AddFurnitureForm';

const FurniturePanel = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const tabsElem = useRef();

  const [furnitureFormLoading, setFurnitureFormLoading] = useState(false);
  const [colorFormLoading, setColorFormLoading] = useState(false);
  const [materialFormLoading, setMaterialFormLoading] = useState(false);
  const [patternFormLoading, setPatternFormLoading] = useState(false);

  const tabs = [
    'Meble', 'Kolory', 'Materiały', 'Wzory',
  ];

  const sliderMargin = 15;

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

    tabs: css`
      display: flex;
      flex-direction: row;
      width: 100%;
    `,

    tab: css`
      flex: 1;
      padding: 20px 0;
      background: none;
      border: none;
      ${ripple('rgba(0, 0, 0, .2)')};
      outline: none;
      text-align: center;
      font-weight: bold;
      color: ${theme.colors.textDark};
      font-size: 1em;
    `,

    slider: css`
      background: ${theme.colors.primary};
      height: 2px;
      border-radius: 10px;
      width: calc(${(100 / tabs.length)}% - ${2 * sliderMargin}px);
      transition: .3s;
      margin-bottom: 10px;
    `,
  };


  const handleTabClick = ({ target }) => {
    const children = Array.from(tabsElem.current.children);
    setIndex(children.indexOf(target));
  };

  const handleMouseUp = ({ target }) => {
    setTimeout(() => { target.blur(); }, 300);
  };

  const handleSub = (values) => {
    console.log(values);
    setFurnitureFormLoading(true);
    setTimeout(() => setFurnitureFormLoading(false), 4000);
  };

  return (
    <React.Fragment>
      <div css={style.tabs} ref={tabsElem}>
        {tabs.map((tab, i) => (
          <button css={style.tab} key={i} type="button" onClick={handleTabClick} onMouseUp={handleMouseUp}>
            {tab}
          </button>
        ))}
      </div>

      <span css={[style.slider, {
        transform: `translateX(calc(${index * 100}% + ${(index) * (2 * sliderMargin)}px + ${sliderMargin}px))`,
      }]}
      />

      <SwipeableViews index={index} onChangeIndex={i => setIndex(i)}>

        <div>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj mebel</h3>
            <AddFurnitureForm onSubmit={handleSub} isLoading={furnitureFormLoading} />
          </div>
        </div>

        <div>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj kolor</h3>
            <ColorsForm isLoading={colorFormLoading} />
          </div>
          <ColorsList />
        </div>

        <div>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj materiał</h3>
            <MaterialsForm isLoading={materialFormLoading} />
          </div>
          <MaterialsList />
        </div>

        <div>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj wzór</h3>
            <PatternsForm isLoading={patternFormLoading} />
          </div>
          <PatternsList />
        </div>

      </SwipeableViews>
    </React.Fragment>
  );
};

export default FurniturePanel;
