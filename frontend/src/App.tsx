import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignOut from "./components/Auth/SignOut";
import AllNotes from "./components/Notes/AllNotes";
import NoteDetails from "./components/Notes/NoteDetails";
import CreateNote from "./components/Notes/CreateNote";
import UserProfile from "./components/Auth/UserProfile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import OAuth2RedirectHandler from "./components/Auth/OAuth2RedirectHandler";
import { Toaster } from "react-hot-toast";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ResetPassword from "./components/Auth/ResetPassword";
import Footer from "./panes/Footer";
import WelcomePage from "./pages/WelcomePage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { AppRole } from "./types/role";
import ResponsiveAppBar from "./panes/ResponsiveAppBar";
import Admin from "./components/AuditLogs/Admin";

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
          <Route path="/admin/*" element={<Admin />} />
        </Route>
      </Route>
      {/*<Route path="/access-denied" element={<AccessDenied />} />*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
