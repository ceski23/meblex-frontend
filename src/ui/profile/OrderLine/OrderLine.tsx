import React, { FC, ReactElement } from 'react';
import { styled } from 'theme';
import { OrderLine as OrderLineType } from 'store/orders/types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 20px;
`;

const Data = styled.div`

`;

const Details = styled.div`
`;

const Name = styled.h4`
  margin-bottom: 10px;
`;

const Property = styled.p`
  margin-right: 10px;
`;

const Value = styled.h4`
  line-height: 1.4em;
`;

const Pair = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

interface Props {
  data: OrderLineType;
}

export const OrderLine: FC<Props> = ({
  data,
}): ReactElement => (
  <Container>
    <Image src={`${process.env.REACT_APP_IMAGES_URL}${data.pieceOfFurniture && data.pieceOfFurniture.photos[0]}`} />
    <Data>
      <Name>{data.pieceOfFurniture ? data.pieceOfFurniture.name : data.part.name}</Name>
      <Details>
        <Pair>
          <Property>Rozmiar:</Property>
          <Value>105 x 34 x 102</Value>
        </Pair>
        <Pair>
          <Property>Rozmiar:</Property>
          <Value>105 x 34 x 102</Value>
        </Pair>
        <Pair>
          <Property>Rozmiar:</Property>
          <Value>105 x 34 x 102</Value>
        </Pair>
      </Details>
    </Data>
  </Container>
);
