import moment from "moment/moment";

export interface AuditLog {
  action: any;
  id: any;
  noteContent: any;
  noteId: any;
  timestamp: moment.MomentInput;
  username: any;
}
