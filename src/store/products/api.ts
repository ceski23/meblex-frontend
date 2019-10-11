import { api } from 'apiService';
import { SERVER_ERROR } from 'constants/Api';
import { PieceOfFurniture } from './types';

export const getProduct = (id: string): Promise<PieceOfFurniture> => api
  .get(`Furniture/pieceOfFurniture/${id}`)
  .then(({ data }) => data)
  .catch(error => {
    Promise.reject(error === SERVER_ERROR ? error : error.response.data);
  });
