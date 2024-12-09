import moment from "moment";
import { Role } from "./role";

export interface User {
  userId: number;
  username: string;
  email: string;
  password?: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  credentialsExpiryDate: moment.MomentInput;
  accountExpiryDate: moment.MomentInput;
  twoFactorSecret: string;
  isTwoFactorEnabled: boolean;
  signUpMethod: string;
  role: Role;
  createdDate: moment.MomentInput;
  updatedDate: moment.MomentInput;
}

export interface UserInfoResponse {
  id: number;
  username: string;
  email: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  credentialsExpiryDate: moment.Moment;
  accountExpiryDate: moment.Moment;
  isTwoFactorEnabled: boolean;
  roles: string[];
}
