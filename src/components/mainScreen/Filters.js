/** @jsx jsx */

import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../helpers';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';

import { fetchColors, fetchMaterials, fetchPatterns } from '../../redux/data';
import { setColorsFilter, setPatternsFilter, setMaterialsFilter } from '../../redux/filters';

import Checkbox from '../shared/Checkbox';


const Filters = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const data = useSelector(state => state.data);

  const filters = useSelector(state => state.filters);


  const filterBoxHeight = '60px';

  const style = {
    filterBox: css`
      background: #fff;
      position: fixed;
      /* top: calc(100vh - ${filterBoxHeight}); */
      bottom: 0;
      left: 0;
      width: 100%;
      box-shadow: 0px -1px 20px ${theme.colors.shadowDark};
      transition: .5s;
      /* height: calc(100vh - 60px); */
      max-height: ${filterBoxHeight};
      height: auto;
      overflow: hidden;
    `,

    boxOpened: css`
      /* top: 70px; */
      max-height: calc(100vh - 70px);
    `,

    header: css`
      display: flex;
      flex-direction: row;
      padding: 15px 20px;
      align-items: center;
      justify-content: space-between;
      height: ${filterBoxHeight};
      border-bottom: 1px solid ${theme.colors.text};
      background: #fff;
      transition: .5s;

      & > h3 {
        margin: 0;
        font-size: 1.2em;
      }
    `,

    boxIcon: css`
      width: 20px;
      height: 20px;
      transition: .3s;
      transform: rotate(-90deg);
    `,

    filters: css`
      padding: 20px 30px;
      overflow: scroll;
      height: calc(100vh - 70px - ${filterBoxHeight});
    `,

    filter: css`
      display: flex;
      flex-direction: row;
      padding: 20px 0;
      align-items: baseline;

      & > h4 {
        margin: 0;
        margin-right: 20px;
      }
    `,

    filterOptions: css`
      display: flex;
      flex: 1;
      flex-wrap: wrap;
    `,

    filterInput: css`
      flex: 1;
    `,
  };

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchMaterials());
    dispatch(fetchPatterns());
  }, [dispatch]);

  const handleChange = (id, val, type) => {
    const action = {
      colors: setColorsFilter,
      materials: setMaterialsFilter,
      patterns: setPatternsFilter,
    }[type];

    dispatch(action(val ? (
      [...filters[type], ...data[type].filter(f => f.id === id)]
    ) : (
      filters[type].filter(f => f.id !== id)
    )));
  };

  return (
    <div css={[style.filterBox, filtersOpen ? style.boxOpened : null]}>
      <div
        css={[style.header, { background: filtersOpen ? theme.colors.backgroundGray : null }]}
        tabIndex={0}
        role="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        <h3>Filtry</h3>
        <Chevron css={[style.boxIcon, { transform: filtersOpen ? 'rotate(90deg)' : null }]} />
      </div>

      <div css={style.filters}>

        <div css={style.filter}>
          <h4>Kolor:</h4>
          <div css={style.filterOptions}>
            {data.colors.map(c => (
              <Checkbox
                key={c.id}
                label={c.name}
                checked={filters.colors.some(filter => filter.id === c.id)}
                onChange={val => handleChange(c.id, val, 'colors')}
              />
            ))}
          </div>
        </div>

        <div css={style.filter}>
          <h4>Wzór:</h4>
          <div css={style.filterOptions}>
            {data.patterns.map(c => (
              <Checkbox
                key={c.id}
                label={c.name}
                checked={filters.patterns.some(filter => filter.id === c.id)}
                onChange={val => handleChange(c.id, val, 'patterns')}
              />
            ))}
          </div>
        </div>

        <div css={style.filter}>
          <h4>Materiał:</h4>
          <div css={style.filterOptions}>
            {data.materials.map(c => (
              <Checkbox
                key={c.id}
                label={c.name}
                checked={filters.materials.some(filter => filter.id === c.id)}
                onChange={val => handleChange(c.id, val, 'materials')}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filters;
