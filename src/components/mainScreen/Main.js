import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import { useSelector } from 'react-redux';
import S from './Main.module.scss';
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

  const roomFilter = new URLSearchParams(search).get('pokoj');
  const categoryFilter = new URLSearchParams(search).get('kategoria');

  const categories = [
    { name: 'Krzesła', slug: 'krzesla', icon: Furniture.DiningChair },
    { name: 'Wieszaki', slug: 'wieszaki', icon: Furniture.CoatStand },
    { name: 'Biurka', slug: 'biurka', icon: Furniture.Desk },
    { name: 'Lustra', slug: 'lustra', icon: Furniture.Mirror },
    { name: 'Stoliki pod TV', slug: 'stoliki-tv', icon: Furniture.TvTable },
    { name: 'Sofy', slug: 'sofy', icon: Furniture.Sofa },
    { name: 'Łóżka', slug: 'lozka', icon: Furniture.DoubleBed },
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
      <section className="gray">
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


      <section className={S.categoriesGrid}>
        {categories.map((c, k) => (
          <Link to={{ pathname: '/katalog', search: `kategoria=${c.slug}` }} className={cx('ripple', S.cat)} key={k}>
            <c.icon className={S.icon} />
            <h4 className={S.text}>{c.name}</h4>
          </Link>
        ))}
      </section>

      {(roomFilter || categoryFilter) && <Filters />}
    </React.Fragment>
  );
};

export default Main;
