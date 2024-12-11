import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Blocks } from "react-loader-spinner";
import toast from "react-hot-toast";
import { MdDateRange } from "react-icons/md";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { auditLogsTruncateTexts } from "../../utils/truncateText";
import Error from "../../components/common/Error";
import { AuditLog } from "../../types/audit";
import { getAudits } from "../../services/audit";
import { Button } from "@mui/material";

const auditLogsColumns: GridColDef[] = [
  {
    field: "actions",
    headerName: "Action",
    width: 160,
    headerAlign: "center",
    disableColumnMenu: true,
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (_params) => <span>Action</span>,
  },
  {
    field: "username",
    headerName: "Username",
    width: 180,
    editable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (_params) => <span>Username</span>,
  },
  {
    field: "timestamp",
    headerName: "TimeStamp",
    disableColumnMenu: true,
    width: 220,
    editable: false,
    headerAlign: "center",
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (_params) => <span>TimeStamp</span>,
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
    field: "noteid",
    headerName: "NoteId",
    disableColumnMenu: true,
    width: 150,
    editable: false,
    headerAlign: "center",
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (_params) => <span>NoteId</span>,
  },
  {
    field: "note",
    headerName: "Note Content",
    width: 220,
    editable: false,
    headerAlign: "center",
    disableColumnMenu: true,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (_params) => <span>Note Content</span>,
    renderCell: (params) => {
      const content = JSON.parse(params?.value)?.content;
      const response = auditLogsTruncateTexts(content);
      return <p className="text-slate-700 text-center ">{response}</p>;
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    editable: false,
    headerAlign: "center",
    align: "center",
    headerClassName: "text-black font-semibold",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    renderHeader: (_params) => <span>Action</span>,
    renderCell: (params) => (
      <Link
        to={`/admin/audit-logs/${params.row.noteId}`}
        className="h-full flex justify-center items-center "
      >
        <Button>Views</Button>
      </Link>
    ),
  },
];

const renderSkeleton = () => (
  <div className="flex flex-col justify-center items-center h-72">
    <span>
      <Blocks
        height="70"
        width="70"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </span>
    <span>Please wait...</span>
  </div>
);

const renderAdminAuditLogs = (auditLogs: AuditLog[]) => {
  const rows = auditLogs.map((item) => {
    const formattedDate = moment(item.timestamp).format(
      "MMMM DD, YYYY, hh:mm A",
    );
    return {
      id: item.id,
      noteId: item.noteId,
      actions: item.action,
      username: item.username,
      timestamp: formattedDate,
      note: item.noteContent,
    };
  });
  return (
    <div className="overflow-x-auto w-full mx-auto">
      <DataGrid
        className="w-fit mx-auto px-0"
        rows={rows}
        columns={auditLogsColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        disableRowSelectionOnClick
        disableColumnResize
      />
    </div>
  );
};

const AdminAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const { data } = await getAudits();
      setAuditLogs(data);
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
      toast.error("Error fetching audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="p-4">
      <div className="py-4">
        <h1 className="text-center text-2xl font-bold text-slate-800 uppercase">
          Audit Logs
        </h1>
      </div>
      {loading ? renderSkeleton() : renderAdminAuditLogs(auditLogs)}
    </div>
  );
};

export default AdminAuditLogs;
