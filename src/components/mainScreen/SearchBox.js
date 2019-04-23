import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useDebounce } from 'use-debounce';
import { connect } from 'react-redux';

import { Icons } from '../../assets';
import S from './SearchBox.module.scss';

const SearchBox = ({ callback, listing }) => {
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 400);

  const fuse = new Fuse(listing, {
    shouldSort: true,
    // findAllMatches: true,
    tokenize: true,
    maxPatternLength: 32,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 3,
    keys: ['color', 'material', 'type', 'name'],
  });

  useEffect(() => {
    if (debouncedFilter.length === 0) callback([]);
    else if (debouncedFilter.length >= 3) callback(fuse.search(debouncedFilter).slice(0, 50));
  }, [callback, debouncedFilter, fuse]);


  const clearInput = () => setFilter('');
  const handleInput = ({ target }) => setFilter(target.value);

  return (
    <label htmlFor="searchBox" className={S.searchBox}>
      <Icons.Search className={S.icon} />
      <input type="text" value={filter} onChange={handleInput} id="searchBox" autoComplete="search" placeholder="np. żółte dębowe krzesło" className={S.input} />
      {filter && <Icons.Close onClick={clearInput} className={S.clear} />}
    </label>
  );
};

export default connect(state => ({
  listing: state.listing.furniture,
}))(SearchBox);
