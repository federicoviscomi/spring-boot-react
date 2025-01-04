import { Navigate, Route, Routes } from 'react-router-dom';

import AdminAreaSidebar from './AdminAreaSidebar.tsx';
import UserList from './UserList.tsx';
import AdminAuditLogs from './AdminAuditLogs.tsx';

import { useMyContext } from '../../store/AppContext.ts';
import AuditLogsDetails from '../AuditLogs/AuditLogsDetails.tsx';
import UserDetails from '../AuditLogs/UserDetails.tsx';

const AdminRouting = () => {
  const { token, isAdmin } = useMyContext();
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

export default AdminRouting;
