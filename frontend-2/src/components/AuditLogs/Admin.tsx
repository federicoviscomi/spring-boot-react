import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useMyContext } from "../../store/AppContext";

import AdminAreaSidebar from "../../pages/admin/AdminAreaSidebar";
import UserList from "../../pages/admin/UserList";
import UserDetails from "./UserDetails";
import AuditLogsDetails from "./AuditLogsDetails";
import AdminAuditLogs from "../../pages/admin/AdminAuditLogs";

const Admin = () => {
  const { token, isAdmin, openSidebar } = useMyContext();
  if (!token) {
    return <Navigate to="/" />;
  }
  if (!isAdmin) {
    return <Navigate to="/access-denied" />;
  }
  return (
    <div className="flex">
      <AdminAreaSidebar />
      <Routes>
        <Route path="audit-logs" element={<AdminAuditLogs />} />
        <Route path="audit-logs/:noteId" element={<AuditLogsDetails />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default Admin;
