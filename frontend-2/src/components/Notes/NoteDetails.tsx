import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { Blocks } from "react-loader-spinner";
import ReactQuill from "react-quill";
import toast from "react-hot-toast";
import moment from "moment";

import { DataGrid } from "@mui/x-data-grid";

import api from "../../services/api";
import Error from "../common/Error";
import PopModals from "../PopModal";

import { auditLogsColumn } from "../../utils/tableColumn";
import { Note } from "../../types/note";
import axios from "axios";
import { AuditLog } from "../../types/audit";
import { Button } from "@mui/material";

interface ParsedNote extends Note {
  parsedContent: string;
}

const renderSkeleton = () => (
  <div className="flex   flex-col justify-center items-center h-96">
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

const NoteDetails = () => {
  const id = Number(useParams().id);
  const [modalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState<ParsedNote | undefined>(undefined);
  const [editorContent, setEditorContent] = useState<string | undefined>(
    undefined,
  );
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteEditLoader, setNoteEditLoader] = useState(false);
  const [editEnable, setEditEnable] = useState(false);
  const navigate = useNavigate();

  const fetchNoteDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Note[]>("/notes");
      const foundNote: ParsedNote = response.data.find(
        (n) => n.id === id,
      ) as ParsedNote;
      if (foundNote) {
        foundNote.parsedContent = JSON.parse(foundNote.content).content;
        setNote(foundNote);
      } else {
        setError("Invalid Note");
      }
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
      toast.error("Error fetching note details " + err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkAdminRole = async () => {
    try {
      const response = await api.get("/auth/user");
      const roles = response.data.roles;
      if (roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
      }
    } catch (err) {
      toast.error("Error checking admin role" + err);
      setError("Error checking admin role" + err);
    }
  };

  const fetchAuditLogs = useCallback(async () => {
    try {
      const response = await api.get(`/audit/note/${id}`);
      setAuditLogs(response.data);
    } catch (err) {
      toast.error("Error fetching audit logs" + err);
      setError("Error fetching audit logs" + err);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchNoteDetails();
      checkAdminRole();
      if (isAdmin) {
        fetchAuditLogs();
      }
    }
  }, [id, isAdmin, fetchAuditLogs, fetchNoteDetails]);

  useEffect(() => {
    if (note?.parsedContent) {
      setEditorContent(note.parsedContent);
    }
  }, [note?.parsedContent]);

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
      noteid: item.noteId,
      note: item.noteContent,
    };
  });

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const onNoteEditHandler = async () => {
    if (!editorContent || editorContent.trim().length === 0) {
      return toast.error("Note content Shouldn't be empty");
    }

    try {
      setNoteEditLoader(true);
      const noteData = { content: editorContent };
      await api.put(`/notes/${id}`, noteData);
      toast.success("Note update successful");
      setEditEnable(false);
      fetchNoteDetails();
      checkAdminRole();
      if (isAdmin) {
        fetchAuditLogs();
      }
    } catch (err) {
      toast.error("Update Note Failed");
    } finally {
      setNoteEditLoader(false);
    }
  };

  const onBackHandler = () => {
    navigate(-1);
  };

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return renderSkeleton();
  }

  return (
    <div className=" min-h-[calc(100vh-74px)] md:px-10 md:py-8 sm:px-6 py-4 px-4">
      <Button
        id="go-back"
        onClick={onBackHandler}
        className="bg-btnColor px-4 py-2 rounded-md text-white hover:text-slate-200 mb-3"
      >
        Go Back
      </Button>
      <div className=" py-6 px-8 min-h-customHeight shadow-lg shadow-gray-300 rounded-md">
        <>
          <>
            <div className="flex justify-end py-2 gap-2">
              {!editEnable ? (
                <Button
                  onClick={() => setEditEnable(!editEnable)}
                  className="bg-btnColor text-white px-3 py-1 rounded-md"
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={() => setEditEnable(!editEnable)}
                  className="bg-customRed text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </Button>
              )}
              {!editEnable && (
                <Button
                  id="delete-note-button"
                  onClick={() => setModalOpen(true)}
                  className="bg-customRed text-white px-3 py-1 rounded-md"
                >
                  Delete
                </Button>
              )}
            </div>
          </>
          <>
            {editEnable ? (
              <>
                <div className="h-72 sm:mb-20 lg:mb-14 mb-28 ">
                  <ReactQuill
                    id="text-editor"
                    className="h-full "
                    value={editorContent}
                    onChange={(value) => handleChange(value)}
                    modules={{
                      toolbar: [
                        [
                          {
                            header: [1, 2, 3, 4, 5, 6],
                          },
                        ],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["clean"], // Moved "clean" into its own array
                      ],
                    }}
                  />

                  <Button
                    disabled={noteEditLoader}
                    onClick={onNoteEditHandler}
                    className="bg-customRed md:mt-16 mt-28 text-white px-4 py-2 hover:text-slate-300 rounded-sm"
                  >
                    {noteEditLoader ? <span>Loading...</span> : " Update Note"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                {note?.parsedContent && (
                  <p
                    className="text-slate-900 ql-editor"
                    dangerouslySetInnerHTML={{ __html: note?.parsedContent }}
                  />
                )}
                {isAdmin && (
                  <div className="mt-10">
                    <h1 className="text-2xl text-center text-slate-700 font-semibold uppercase pt-10 pb-4">
                      Audit Logs
                    </h1>

                    <div className="overflow-x-auto ">
                      <DataGrid
                        className="w-fit mx-auto "
                        rows={rows}
                        columns={auditLogsColumn}
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
                  </div>
                )}
              </>
            )}
          </>
        </>
      </div>
      <PopModals open={modalOpen} setOpen={setModalOpen} noteId={id} />
    </div>
  );
};

export default NoteDetails;
