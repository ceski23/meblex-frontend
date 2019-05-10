import React, { useRef, useState } from 'react';
import { useActions } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import S from './Product.module.scss';
import Button from '../shared/Button';
import Breadcrumbs from '../shared/Breadcrumbs';
import { addItemsToCart } from '../../redux/cart';
import PartsBox from './PartsBox';
import ResourcesBox from './ResourcesBox';


const Product = () => {
  const product = {
    id: 1,
    name: 'Krzesło FLORIDA',
    count: 14,
    price: 420.0,
    size: '47x48x104',
    description: '**Krzesło FLORIDA** zwraca uwagę stylizacją retro oraz ozdobnym pikowaniem na powierzchni oparcia. To idealny mebel by podkreślić szyk i elegancję wnętrza. Przeznaczone do gabinetu domowego lub salonu Krzesło **FLORIDA** zwraca uwagę gustownym wykonaniem i wykończeniem. Najlepiej prezentuje się w przestronnych pomieszczeniach, które w pełni mogą wyeksponować jego walory dekoracyjne.\n\nDoskonale komponuje się z meblami i dodatkami dekoracyjnymi w stylu industrialnym lub klasycznym. **FLORIDA** jest krzesłem komfortowym. W siedzisku zostały umieszczone sprężyny faliste, które w połączeniu z pianką sprawiają, że jest ono bardzo miękkie i wygodne. Za sprężystość oparcia odpowiadają pasy tapicerskie oraz piankowe wypełnienie. Stelaż wykonany z drewna bukowego gwarantuje trwałość mebla oraz nadaje jego wyglądowi estetyki i dyskretnej elegancji.\n\n**Wykończenie**  \nTkanina **INARI** użyta do obicia mebla to materiał grubo tkany o fakturze zbliżonej do lnu. Świetnie sprawdza się pod kątem aranżacyjnym. Nogi krzesła są lakierowane, wykonane są z drewna bukowego.',
    room_id: 0,
    category_id: 0,
    photos: [
      { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-5.jpg' },
      { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-6.jpg' },
      { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-8.jpg' },
      { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-7.jpg' },
    ],
    parts: [
      {
        id: 1,
        name: 'Siedzisko',
        count: 4,
        price: 666,
        material: {
          name: 'Tkanina',
          id: 2,
        },
        color: {
          name: 'Jasny szary',
          hex_code: '#d3d3d3',
        },
      },
      {
        id: 2,
        name: 'Oparcie',
        count: 4,
        price: 666,
        material: {
          name: 'Tkanina',
          id: 2,
        },
        color: {
          name: 'Jasny szary',
          hex_code: '#d3d3d3',
        },
      },
      {
        id: 3,
        name: 'Noga',
        count: 4,
        price: 666,
        material: {
          name: 'Drewno bukowe',
          id: 1,
        },
        color: {
          name: 'Biały',
          hex_code: '#ffffff',
        },
      },
    ],
  };

  const refe = useRef();
  const [amount, setAmount] = useState(1);
  const addToCart = useActions(item => addItemsToCart(item));

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };


  const addPoF = () => {
    if (parseInt(amount, 10)) {
      addToCart({ amount: parseInt(amount, 10) });
    }
  };

  const paths = [
    { name: 'Do salonu', url: '/katalog/do-salonu' },
    { name: 'Krzesła', url: '/katalog/do-salonu/krzesla' },
    { name: 'Krzesło FLORIDA' },
  ];

  return (
    <React.Fragment>
      <Breadcrumbs paths={paths} />

      <div className={S.product}>
        <h3 className={S.name}>{product.name}</h3>
        <p className={S.id}>Numer produktu: {product.id}</p>

        <div className={S.images} ref={refe}>
          {product.photos.map((photo, i) => (
            <img src={photo.path} alt={i} key={i} className={S.image} />
          ))}
        </div>

        <div className={S.info}>
          <div className={S.priceBox}>
            <h3>Cena:</h3>
            <div>
              <p className={S.price}>{product.price} zł</p>
              <p className={S.freeShipping}>+ Darmowa wysyłka!</p>
            </div>
          </div>

          <div className={S.buyBox}>
            <input type="number" value={amount} onChange={handleAmountChange} className={S.amount} />
            <Button className={S.addToCart} handleClick={addPoF}>Dodaj do koszyka</Button>
          </div>

          <div className={S.descBox}>
            <h3 className={S.title}>Opis</h3>
            <div className={S.desc}>
              <ReactMarkdown source={product.description} />
            </div>
          </div>

          <ResourcesBox title="Materiały" type="material" parts={product.parts} />
          <ResourcesBox title="Kolory" type="color" parts={product.parts} />

          <div className={S.sizesBox}>
            <h3 className={S.title}>Wymiary</h3>
            {['Szerokość', 'Głębokość', 'Wysokość'].map((dimension, i) => (
              <span className={S.size}>
                <p>{dimension}:</p>
                <b>{product.size.split('x')[i]} cm</b>
              </span>
            ))}
          </div>
        </div>

        <div className={S.customSizeBox}>
          <h4>Nie pasuje Ci rozmiar tego mebla?</h4>
          <p>Wyślij zapytanie, a nasi konsultanci sprawdzą czy możesz go dostać w innym rozmiarze</p>
          <Button type="secondary" className={S.button}>Wyślij zapytanie</Button>
        </div>

        <PartsBox parts={product.parts} />
      </div>
    </React.Fragment>
  );
};

export default Product;
