import moment from "moment";

export interface User {
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    createdDate: moment.MomentInput;
    enabled: boolean;
    email: any;
    userName: any;
    userId: any;
}
