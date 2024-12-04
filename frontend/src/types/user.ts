import moment from "moment";

export interface User {
    createdDate: moment.MomentInput;
    enabled: boolean;
    email: any;
    userName: any;
    userId: any;
}
