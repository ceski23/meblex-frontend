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

export type AuthState = ReturnType<typeof authReducer>
