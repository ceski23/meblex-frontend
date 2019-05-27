/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useTheme, getRoomIcon, getCategoryIcon } from '../../helpers';
import { Icons } from '../../assets';
import SearchBox from './SearchBox';
import Filters from './Filters';
import ItemResult from './ItemResult';
import NoItem from '../shared/NoItem';
import Button from '../shared/Button';


const Main = ({ location: { search } }) => {
  // const [searchResults, setSearchResults] = useState([]);
  // const handleSearch = results => setSearchResults(results);
  const listing = useSelector(state => state.data.furniture);
  const filters = useSelector(state => state.filters);

  const rawCategories = useSelector(state => state.data.categories);
  const rawRooms = useSelector(state => state.data.rooms);
  const rooms = rawRooms.map(room => ({ ...room, icon: getRoomIcon(room.slug) }));
  const categories = rawCategories.map(category => ({ ...category, icon: getCategoryIcon(category.slug) }));


  const theme = useTheme();
  const [showFilters, setShowFilters] = useState(false);

  const style = {
    title: css`
      margin: 40px auto 20px;
      width: 80%;
    `,

    grid: css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: left;
      margin: 0;
      padding: 0;
    `,

    gridItem: css`
      width: 33%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      transition: .3s;
      text-decoration: none;

      &:hover {
        background: ${theme.colors.primary_01};
      }

      & > h4 {
        margin: 10px auto;
        margin-top: 15px;
        font-size: .9em;
        text-align: center;
      }
    `,

    itemIcon: css`
      margin-top: 10px;
      height: 40px;
      fill: ${theme.colors.text};
    `,
  };

  const roomFilter = new URLSearchParams(search).get('pokoj');
  const categoryFilter = new URLSearchParams(search).get('kategoria');


  const furnitureFilter = useCallback((item) => {
    // const roomTest = (!roomFilter || item.category.id === categories.filter(cat => cat.slug === categoryFilter)[0].id);
    const categoryTest = (!categoryFilter || item.category === categories.filter(cat => cat.slug === categoryFilter)[0].name);

    // const colorTest = (!filters.colors.length || item.parts.map(i => i.color.id).some(e => filters.colors.include(e)));
    // const patternTest = (!filters.patterns.length || item.parts.map(i => i.pattern.id).some(e => filters.patterns.include(e)));
    // const materialTest = (!filters.materials.length || item.parts.map(i => i.material.id).some(e => filters.materials.include(e)));
    // TODO: Fix filtering
    return (categoryTest/* && roomTest && colorTest && patternTest && materialTest */);
  }, [categories, categoryFilter]);

  return (
    <React.Fragment>
      <section>
        <SearchBox />
      </section>

      <div css={{ marginBottom: 20, margin: '-30px auto 10px' }}>
        <Button variant="secondary" icon={Icons.Filter} onClick={() => setShowFilters(true)}>Filtry</Button>
      </div>

      {(categoryFilter || roomFilter) && (
        listing.filter(furnitureFilter).length > 0 ? (
          <div>
            {listing.filter(furnitureFilter).map((item, i) => <ItemResult data={item} key={i} />)}
          </div>
        ) : (
          <NoItem />
        )
      )}

      <h3 css={style.title}>Pokoje</h3>
      <section css={style.grid}>
        {rooms.map((Room, k) => (
          <Link to={{ pathname: '/katalog', search: `pokoj=${Room.slug}` }} css={style.gridItem} key={k}>
            <Room.icon css={style.itemIcon} />
            <h4>{Room.name}</h4>
          </Link>
        ))}
      </section>

      <h3 css={style.title}>Kategorie</h3>
      <section css={style.grid}>
        {categories.map((Cat, k) => (
          <Link to={{ pathname: '/katalog', search: `kategoria=${Cat.slug}` }} css={style.gridItem} key={k}>
            <Cat.icon css={style.itemIcon} />
            <h4>{Cat.name}</h4>
          </Link>
        ))}
      </section>

      {showFilters && <Filters hideModal={() => setShowFilters(false)} />}
    </React.Fragment>
  );
};

export default Main;
