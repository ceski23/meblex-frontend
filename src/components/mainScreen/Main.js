import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import S from './Main.module.scss';
import { Furniture } from '../../assets';
import SearchBox from './SearchBox';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';


const Main = () => {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = results => setSearchResults(results);
  const [filterOpen, setFilterOpen] = useState(false);

  const getIcon = type => ({
    krzesło: Furniture.DiningChair,
    kanapa: Furniture.Sofa,
    stolik: Furniture.Table1,
    szafa: Furniture.Wardrobe,
    szafka: Furniture.Cupboard1,
    fotel: Furniture.Armchair,
    pufa: Furniture.Bean,
    łóżko: Furniture.DoubleBed,
  }[type]);

  const categories = [
    { name: 'Krzesła', slug: 'krzesla', icon: Furniture.DiningChair },
    { name: 'Wieszaki', slug: 'wieszaki', icon: Furniture.CoatStand },
    { name: 'Biurka', slug: 'biurka', icon: Furniture.Desk },
    { name: 'Lustra', slug: 'lustra', icon: Furniture.Mirror },
    { name: 'Stoliki pod TV', slug: 'stoliki-tv', icon: Furniture.TvTable },
    { name: 'Sofy', slug: 'sofy', icon: Furniture.Sofa },
    { name: 'Łóżka', slug: 'lozka', icon: Furniture.DoubleBed },
  ];

  return (
    <React.Fragment>
      <section className="gray">
        <SearchBox callback={handleSearch} />
      </section>

      {searchResults.slice(0, 50).map((r, i) => {
        const Icon = getIcon(r.item.type);
        return (
          <div className={S.WYNIKI} key={i}>
            <Icon className={S.icon} />
            <div className={S.info}>
              <h4 className={S.name}>{r.item.name}</h4>
              <p className={S.color}>{r.item.color}, {r.item.material.split(' ')[0]}
              </p>
            </div>
            <h3 className={S.price}>
              {r.item.price}
              <span className={S.currency}>zł</span>
            </h3>
          </div>
        );
      })}

      <section className={S.categoriesGrid}>
        {categories.map((c, k) => (
          <Link to={`/katalog/${c.slug}`} className={cx('ripple', S.cat)} key={k}>
            <c.icon className={S.icon} />
            <h4 className={S.text}>{c.name}</h4>
          </Link>
        ))}
      </section>

      <div className={cx(S.filterBox, { [S.open]: filterOpen })}>
        <div className={S.header} tabIndex={0} role="button" onClick={() => setFilterOpen(!filterOpen)}>
          <h3 className={S.title}>Filtry</h3>
          <Chevron className={S.icon} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
