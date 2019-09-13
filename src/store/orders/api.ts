import { api } from 'apiService';
import { SERVER_ERROR } from 'constants/Api';
import { Order } from './types';

export const getOrders = (): Promise<Order[]> => api
  .get('ShoppingCart/client/list')
  .then(({ data }) => data);

export const getOrder = (id: string): Promise<Order> => api
  .get(`ShoppingCart/client/list/${id}`)
  .then(({ data }) => data)
  .catch(error => {
    Promise.reject(error === SERVER_ERROR ? error : error.response.data);
  });
