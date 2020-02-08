import { authReducer } from './reducer';
import { User } from 'store/user/types';

export interface Tokens {
  accessToken?: string;
  // refreshToken?: string;
}

export type State = Tokens & {}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  nip: string;
  state: string;
}

export interface RegistrationResponse {
  jwt: string;
  user: User;
}

export type AuthState = ReturnType<typeof authReducer>
