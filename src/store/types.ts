import { rootReducer } from './reducer';

// TODO: Move those types anywhere
export interface Category {
  categoryId: number;
  name: string;
}

export interface Room {
  roomId: number;
  name: string;
}

export type AppState = ReturnType<typeof rootReducer>
