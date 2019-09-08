import React, { FC, ReactElement, useEffect } from 'react';
import { styled } from 'theme';
import { Loading } from 'ui/shared/Loading';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { RouteComponentProps } from '@reach/router';
import { useReduxDispatch } from 'hooks';
import { getOrders } from 'store/orders/actions';
import { Order } from '../Order/Order';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const OrdersPage: FC<RouteComponentProps> = (): ReactElement => {
  const { data, status } = useSelector(({ orders }: AppState) => orders);
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // TODO: Add empty state
  return (
    <Container>
      <Loading isLoading={status.isLoading}>
        {data.orders.map(order => <Order key={order.orderId} order={order} />)}
      </Loading>
    </Container>
  );
};
