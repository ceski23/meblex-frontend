import React from 'react'
import S from '../styles/NotFound.module.scss'
import HikingTraveller from '../assets/hiking_traveller.svg'
import Button from '../components/Button'


const NotFound = ({ history }) => {
  const handleClick = () => history.goBack();

  return (
    <div className={S.container}>
      <img src={HikingTraveller} className={S.image} alt="" />
      <h3 className={S.title}>Dotarłeś na koniec świata</h3>
      <span>Co dalej?</span>
      <Button className={S.goBack} handleClick={handleClick}>Wróć</Button>
    </div>
  )
}

export default NotFound;