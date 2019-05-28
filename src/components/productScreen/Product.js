/** @jsx jsx */

import React, { useRef } from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import Breadcrumbs from '../shared/Breadcrumbs';
import PartsBox from './PartsBox';
import { useTheme } from '../../helpers';
import ProductInfo from './ProductInfo';


const Product = () => {
  const product = {
    id: 1,
    name: 'Krzesło FLORIDA',
    count: 14,
    price: 420.0,
    size: '47x48x104',
    description: '**Krzesło FLORIDA** zwraca uwagę stylizacją retro oraz ozdobnym pikowaniem na powierzchni oparcia. To idealny mebel by podkreślić szyk i elegancję wnętrza. Przeznaczone do gabinetu domowego lub salonu Krzesło **FLORIDA** zwraca uwagę gustownym wykonaniem i wykończeniem. Najlepiej prezentuje się w przestronnych pomieszczeniach, które w pełni mogą wyeksponować jego walory dekoracyjne.\n\nDoskonale komponuje się z meblami i dodatkami dekoracyjnymi w stylu industrialnym lub klasycznym. **FLORIDA** jest krzesłem komfortowym. W siedzisku zostały umieszczone sprężyny faliste, które w połączeniu z pianką sprawiają, że jest ono bardzo miękkie i wygodne. Za sprężystość oparcia odpowiadają pasy tapicerskie oraz piankowe wypełnienie. Stelaż wykonany z drewna bukowego gwarantuje trwałość mebla oraz nadaje jego wyglądowi estetyki i dyskretnej elegancji.\n\n**Wykończenie**  \nTkanina **INARI** użyta do obicia mebla to materiał grubo tkany o fakturze zbliżonej do lnu. Świetnie sprawdza się pod kątem aranżacyjnym. Nogi krzesła są lakierowane, wykonane są z drewna bukowego.',
    room: {
      id: 0, name: 'Do salonu', slug: 'do-salonu',
    },
    category: {
      id: 1, name: 'Krzesła', slug: 'biurka',
    },
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
          id: 1,
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
          id: 1,
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
          id: 2,
          name: 'Biały',
          hex_code: '#ffffff',
        },
      },
    ],
  };

  const refe = useRef();
  const theme = useTheme();

  const style = {
    product: css`
      display: flex;
      flex-direction: column;
      background: #fff;
      margin-bottom: 20px;

      & > h3 {
        padding: 20px 30px 0;
        margin: 0;
      }
    `,

    id: css`
      padding: 0px 30px;
      color: ${theme.colors.text};
      font-size: .8em;
      opacity: .7;
    `,

    images: css`
      background: ${theme.colors.background};
      scroll-snap-type: x mandatory;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      height: 350px;
      position: relative;
    `,

    image: css`
      object-fit: contain;
      scroll-snap-align: start;
      width: 100%;
      padding: 0 20px;
    `,

    freeShipping: css`
      font-size: .8em;
      padding: 0;
      margin: 0;
    `,

    customSizeBox: css`
      margin: 20px 0;
      padding: 30px;
      background: ${theme.colors.primary};
      text-align: center;

      h4 {
        margin: 0;
        padding: 0;
        color: #fff;
        margin-bottom: 20px;
      }

      p {
        color: rgba(255, 255, 255, .8);
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
        text-align: justify;
      }
    `,

    customSizeButton: css`
      color: #fff !important;
      border-color: white !important;
    `,
  };

  return (
    <React.Fragment>
      <Breadcrumbs paths={[
        { name: product.room.name, url: `/katalog?pokoj=${product.room.slug}` },
        { name: product.category.name, url: `/katalog?pokoj=${product.room.slug}&kategoria=${product.category.slug}` },
        { name: product.name },
      ]}
      />

      <div css={style.product}>
        <h3>{product.name}</h3>
        <p css={style.id}>Numer produktu: {product.id}</p>

        <div css={style.images} ref={refe}>
          {product.photos.map((photo, i) => (
            <img src={photo.path} alt={i} key={i} css={style.image} />
          ))}
        </div>

        <ProductInfo product={product} />

        <div css={style.customSizeBox}>
          <h4>Nie pasuje Ci rozmiar tego mebla?</h4>
          <p>Wyślij zapytanie, a nasi konsultanci sprawdzą czy możesz go dostać w innym rozmiarze</p>
          <Button
            component={Link}
            to={{
              pathname: '/niestandardowy',
              state: { item: product },
            }}
            variant="secondary"
            css={style.customSizeButton}
          >Wyślij zapytanie
          </Button>
        </div>

        <PartsBox parts={product.parts} />
      </div>
    </React.Fragment>
  );
};

export default Product;
