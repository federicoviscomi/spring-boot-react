import api from "./api";
import {AuditLog} from "../types/audit";

const getAudits = async () => {
    return await api.get<AuditLog[]>("/audit");
};

export default getAudits;