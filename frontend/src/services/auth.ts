import api from './api';
import { AxiosResponse } from 'axios';
import { SignInResponse } from '../types/signIn.ts';

export const postSignIn: (
  username: string,
  password: string
) => Promise<AxiosResponse<SignInResponse>> = async (username, password) => {
  return api.post<SignInResponse>('/auth/public/sign-in', {
    username,
    password,
  });
};
