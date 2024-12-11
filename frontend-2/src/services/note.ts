import api from "./api";
import axios from "axios";

export const deleteNote: (
    noteId: number,
) => Promise<axios.AxiosResponse<void>> = async (noteId: number) =>
    api.delete(`/notes/${noteId}`);
