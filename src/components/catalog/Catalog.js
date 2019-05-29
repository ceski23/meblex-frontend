/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useTheme, getRoomIcon, getCategoryIcon } from '../../helpers';
import { Icons } from '../../assets';
import SearchBox from './SearchBox';
import Filters from './Filters';
import ItemResult from './ItemResult';
import NoItem from '../shared/NoItem';
import Button from '../shared/Button';
import * as API from '../../api';
import LoadingSpinner from '../shared/LoadingSpinner';


const Catalog = ({ location: { search } }) => {
  // const [searchResults, setSearchResults] = useState([]);
  // const handleSearch = results => setSearchResults(results);
  // const listing = useSelector(state => state.data.furniture);
  const filters = useSelector(state => state.filters);

  const rawCategories = useSelector(state => state.data.categories);
  const rawRooms = useSelector(state => state.data.rooms);
  const rooms = rawRooms.map(room => ({ ...room, icon: getRoomIcon(room.roomId) }));
  const categories = rawCategories.map(category => ({ ...category, icon: getCategoryIcon(category.categoryId) }));

  const [furniture, setFurniture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filtersElem = useRef();

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

    loading: css`
      width: 50px;
      height: 50px;
      margin: 40px auto;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,
  };

  const roomFilter = new URLSearchParams(search).get('pokoj');
  const categoryFilter = new URLSearchParams(search).get('kategoria');


  // const furnitureFilter = useCallback((item) => {
  //   // const roomTest = (!roomFilter || item.category.id === categories.filter(cat => cat.slug === categoryFilter)[0].id);
  //   // const categoryTest = (!categoryFilter || item.category === categories.filter(cat => cat.slug === categoryFilter)[0].name);

  //   // const colorTest = (!filters.colors.length || item.parts.map(i => i.color.id).some(e => filters.colors.include(e)));
  //   // const patternTest = (!filters.patterns.length || item.parts.map(i => i.pattern.id).some(e => filters.patterns.include(e)));
  //   // const materialTest = (!filters.materials.length || item.parts.map(i => i.material.id).some(e => filters.materials.include(e)));
  //   // TODO: Fix filtering
  //   return (categoryTest/* && roomTest && colorTest && patternTest && materialTest */);
  // }, [categories, categoryFilter]);


  useEffect(() => {
    const fetchFurniture = async () => {
      const colorFilter = filters.colors.length > 0 ? filters.colors : [...(filters.searchBox.color ? [filters.searchBox.color] : [])];
      const patternFilter = filters.patterns.length > 0 ? filters.patterns : [...(filters.searchBox.pattern ? [filters.searchBox.pattern] : [])];
      const materialFilter = filters.materials.length > 0 ? filters.materials : [...(filters.searchBox.material ? [filters.searchBox.material] : [])];

      const filter = [
        ...(categoryFilter ? [`category/categoryId eq ${categoryFilter}`] : []),
        ...(roomFilter ? [`room/roomId eq ${roomFilter}`] : []),
        ...(colorFilter.length ? [`color/colorId in (${colorFilter.map(c => c.colorId).join(',')})`] : []),
        ...(patternFilter.length ? [`pattern/patternId in (${patternFilter.map(p => p.patternId).join(',')})`] : []),
        ...(materialFilter.length ? [`material/materialId in (${materialFilter.map(m => m.materialId).join(',')})`] : []),
      ];

      setIsLoading(true);
      try {
        const result = await API.getFurniture({
          filter: `(${filter.join(' and ')})`,
        });
        setFurniture(result);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryFilter || roomFilter) fetchFurniture();
  }, [categoryFilter, filters.colors, filters.materials, filters.patterns, filters.searchBox.color, filters.searchBox.material, filters.searchBox.pattern, roomFilter]);

  return (
    <React.Fragment>
      <section>
        <SearchBox />
      </section>

      <div css={{ marginBottom: 20, margin: '-30px auto 10px' }}>
        <Button
          variant="secondary"
          icon={Icons.Filter}
          onClick={() => {
            setShowFilters(true);
            disableBodyScroll(filtersElem.current);
          }}
        >Filtry
        </Button>
      </div>

      {isLoading && (
        <LoadingSpinner css={style.loading} isLoading={isLoading} />
      )}

      {!isLoading && furniture.length > 0 && (
        <div>
          {furniture.map((item, i) => <ItemResult data={item} key={i} />)}
        </div>
      )}

      {!isLoading && furniture.length === 0 && (categoryFilter || roomFilter) && (
        <NoItem />
      )}

      <h3 css={style.title}>Pokoje</h3>
      <section css={style.grid}>
        {rooms.map(Room => (
          <Link to={{ pathname: '/katalog', search: `pokoj=${Room.roomId}` }} css={style.gridItem} key={Room.roomId}>
            <Room.icon css={style.itemIcon} />
            <h4>{Room.name}</h4>
          </Link>
        ))}
      </section>

      <h3 css={style.title}>Kategorie</h3>
      <section css={style.grid}>
        {categories.map(Cat => (
          <Link to={{ pathname: '/katalog', search: `kategoria=${Cat.categoryId}` }} css={style.gridItem} key={Cat.categoryId}>
            <Cat.icon css={style.itemIcon} />
            <h4>{Cat.name}</h4>
          </Link>
        ))}
      </section>

      {showFilters && (
      <Filters
        hideModal={() => {
          setShowFilters(false);
          clearAllBodyScrollLocks();
        }}
        ref={filtersElem}
      />
      )}
    </React.Fragment>
  );
};

export default Catalog;
