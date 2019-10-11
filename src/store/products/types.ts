import { Category, Room } from 'store/types';
import { productsReducer } from './reducer';

export interface PieceOfFurniture {
  id: string;
  name: string;
  count: number;
  price: number;
  size: string;
  description: string;
  category: Category;
  room: Room;
  parts: Part[];
  photos: string[];
  pattern: Pattern;
  color: Color;
  material: Material;
}

export interface Part {
  pieceOfFurnitureId: string;
  partId: number;
  name: string;
  count: number;
  price: number;
  pattern: Pattern;
  color: Color;
  material: Material;
}

export interface Pattern {
  patternId: number;
  name: string;
  slug: string;
  photo: string;
}

export interface Color {
  colorId: number;
  name: string;
  slug: string;
  hexCode: string;
}

export interface Material {
  materialId: number;
  name: string;
  slug: string;
  photo: string;
}

export interface State {
  product?: PieceOfFurniture;
}

export type ProductsState = ReturnType<typeof productsReducer>
