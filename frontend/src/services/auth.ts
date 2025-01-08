import api from './api';
import { AxiosResponse } from 'axios';
import { SignInResponse } from '../types/signIn.ts';
import { AppRole } from '../types/role.ts';

export const postSignIn: (
  username: string,
  password: string
) => Promise<AxiosResponse<SignInResponse>> = async (username, password) => {
  return api.post<SignInResponse>('/auth/public/sign-in', {
    username,
    password,
  });
};

export const postSignUp: (
  username: string,
  email: string,
  password: string,
  roles: AppRole[]
) => Promise<AxiosResponse<any>> = async (username, email, password, roles) => {
  return api.post('/auth/public/sign-up', {
    username,
    email,
    password,
    roles,
  });
};
