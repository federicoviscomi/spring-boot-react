import api from "./api";
import { AxiosResponse } from "axios";

export const deleteNote: (
    noteId: number,
) => Promise<AxiosResponse<void>> = async (noteId: number) =>
        api.delete(`/notes/${noteId}`);
