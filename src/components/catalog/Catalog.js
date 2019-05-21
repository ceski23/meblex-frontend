/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useTheme } from '../../helpers';
import { Furniture } from '../../assets';
import SearchBox from './SearchBox';
import Filters from './Filters';
import ItemResult from './ItemResult';
import NoItem from '../shared/NoItem';


const Main = ({ location: { search } }) => {
  // const [searchResults, setSearchResults] = useState([]);
  // const handleSearch = results => setSearchResults(results);
  const listing = useSelector(state => state.data.furniture);
  const filters = useSelector(state => state.filters);
  const theme = useTheme();

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

  const categories = [
    { name: 'Krzesła', slug: 'krzesla', icon: Furniture.DiningChair },
    { name: 'Biurka', slug: 'biurka', icon: Furniture.Desk },
    { name: 'Lustra', slug: 'lustra', icon: Furniture.Mirror },
    { name: 'Stoliki TV', slug: 'stoliki-tv', icon: Furniture.TvTable },
    { name: 'Sofy', slug: 'sofy', icon: Furniture.Sofa },
    { name: 'Łóżka', slug: 'lozka', icon: Furniture.DoubleBed },
  ];

  const rooms = [
    { name: 'Do salonu', slug: 'salon', icon: Furniture.Couch },
    { name: 'Do kuchni', slug: 'kuchnia', icon: Furniture.Kitchen },
    { name: 'Do sypialni', slug: 'lazienka', icon: Furniture.SingleBed },
  ];

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
        {rooms.map((c, k) => (
          <Link to={{ pathname: '/katalog', search: `pokoj=${c.slug}` }} css={style.gridItem} key={k}>
            <c.icon css={style.itemIcon} />
            <h4>{c.name}</h4>
          </Link>
        ))}
      </section>

      <h3 css={style.title}>Kategorie</h3>
      <section css={style.grid}>
        {categories.map((c, k) => (
          <Link to={{ pathname: '/katalog', search: `kategoria=${c.slug}` }} css={style.gridItem} key={k}>
            <c.icon css={style.itemIcon} />
            <h4>{c.name}</h4>
          </Link>
        ))}
      </section>

      {(roomFilter || categoryFilter) && <Filters />}
    </React.Fragment>
  );
};

export default Main;
