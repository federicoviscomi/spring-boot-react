import moment from 'moment/moment';

export interface AuditLog {
  id: number;
  action: string;
  username: string;
  noteId: number;
  noteContent: string;
  timestamp: moment.MomentInput;
}
