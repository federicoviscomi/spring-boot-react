import api from "./api";

export const deleteNote = async (noteId: number) =>
  api.delete(`/notes/${noteId}`);
