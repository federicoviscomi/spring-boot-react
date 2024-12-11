import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Blocks } from "react-loader-spinner";
import toast from "react-hot-toast";

import { DataGrid } from "@mui/x-data-grid";

import Error from "../common/Error";

import { AuditLog } from "../../types/audit";
import { auditLogsColumn } from "../../utils/tableColumn";
import { getNoteAudits } from "../../services/audit";

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

const renderAuditLogs = (auditLogs: AuditLog[]) => {
  if (auditLogs.length === 0) {
    return <Error message="Invalid NoteId" />;
  }

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
    <div className="overflow-x-auto w-full">
      <DataGrid
        className="w-fit mx-auto px-0"
        rows={rows}
        columns={auditLogsColumn}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[6]}
        disableColumnResize
      />
    </div>
  );
};

const AuditLogsDetails = () => {
  const noteId = Number(useParams().noteId);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSingleAuditLogs = useCallback(async () => {
    if (isNaN(noteId)) {
      toast.error("noteId not valid");
      return;
    }
    setLoading(true);
    try {
      const { data } = await getNoteAudits(noteId);
      setAuditLogs(data);
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
      toast.error("Error fetching audit logs");
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    if (noteId) {
      fetchSingleAuditLogs();
    }
  }, [noteId, fetchSingleAuditLogs]);

  if (!noteId) {
    return <Error message="note id undefined" />;
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="p-4">
      <div className="py-6">
        {auditLogs.length > 0 && (
          <h1 className="text-center sm:text-2xl text-lg font-bold text-slate-800 ">
            Audit Log for Note ID - {noteId}
          </h1>
        )}
      </div>
      {loading ? renderSkeleton() : renderAuditLogs(auditLogs)}
    </div>
  );
};

export default AuditLogsDetails;
