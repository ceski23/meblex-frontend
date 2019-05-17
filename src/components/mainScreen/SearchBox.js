/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useDebounce } from 'use-debounce';
import { useSelector } from 'react-redux';
import { useTheme } from '../../helpers';

import { Icons } from '../../assets';

const SearchBox = ({ callback }) => {
  // const listing = useSelector(state => state.data.furniture);
  const [filter, setFilter] = useState('');
  // const [debouncedFilter] = useDebounce(filter, 400);
  const theme = useTheme();

  const style = {
    searchBox: css`
      width: 100%;
      position: relative;
    `,

    icon: css`
      position: absolute;
      height: 30px;
      top: 15px;
      left: 15px;
      fill: ${theme.colors.shadowDark};
    `,

    input: css`
      width: 100%;
      height: 60px;
      padding-left: 60px !important;
      padding-right: 60px !important;
      background: #fff !important;
    `,

    clear: css`
      position: absolute;
      height: 20px;
      top: 20px;
      right: 20px;
      fill: ${theme.colors.shadowDark};
    `,
  };

  // const fuse = new Fuse(listing, {
  //   shouldSort: true,
  //   // findAllMatches: true,
  //   tokenize: true,
  //   maxPatternLength: 32,
  //   includeScore: true,
  //   includeMatches: true,
  //   minMatchCharLength: 3,
  //   keys: ['color', 'material', 'type', 'name'],
  // });

  // useEffect(() => {
  //   if (debouncedFilter.length === 0) callback([]);
  //   else if (debouncedFilter.length >= 3) callback(fuse.search(debouncedFilter).slice(0, 50));
  // }, [callback, debouncedFilter, fuse]);


  const clearInput = () => setFilter('');
  const handleInput = ({ target }) => setFilter(target.value);

  return (
    <label htmlFor="searchBox" css={style.searchBox}>
      {console.log('ww')}
      <Icons.Search css={style.icon} />

      <input
        type="text"
        value={filter}
        onChange={handleInput}
        id="searchBox"
        autoComplete="search"
        placeholder="np. żółte dębowe krzesło"
        css={style.input}
      />

      {filter && <Icons.Close onClick={clearInput} css={style.clear} />}
    </label>
  );
};

export default SearchBox;
