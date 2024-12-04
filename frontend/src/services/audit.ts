import api from "./api";
import { AuditLog } from "../types/audit";
import axios from "axios";

export const getAudits: () => Promise<
  axios.AxiosResponse<AuditLog[]>
> = async () => api.get<AuditLog[]>("/audit");

export const getNoteAudits: (
  noteId: number,
) => Promise<axios.AxiosResponse<AuditLog[]>> = async (noteId: number) =>
  api.get<AuditLog[]>(`/audit/note/${noteId}`);
