import React, {
 FC, ReactElement, useEffect, useState,
} from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components/macro';
import { Loading } from 'ui/shared/Loading';
import { useReduxDispatch } from 'hooks';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { getProduct } from 'store/products/actions';
import { ImagesCarousel } from 'ui/shared/ImagesCarousel';
import { Button } from 'ui/shared/Button';
import { transparentize } from 'polished';
import { forTabletLandscapeUp } from 'theme';
import { currencyFormatter } from 'utils/formatters';
import ReactMarkdown from 'react-markdown';
import { ReactComponent as DiscountIcon } from 'assets/discount.svg';
import { ReactComponent as AddToCart } from 'assets/add_to_cart.svg';
import { ReactComponent as FitterAdd } from 'assets/fitter_add.svg';
import { toast } from 'utils/toaster';
import { Material, Color, Pattern } from 'store/products/types';
import { IncDecInput } from '../IncDecInput';
import { ResourceBox } from '../ResourceBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const Bluebox = styled.div`
  margin: 30px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  padding: 30px;
  box-shadow: 6px 8px 30px 0px ${({ theme }) => transparentize(0.8, theme.colors.black)};
  display: flex;
  flex-direction: column;
  ${forTabletLandscapeUp()} {
    width: 70%;
    margin: 30px auto;
  }
`;

const BlueboxTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};  
  margin-bottom: 20px;
`;

const BlueboxText = styled.p`
  color: ${({ theme }) => transparentize(0.3, theme.colors.white)};
  margin-bottom: 40px;
`;

const ProductNumber = styled.p`
  font-size: .8em;
`;

const ProductName = styled.h2`
  margin-bottom: 10px;
`;

const BlueboxButton = styled(Button)`
  border-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  margin: 0 auto;
`;

const Header = styled.div`
  margin: 30px 30px 0;
`;

const Prices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
  margin: 10px 30px 50px;
`;

const MainPrice = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2em;
`;

const OldPrice = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: line-through;
  font-size: 1em;
`;

const Description = styled.div`
  margin: 30px;
  & > p {
    margin-bottom: 15px;
    text-align: justify;
  }
  & > p > strong {
    color: ${({ theme }) => theme.colors.textDark};    
  }
`;

const SubTitle = styled.h2`
  margin: 30px 30px 0;
`;


// const pulse = keyframes`
//   0% {
//       transform: scale(0.98);
//       box-shadow: 0 0 0 0 rgba(0,105,255, 0.7);
//   }

//   70% {
//       transform: scale(1);
//       box-shadow: 0 0 0 10px rgba(0,105,255, 0);
//   }

//   100% {
//       transform: scale(0.98);
//       box-shadow: 0 0 0 0 rgba(0,105,255, 0);
//   }
// `;

const X = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 10px 20px;
  margin: 20px 30px 20px;
  border-radius: 20px;
  box-shadow: 6px 8px 30px 0px ${({ theme }) => transparentize(0.8, theme.colors.black)};
  text-align: center;
  display: flex;
`;

const XX = styled.h5`
  color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;

const XXX = styled(DiscountIcon)`
  fill: ${({ theme }) => theme.colors.white};
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin: 10px 0;
`;

const AddToCartIcon = styled(AddToCart)`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  fill: ${({ theme }) => theme.colors.white};
`;

const FitterAddIcon = styled(FitterAdd)`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  fill: ${({ theme }) => theme.colors.primary};
`;

const QuantityInput = styled(IncDecInput)`
  margin: 20px 30px 0;
`;

const ResourcesRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 40px 30px;
  overflow: auto;
  margin-top: -10px;
  & > * {
    flex-shrink: 0;
    margin: 0 20px;
  }
  & > *:first-child {
    margin-left: 0;
  }
  & > *:last-child {
    margin-right: 0;
  }
  &::after {
    content: ' ';
    min-width: 30px;
  }
`;


interface MatchProps {
  productId: string;
}

export const ProductPage: FC<RouteComponentProps<MatchProps>> = ({ match }): ReactElement => {
  const { productId } = match.params;
  const dispatch = useReduxDispatch();
  const { data: { product }, status } = useSelector(({ products }: AppState) => products);
  const [quantity, setQuantity] = useState(1);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    if (product) {
      const mats = { [product.material.materialId]: product.material };
      product.parts.forEach(part => {
        mats[part.material.materialId] = part.material;
      });
      setMaterials(Object.values(mats));

      const cols = { [product.color.colorId]: product.color };
      product.parts.forEach(part => {
        cols[part.color.colorId] = part.color;
      });
      setColors(Object.values(cols));

      const pats = { [product.pattern.patternId]: product.pattern };
      product.parts.forEach(part => {
        pats[part.pattern.patternId] = part.pattern;
      });
      setPatterns(Object.values(pats));
    }
  }, [product]);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const handleFitterAdd = (): void => {
    // TODO: Add proper click handling
    toast(`Dodano ${quantity} produkt(ów) do FITTER™`);
  };

  return (
    <Container>
      <Loading isLoading={status.isLoading}>
        {product && (
        <>
          <Header>
            <ProductName>{product.name}</ProductName>
            <ProductNumber>Numer produktu: {product.id}</ProductNumber>
          </Header>

          <ImagesCarousel
            name={product.name}
            images={product.photos.map(photo => ({
              url: `${process.env.REACT_APP_IMAGES_URL}${photo}`,
            }))}
          />

          <X>
            <XXX />
            <XX>Promocja "Twój dom — twoje zasady"</XX>
          </X>

          <Prices>
            <OldPrice>{currencyFormatter.format(product.price)}</OldPrice>
            <MainPrice>{currencyFormatter.format(product.price)}</MainPrice>
          </Prices>

          <QuantityInput value={quantity} setValue={setQuantity} />

          <Box>
            <StyledButton>
              <AddToCartIcon />Dodaj do koszyka
            </StyledButton>
            <StyledButton variant="secondary" onClick={handleFitterAdd}>
              <FitterAddIcon />Dodaj do FITTER™
            </StyledButton>
          </Box>

          <SubTitle>Opis produktu</SubTitle>
          <Description>
            <ReactMarkdown source={product.description} />
          </Description>

          <SubTitle>Wykorzystane materiały</SubTitle>
          <ResourcesRow>
            {materials.map(({ materialId, name, photo }) => (
              <ResourceBox key={materialId} name={name} photo={photo} />
            ))}
          </ResourcesRow>

          <SubTitle>Kolory</SubTitle>
          <ResourcesRow>
            {colors.map(({ colorId, name, hexCode }) => (
              <ResourceBox key={colorId} name={name} color={hexCode} />
            ))}
          </ResourcesRow>

          <SubTitle>Wzory</SubTitle>
          <ResourcesRow>
            {patterns.map(({ patternId, name, photo }) => (
              <ResourceBox key={patternId} name={name} photo={photo} />
            ))}
          </ResourcesRow>

          <Bluebox>
            <BlueboxTitle>Nie pasuje Ci rozmiar tego mebla?</BlueboxTitle>
            <BlueboxText>Wyślij zapytanie, a nasi konsultanci sprawdzą czy możesz go dostać w innym rozmiarze</BlueboxText>
            <BlueboxButton variant="secondary">Wyślij zapytanie</BlueboxButton>
          </Bluebox>
        </>
      )}
      </Loading>
    </Container>
  );
};
