import moment from 'moment';

export interface Note {
  id: number;
  content: string;
  ownerUsername: string;
  createdAt: moment.Moment;
}
