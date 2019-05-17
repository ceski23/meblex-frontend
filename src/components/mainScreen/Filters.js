/** @jsx jsx */

import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../helpers';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';

import { fetchColors, fetchMaterials, fetchPatterns } from '../../redux/data';
import {
  setColorFilter as setColorFilterAction,
  setPatternFilter as setPatternFilterAction,
  setMaterialFilter as setMaterialFilterAction,
} from '../../redux/filters';

import IconSelect from './IconSelect';


const Filters = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const data = useSelector(state => state.data);

  const filters = useSelector(state => state.filters);
  const setColorFilter = color => dispatch(setColorFilterAction(color));
  const setPatternFilter = pattern => dispatch(setPatternFilterAction(pattern));
  const setMaterialFilter = material => dispatch(setMaterialFilterAction(material));


  const filterBoxHeight = '60px';

  const style = {
    filterBox: css`
      background: #fff;
      position: fixed;
      top: calc(100vh - ${filterBoxHeight});
      left: 0;
      width: 100%;
      box-shadow: 0px -1px 20px ${theme.colors.shadowDark};
      transition: .5s;
      height: calc(100vh - 60px);
    `,

    boxOpened: css`
      top: 70px;
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
    `,

    filter: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px 0;

      & > h4 {
        margin: 0;
        margin-right: 20px;
      }
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
          <IconSelect
            css={style.filterInput}
            options={data.colors}
            iconKey="hex_code"
            current={filters.color}
            setCurrent={setColorFilter}
          />
        </div>

        <div css={style.filter}>
          <h4>Wzór:</h4>
          <IconSelect
            css={style.filterInput}
            options={data.patterns}
            iconKey="url"
            current={filters.pattern}
            setCurrent={setPatternFilter}
          />
        </div>

        <div css={style.filter}>
          <h4>Materiał:</h4>
          <IconSelect
            css={style.filterInput}
            options={data.materials}
            iconKey="url"
            current={filters.material}
            setCurrent={setMaterialFilter}
          />
        </div>

      </div>
    </div>
  );
};

export default Filters;
