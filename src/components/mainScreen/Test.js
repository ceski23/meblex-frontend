import React from 'react';
import S from './Test.module.scss';
import ItemResult from './ItemResult';
import furniture from '../../meble.json';
import NoItem from '../productScreen/NoItem';

const Test = ({ match: { params } }) => {
  const list = furniture.filter(x => x.category.toLowerCase() === params.category);
  return (
    <React.Fragment>
      {list.length > 0 && (
        <div className={S.results}>
          {list.map((elem, i) => <ItemResult data={elem} key={i} />)}
        </div>
      )}
      {list.length === 0 && <NoItem />}
    </React.Fragment>
  );
};

export default Test;
