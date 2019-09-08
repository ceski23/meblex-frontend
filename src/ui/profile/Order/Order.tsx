import React, { FC, ReactElement } from 'react';
import { Panel } from 'ui/shared/Panel';
import { styled } from 'theme';
import { Order as OrderType } from 'store/orders/types';
import { OrderLine } from '../OrderLine';

const OrderNumber = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h4`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const StyledPanel = styled(Panel)`
  margin: 20px;
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
  margin-bottom: 10px;
  margin-right: 30px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface Props {
  order: OrderType;
}

export const Order: FC<Props> = ({ order }): ReactElement => (
  <StyledPanel>
    <Title>Zamówienie <OrderNumber>#{order.orderId}</OrderNumber></Title>
    <Details>
      <Pair>
        <Property>Data:</Property>
        <Value>21.05.2019</Value>
      </Pair>
      <Pair>
        <Property>Status:</Property>
        <Value>ZAKOŃCZONE</Value>
      </Pair>
      <Pair>
        <Property>Kwota:</Property>
        <Value>10 998,00 zł</Value>
      </Pair>
    </Details>
    {/* {order.orderLines.map(orderLine => (
      <OrderLine key={orderLine.orderLineId} data={orderLine} />
    ))} */}
  </StyledPanel>
);
