import * as React from "react";
import { FC } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../services/note";
import { Button } from "@mui/material";

interface PopModalsProps {
  open: boolean;
  setOpen: (_open: boolean) => void;
  noteId: number;
}

const PopModals: FC<PopModalsProps> = ({ open, setOpen, noteId }) => {
  const navigate = useNavigate();
  const [noteDeleteLoader, setNoteDeleteLoader] = React.useState(false);

  const onNoteDeleteHandler = async () => {
    try {
      setNoteDeleteLoader(true);
      await deleteNote(noteId);
      toast.success("Note Delete successful");
      setOpen(false);
      navigate("/notes");
    } catch (err) {
      toast.error("Delete Note Failed");
    } finally {
      setNoteDeleteLoader(false);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-full">
          <div className="w-96 bg-headerColor rounded-lg shadow-xl max-w-md px-6 py-10 m-4">
            <div className="flex flex-col items-center justify-center">
              <AiOutlineWarning className="text-red-600 text-2xl" />
            </div>
            <p className="mt-4 text-white text-center">
              Are you sure you want to delete this note?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button id="confirm-delete-note" onClick={onNoteDeleteHandler}>
                {noteDeleteLoader ? "Loading" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopModals;
