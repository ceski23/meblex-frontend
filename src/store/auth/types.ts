import { authReducer } from './reducer';

export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

export type State = Tokens & {}

export interface LoginCredentials {
  email: string;
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

export type AuthState = ReturnType<typeof authReducer>
