import { api } from 'apiService';
import { Order } from './types';

export const getOrders = (): Promise<Order[]> => api
  .get('ShoppingCart/client/list')
  .then(({ data }) => data);
