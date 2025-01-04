import { AppRole } from './role';

export interface SignInResponse {
  jwtToken: string;
  roles: AppRole[];
  username: string;
}
