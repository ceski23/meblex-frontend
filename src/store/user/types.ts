import { userReducer } from './reducer';

export type User = UserData & {
  id: string;
  email: string;
  role: Role;
  confirmed: true;
}

export interface Role {
  name: string;
  description: string;
}

export interface UserData {
  name: string;
  address: string;
  state: string;
  city: string;
  postCode: string;
  nip: string;
}

export interface EmailUpdateParams {
  email: string;
}

export interface PasswordUpdateParams {
  oldPassword: string;
  newPassword: string;
}

export interface State {
  user?: User;
}

export type UserState = ReturnType<typeof userReducer>
