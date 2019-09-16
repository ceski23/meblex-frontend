import React, { FC, ReactElement, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Loading } from 'ui/shared/Loading';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { useReduxDispatch } from 'hooks';
import { getOrders } from 'store/orders/actions';
import { Link } from 'react-router-dom';
import { PROFILE_ORDERS } from 'constants/routing';
import { Order } from '../Order/Order';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const OrdersPage: FC = (): ReactElement => {
  const { data, status } = useSelector(({ orders }: AppState) => orders);
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // TODO: Add empty state
  return (
    <Container>
      <Loading isLoading={status.isLoading}>
        {data.orders.map(order => (
          <StyledLink to={`${PROFILE_ORDERS}/${order.orderId}`} key={order.orderId}>
            <Order key={order.orderId} order={order} />
          </StyledLink>
        ))}
      </Loading>
    </Container>
  );
};
