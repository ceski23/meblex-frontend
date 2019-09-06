import { userReducer } from './reducer';

export type User = UserData & {
  email: string;
  role: string;
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
  newEmail: string;
}

export interface PasswordUpdateParams {
  oldPassword: string;
  newPassword: string;
}

export interface State {
  user?: User;
}

export type UserState = ReturnType<typeof userReducer>
