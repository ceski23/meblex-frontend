import { Category } from 'store/types';
import { ordersReducer } from './reducer';

export interface PieceOfFurniture {
  pieceOfFurnitureId: number;
  name: string;
  photos: string[];
}

export interface Part {
  pieceOfFurnitureId: number;
  partId: number;
  name: string;
  category: Category;
}

export interface OrderLine {
  orderLineId: number;
  count: number;
  price: number;
  size: string;
  pieceOfFurniture: PieceOfFurniture;
  part: Part;
}

export interface Order {
  orderId: number;
  transactionId: string;
  delivery: 'courier';
  reservation: boolean;
  address: string;
  state: string;
  city: string;
  postCode: number;
  orderLines: OrderLine[];
}

export interface State {
  orders: Order[];
  order?: Order;
}

export type OrdersState = ReturnType<typeof ordersReducer>
