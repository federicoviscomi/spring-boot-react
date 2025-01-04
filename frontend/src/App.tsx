import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Footer from './panes/Footer';
import WelcomePage from './pages/landing/WelcomePage.tsx';
import NotFound from './pages/NotFound';
import AdminRouting from './pages/admin/AdminRouting.tsx';
import ResponsiveAppBar from './panes/ResponsiveAppBar';

import ResetPassword from './pages/Auth/ResetPassword.tsx';
import AuthenticatedRoute from './shared-components/AuthenticatedRoute.tsx';
import CreateNote from './pages/Notes/CreateNote.tsx';
import AllNotes from './pages/Notes/AllNotes.tsx';
import NoteDetails from './pages/Notes/NoteDetails.tsx';
import SignOut from './pages/Auth/SignOut.tsx';
import OAuth2RedirectHandler from './pages/Auth/OAuth2RedirectHandler.tsx';
import RoleProtectedRoute from './shared-components/RoleProtectedRoute.tsx';
import UserProfile from './pages/Auth/UserProfile.tsx';
import ForgotPassword from './pages/Auth/ForgotPassword.tsx';
import ProtectedRoute from './shared-components/ProtectedRoute.tsx';

import { AppRole } from './types/role';

const App = () => (
  <BrowserRouter>
    <Toaster position="bottom-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route
        element={
          <div>
            <ResponsiveAppBar />
            <ProtectedRoute />
            <Footer />
          </div>
        }
      >
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/create-note"
          element={
            <AuthenticatedRoute>
              <CreateNote />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <AuthenticatedRoute>
              <AllNotes />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthenticatedRoute>
              <UserProfile />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <AuthenticatedRoute>
              <NoteDetails />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/sign-out"
          element={
            <AuthenticatedRoute>
              <SignOut />
            </AuthenticatedRoute>
          }
        />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route
          element={
            <div>
              <RoleProtectedRoute allowedRoles={[AppRole.ROLE_ADMIN]} />
            </div>
          }
        >
          <Route path="/admin/*" element={<AdminRouting />} />
        </Route>
      </Route>
      {/*<Route path="/access-denied" element={<AccessDenied />} />*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
