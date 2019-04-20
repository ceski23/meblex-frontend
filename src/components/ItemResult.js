import React from 'react'
import S from '../styles/ItemResult.module.scss'

const ItemResult = ({ data }) => (
  <div className={S.result}>
    <div className={S.img}>
      <img src={data.photos[0]} className={S.image} alt="" />
    </div>
    <div className={S.info}>
      <h4 className={S.name}>{data.name}</h4>
    </div>
    <h3 className={S.price}>{data.price}<span className={S.currency}>zł</span></h3>
  </div>
)

export default ItemResult;