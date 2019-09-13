import React, { FC, ReactElement, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { getOrderDetails } from 'store/orders/actions';
import { useReduxDispatch } from 'hooks';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { styled, forTabletPortraitUp, forTabletLandscapeUp } from 'theme';
import { Loading } from 'ui/shared/Loading';
import { Panel } from 'ui/shared/Panel';
import { Order as OrderType } from 'store/orders/types';
import { Tile } from 'ui/shared/Tile';
import { ReactComponent as OrderIcon } from 'assets/order.svg';
import { ReactComponent as DeliveryIcon } from 'assets/delivery.svg';
import { ReactComponent as PaymentIcon } from 'assets/payment.svg';
import { currencyFormatter } from 'utils/formatters';
import { Link } from 'react-router-dom';
import { categoryIcon } from 'utils/fallbackImages';
import {
 ORDER, ORDER_DATE, RESERVATION, YES, NO, STATUS, PAYMENT, METHOD,
 DELIVERY, PRODUCTS, ITEM_PRICE, ITEMS_AMOUNT, PIECE_OF_FURNITURE, SIZE_CM,
} from 'constants/Profile';
import { CATALOG } from 'constants/routing';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: .8em;
  margin-bottom: 40px;
  ${forTabletLandscapeUp()} {
    font-size: 1em;
  }
`;

const StyledPanel = styled(Panel)`
  flex: 1;
  margin: 20px;
  ${forTabletPortraitUp()} {
    margin: 20px 40px;
  }
`;

const Colored = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const OrderLines = styled(Row)`
  justify-content: unset;
`;

const StyledTile = styled(Tile)`
  margin-right: 0;
  ${forTabletPortraitUp()} {
    margin-right: 50px;
  }
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Total = styled.h3`
  text-align: right;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

interface MatchParams {
  orderId: string;
}

const totalCost = (order: OrderType): number => (
  order.orderLines.reduce((prev, curr) => (curr.price * curr.count) + prev, 0)
);

export const SingleOrder: FC<RouteComponentProps<MatchParams>> = ({
  match,
}): ReactElement => {
  const { orderId } = match.params;
  const dispatch = useReduxDispatch();
  const { data, status } = useSelector(({ orders }: AppState) => orders);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <Container>
      <Loading isLoading={status.isLoading}>
        {data.order && (
          <StyledPanel title={<span>{ORDER} <Colored>{`#${orderId}`}</Colored></span>}>
            {/* TODO: Add error state */}
            <Row>
              <Tile
                title="Informacje"
                data={[
                { name: ORDER_DATE, value: '21.05.2019' }, // TODO: Add real date
                { name: RESERVATION, value: data.order.reservation ? YES : NO },
                { name: STATUS, value: 'ZAKOŃCZONE' }, // TODO: Add real status
              ]}
                icon={OrderIcon}
              />
              <Tile
                title={PAYMENT}
                data={[
                { name: METHOD, value: 'PayU' }, // TODO: Add real method
                { name: STATUS, value: 'OPŁACONE' }, // TODO: Add real status
              ]}
                icon={PaymentIcon}
              />
              <Tile
                title={DELIVERY}
                data={[
                { name: METHOD, value: 'Paczkomat' }, // TODO: Add real method
                { name: STATUS, value: 'DOSTARCZONE' }, // TODO: Add real status
              ]}
                icon={DeliveryIcon}
              />
            </Row>

            <SectionTitle>{PRODUCTS}:</SectionTitle>
            <OrderLines>
              {data.order && data.order.orderLines.map(orderLine => {
                const pieceOfFurnitureId = orderLine.pieceOfFurniture
                  ? orderLine.pieceOfFurniture.pieceOfFurnitureId
                  : orderLine.part.pieceOfFurnitureId;

                const productName = orderLine.pieceOfFurniture
                  ? orderLine.pieceOfFurniture.name
                  : orderLine.part.name;

                // TODO: Fix category hack
                const productCategoryId = orderLine.pieceOfFurniture
                  ? 1
                  : orderLine.part.category.categoryId;
                return (
                  <StyledLink key={orderLine.orderLineId} to={`${CATALOG}/${pieceOfFurnitureId}`}>
                    <StyledTile
                      row
                      title={productName}
                      data={[
                      orderLine.pieceOfFurniture
                        ? { name: SIZE_CM, value: orderLine.size.split('x').join(' x ') }
                        : { name: PIECE_OF_FURNITURE, value: '☹️' }, // TODO: Add real PoF name
                      { name: ITEMS_AMOUNT, value: orderLine.count },
                      { name: ITEM_PRICE, value: currencyFormatter.format(orderLine.price) },
                    ]}
                      image={`${process.env.REACT_APP_IMAGES_URL}${orderLine.pieceOfFurniture && orderLine.pieceOfFurniture.photos[0]}`}
                      fallbackIcon={categoryIcon('id', productCategoryId)}
                    />
                  </StyledLink>
                );
              })}
            </OrderLines>

            <Total>Razem:&nbsp;&nbsp;
              <Colored>{currencyFormatter.format(totalCost(data.order))}</Colored>
            </Total>
          </StyledPanel>
        )}
      </Loading>
    </Container>
  );
};
