/** @jsx jsx */

import React, { useRef, useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import Breadcrumbs from '../shared/Breadcrumbs';
import PartsBox from './PartsBox';
import { useTheme } from '../../helpers';
import ProductInfo from './ProductInfo';
import * as API from '../../api';
import LoadingSpinner from '../shared/LoadingSpinner';

// TODO: Add product color/pattern/material


const Product = ({ match: { params } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  // const product = {
  //   id: 16,
  //   name: 'awdawd',
  //   count: 2323,
  //   price: 3.23,
  //   size: '32x34x390',
  //   description: '23',
  //   category: {
  //     categoryId: 6,
  //     name: 'Półki',
  //   },
  //   room: {
  //     roomId: 5,
  //     name: 'Jadalnia',
  //   },
  //   parts: [],
  //   photos: [
  //     '8214490473d9bb6cf6596361715a6632.png',
  //     '5ae29ea7810332c796827edb1b03386f.jpg',
  //   ],
  //   material: {
  //     materialId: 7,
  //     name: 'Karton',
  //     slug: 'karton',
  //     photo: 'Castle.Proxies.MaterialPhotoProxy',
  //   },
  //   pattern: {
  //     patternId: 2,
  //     name: 'W kropki',
  //     slug: 'kropk',
  //     photo: null,
  //   },
  //   color: {
  //     colorId: 6,
  //     name: 'Niebieski',
  //     hexCode: '#0000FF',
  //     slug: '',
  //   },
  // };

  // const product = {
  //   id: 1,
  //   name: 'Krzesło FLORIDA',
  //   count: 14,
  //   price: 420.0,
  //   size: '47x48x104',
  //   description: '**Krzesło FLORIDA** zwraca uwagę stylizacją retro oraz ozdobnym pikowaniem na powierzchni oparcia. To idealny mebel by podkreślić szyk i elegancję wnętrza. Przeznaczone do gabinetu domowego lub salonu Krzesło **FLORIDA** zwraca uwagę gustownym wykonaniem i wykończeniem. Najlepiej prezentuje się w przestronnych pomieszczeniach, które w pełni mogą wyeksponować jego walory dekoracyjne.\n\nDoskonale komponuje się z meblami i dodatkami dekoracyjnymi w stylu industrialnym lub klasycznym. **FLORIDA** jest krzesłem komfortowym. W siedzisku zostały umieszczone sprężyny faliste, które w połączeniu z pianką sprawiają, że jest ono bardzo miękkie i wygodne. Za sprężystość oparcia odpowiadają pasy tapicerskie oraz piankowe wypełnienie. Stelaż wykonany z drewna bukowego gwarantuje trwałość mebla oraz nadaje jego wyglądowi estetyki i dyskretnej elegancji.\n\n**Wykończenie**  \nTkanina **INARI** użyta do obicia mebla to materiał grubo tkany o fakturze zbliżonej do lnu. Świetnie sprawdza się pod kątem aranżacyjnym. Nogi krzesła są lakierowane, wykonane są z drewna bukowego.',
  //   room: {
  //     id: 0, name: 'Do salonu', slug: 'do-salonu',
  //   },
  //   category: {
  //     id: 1, name: 'Krzesła', slug: 'biurka',
  //   },
  //   photos: [
  //     { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-5.jpg' },
  //     { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-6.jpg' },
  //     { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-8.jpg' },
  //     { path: 'https://www.agatameble.pl/media/cache/gallery/images/13/136296/2133-013-002-101-0001-p-7.jpg' },
  //   ],
  //   parts: [
  //     {
  //       id: 1,
  //       name: 'Siedzisko',
  //       count: 4,
  //       price: 666,
  //       material: {
  //         name: 'Tkanina',
  //         id: 2,
  //       },
  //       color: {
  //         id: 1,
  //         name: 'Jasny szary',
  //         hex_code: '#d3d3d3',
  //       },
  //     },
  //     {
  //       id: 2,
  //       name: 'Oparcie',
  //       count: 4,
  //       price: 666,
  //       material: {
  //         name: 'Tkanina',
  //         id: 2,
  //       },
  //       color: {
  //         id: 1,
  //         name: 'Jasny szary',
  //         hex_code: '#d3d3d3',
  //       },
  //     },
  //     {
  //       id: 3,
  //       name: 'Noga',
  //       count: 4,
  //       price: 666,
  //       material: {
  //         name: 'Drewno bukowe',
  //         id: 1,
  //       },
  //       color: {
  //         id: 2,
  //         name: 'Biały',
  //         hex_code: '#ffffff',
  //       },
  //     },
  //   ],
  // };

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

    loading: css`
      width: 50px;
      height: 50px;

      circle {
        stroke: ${theme.colors.primary};
      }
    `,

    loadingWrapper: css`
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    `,
  };

  useEffect(() => {
    const fetchPoF = async () => {
      setIsLoading(true);
      try {
        const res = await API.getPieceOfFurniture(params.product);
        setProduct({ ...res,
          material: {
            materialId: 7,
            name: 'Karton',
            slug: 'karton',
            photo: '82a77b91f4ba86463e95511825190d89.jpg',
          },
          pattern: {
            patternId: 2,
            name: 'W kropki',
            slug: 'kropk',
            photo: '82a77b91f4ba86463e95511825190d89.jpg',
          },
          color: {
            colorId: 6,
            name: 'Niebieski',
            hexCode: '#0000FF',
            slug: '',
          } });
      } catch (err) {
        //
      } finally {
        setIsLoading(false);
      }
    };
    fetchPoF();
  }, [params.product]);

  return (
    <React.Fragment>
      {isLoading ? (
        <div css={style.loadingWrapper}>
          <LoadingSpinner css={style.loading} isLoading={isLoading} />
        </div>
      ) : (
        <React.Fragment>
          <Breadcrumbs paths={[
            { name: product.room.name, url: `/katalog?pokoj=${product.room.roomId}` },
            { name: product.category.name, url: `/katalog?pokoj=${product.room.roomId}&kategoria=${product.category.categoryId}` },
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

            {product.parts.length > 0 && (
              <PartsBox parts={product.parts} />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Product;
