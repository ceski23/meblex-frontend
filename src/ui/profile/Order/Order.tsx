import React, { FC, ReactElement } from 'react';
import { Panel } from 'ui/shared/Panel';
import { forTabletLandscapeUp } from 'theme';
import { Order as OrderType } from 'store/orders/types';
import { ReactComponent as OrderIcon } from 'assets/order.svg';
import { currencyFormatter } from 'utils/formatters';
import {
 ORDER, DATE, STATUS, TOTAL_AMOUNT,
} from 'constants/Profile';
import styled from 'styled-components/macro';

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

const Cost = styled(Value)`
  color: ${({ theme }) => theme.colors.primary};
`;

const Pair = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 30px;
  margin-bottom: 10px;
  ${forTabletLandscapeUp()} {
    margin-bottom: 0;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled(OrderIcon)`
  width: 50px;
  height: 50px;
  margin-right: 30px;
  fill: ${({ theme }) => theme.colors.text};
`;

interface Props {
  order: OrderType;
}

const computeTotalCost = (order: OrderType): number => (
  order.orderLines.reduce((prev, curr) => (curr.price * curr.count) + prev, 0)
);

export const Order: FC<Props> = ({ order }): ReactElement => (
  <StyledPanel>
    <Wrapper>
      <Icon />
      <Data>
        <Title>{ORDER} <OrderNumber>#{order.orderId}</OrderNumber></Title>
        <Details>
          <Pair>
            <Property>{DATE}:</Property>
            <Value>21.05.2019</Value>
            {/* // TODO: Add real date */}
          </Pair>
          <Pair>
            <Property>{STATUS}:</Property>
            <Value>ZAKOŃCZONE</Value>
            {/* // TODO: Add real status */}
          </Pair>
          <Pair>
            <Property>{TOTAL_AMOUNT}:</Property>
            <Cost>{currencyFormatter.format(computeTotalCost(order))}</Cost>
          </Pair>
        </Details>
      </Data>
    </Wrapper>
  </StyledPanel>
  );
