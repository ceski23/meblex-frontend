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

const FurniturePanel = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const tabsElem = useRef();

  const tabs = [
    'Meble', 'Kolory', 'Materiały', 'Wzory',
  ];

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
      width: ${(100 / tabs.length)}%;
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

  return (
    <React.Fragment>
      <div css={style.tabs} ref={tabsElem}>
        {tabs.map((tab, i) => (
          <button css={style.tab} key={i} type="button" onClick={handleTabClick} onMouseUp={handleMouseUp}>
            {tab}
          </button>
        ))}
      </div>
      <span css={[style.slider, { transform: `translateX(${index * 100}%)` }]} />

      <SwipeableViews index={index} onChangeIndex={i => setIndex(i)}>

        <React.Fragment>
        </React.Fragment>

        <React.Fragment>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj kolor</h3>
            <ColorsForm />
          </div>
          <ColorsList />
        </React.Fragment>

        <React.Fragment>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj materiał</h3>
            <MaterialsForm />
          </div>
          <MaterialsList />
        </React.Fragment>

        <React.Fragment>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj materiał</h3>
            <PatternsForm />
          </div>
          <PatternsList />
        </React.Fragment>

      </SwipeableViews>
    </React.Fragment>
  );
};

export default FurniturePanel;
