import api from "./api";
import {AuditLog} from "../types/audit";

export const getAudits = async () => {
    return await api.get<AuditLog[]>("/audit");
};

export const getNoteAudits = async (noteId: string) => {
    return await api.get<AuditLog[]>(`/audit/note/${noteId}`);
}
