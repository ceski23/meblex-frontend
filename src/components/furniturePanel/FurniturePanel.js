/** @jsx jsx */

import React, { useState, useRef } from 'react';
import { jsx, css } from '@emotion/core';
import SwipeableViews from 'react-swipeable-views';
import { SubmissionError } from 'redux-form';
import { useDispatch } from 'react-redux';
import ColorsForm from './ColorsForm';
import ColorsList from './ColorsList';
import { useTheme } from '../../helpers';
import { ripple } from '../../styles';
import MaterialsForm from './MaterialsForm';
import MaterialsList from './MaterialsList';
import PatternsForm from './PatternsForm';
import PatternsList from './PatternsList';
import AddFurnitureForm from './AddFurnitureForm';
import * as API from '../../api';
import { fetchColors, fetchMaterials, fetchPatterns } from '../../redux/data';

const FurniturePanel = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const tabsElem = useRef();
  const dispatch = useDispatch();

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

  const handleAddFurniture = async (values) => {
    const { photos, ...data } = values;
    setFurnitureFormLoading(true);
    try {
      const furnitureData = await API.addFurniture(data, Array.from(photos.files));
      console.log(furnitureData);
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setFurnitureFormLoading(false);
    }
  };

  const handleAddColor = async (values) => {
    setColorFormLoading(true);
    try {
      await API.addColor(values);
      dispatch(fetchColors());
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setColorFormLoading(false);
    }
  };

  const handleAddMaterial = async (values) => {
    setMaterialFormLoading(true);
    try {
      await API.addMaterial(values);
      dispatch(fetchMaterials());
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setMaterialFormLoading(false);
    }
  };

  const handleAddPattern = async (values) => {
    setPatternFormLoading(true);
    try {
      await API.addPattern(values);
      dispatch(fetchPatterns());
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    } finally {
      setPatternFormLoading(false);
    }
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
            <AddFurnitureForm onSubmit={handleAddFurniture} isLoading={furnitureFormLoading} />
          </div>
        </div>

        <div>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj kolor</h3>
            <ColorsForm isLoading={colorFormLoading} onSubmit={handleAddColor} />
          </div>
          <ColorsList />
        </div>

        <div>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj materiał</h3>
            <MaterialsForm isLoading={materialFormLoading} onSubmit={handleAddMaterial} />
          </div>
          <MaterialsList />
        </div>

        <div>
          <div css={style.panel}>
            <h3 css={style.title}>Dodaj wzór</h3>
            <PatternsForm isLoading={patternFormLoading} onSubmit={handleAddPattern} />
          </div>
          <PatternsList />
        </div>

      </SwipeableViews>
    </React.Fragment>
  );
};

export default FurniturePanel;
