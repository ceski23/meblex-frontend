import React from 'react';
import { withRouter } from 'react-router';
import S from './NoItem.module.scss';
import Storage from '../../assets/storage.svg';
import Button from './Button';


const NoItem = ({ history }) => {
  const handleClick = () => history.goBack();

  return (
    <div className={S.container}>
      <img src={Storage} className={S.image} alt="" />
      <h3 className={S.title}>Nie mamy takich mebli w naszym magazynie</h3>
      <Button className={S.goBack} handleClick={handleClick}>Wróć</Button>
    </div>
  );
};

export default withRouter(NoItem);
