import { userReducer } from './reducer';

export interface User {
  email: string;
  name: string;
  address: string;
  state: string;
  city: string;
  postCode: string;
  nip: string;
  role: string;
}

export interface State {
  user?: User;
}

export type UserState = ReturnType<typeof userReducer>
