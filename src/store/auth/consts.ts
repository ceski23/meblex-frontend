import { CLIENT, WORKER } from 'constants/auth';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKENS = 'SET_TOKENS';
export const GET_LOGIN_STATUS = 'GET_LOGIN_STATUS';

export const Roles = {
  USER: 'Client',
  EMPLOYEE: 'Worker',
};

export const roleName = (role: string): string => ({
  [Roles.USER]: CLIENT,
  [Roles.EMPLOYEE]: WORKER,
}[role]);

export const PREFIX = 'AUTH';