import { MdDateRange } from 'react-icons/md';
import { auditLogsTruncateTexts } from './truncateText';
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';

export const auditLogsColumn: GridColDef[] = [
  {
    field: 'actions',
    headerName: 'Action',
    width: 160,
    headerAlign: 'center',
    align: 'center',
    editable: false,
    headerClassName: 'text-black font-semibold border',
    cellClassName: 'text-slate-700 font-normal border',
    renderHeader: (_params) => <span className="ps-10">Action</span>,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 200,
    editable: false,
    headerAlign: 'center',
    disableColumnMenu: true,
    align: 'center',
    headerClassName: 'text-black font-semibold border',
    cellClassName: 'text-slate-700 font-normal border',
    renderHeader: (_params) => <span className="ps-10">Username</span>,
  },
  {
    field: 'timestamp',
    headerName: 'TimeStamp',
    width: 220,
    editable: false,
    headerAlign: 'center',
    disableColumnMenu: true,
    align: 'center',
    headerClassName: 'text-black font-semibold border',
    cellClassName: 'text-slate-700 font-normal border',
    renderHeader: (_params) => <span className="ps-10">TimeStamp</span>,
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-1">
        <span>
          <MdDateRange className="text-slate-700 text-lg" />
        </span>
        <span>{params?.row?.timestamp}</span>
      </div>
    ),
  },
  {
    field: 'noteid',
    headerName: 'NoteId',
    disableColumnMenu: true,
    width: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'text-black font-semibold border',
    cellClassName: 'text-slate-700 font-normal border',
    renderHeader: (_params) => <span>NoteId</span>,
  },
  {
    field: 'note',
    headerName: 'Note Content',
    width: 350,
    disableColumnMenu: true,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'text-black font-semibold',
    cellClassName: 'text-slate-700 font-normal',
    renderHeader: (_params) => <span className="ps-10">Note Content</span>,
    renderCell: (params) => {
      const content = JSON.parse(params?.value)?.content;
      const response = auditLogsTruncateTexts(content, 50);
      return <p className="text-slate-700 text-center">{response}</p>;
    },
  },
];
