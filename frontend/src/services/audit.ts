import api from "./api";
import {AuditLog} from "../types/audit";
import {AxiosResponse} from "axios";

export const getAudits: () => Promise<
    AxiosResponse<AuditLog[]>
> = async () => api.get<AuditLog[]>("/audit");

export const getNoteAudits: (
    noteId: number,
) => Promise<AxiosResponse<AuditLog[]>> = async (noteId: number) =>
    api.get<AuditLog[]>(`/audit/note/${noteId}`);
