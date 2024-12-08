import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignOut from "./components/Auth/SignOut";
import AllNotes from "./components/Notes/AllNotes";
import NoteDetails from "./components/Notes/NoteDetails";
import CreateNote from "./components/Notes/CreateNote";
import AccessDenied from "./pages/AccessDenied";
import Admin from "./components/AuditLogs/Admin";
import UserProfile from "./components/Auth/UserProfile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import OAuth2RedirectHandler from "./components/Auth/OAuth2RedirectHandler";
import { Toaster } from "react-hot-toast";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ResetPassword from "./components/Auth/ResetPassword";
import Footer from "./panes/Footer";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import WelcomePage from "./pages/WelcomePage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <ResponsiveAppBar />
    <Toaster position="bottom-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route key="/admin/*" path="/admin/*" element={<Admin />} />
      <Route
        key="/create-note"
        path="/create-note"
        element={
          <AuthenticatedRoute>
            <CreateNote />
          </AuthenticatedRoute>
        }
      />
      <Route
        key="/notes"
        path="/notes"
        element={
          <AuthenticatedRoute>
            <AllNotes />
          </AuthenticatedRoute>
        }
      />
      <Route
        key="/proile"
        path="/profile"
        element={
          <AuthenticatedRoute>
            <UserProfile />
          </AuthenticatedRoute>
        }
      />
      <Route
        key="/notes/:id"
        path="/notes/:id"
        element={
          <AuthenticatedRoute>
            <NoteDetails />
          </AuthenticatedRoute>
        }
      />
      <Route
        key="/sign-out"
        path="/sign-out"
        element={
          <AuthenticatedRoute>
            <SignOut />
          </AuthenticatedRoute>
        }
      />
      <Route
        key="/oauth2/redirect"
        path="/oauth2/redirect"
        element={<OAuth2RedirectHandler />}
      />
      <Route
        key="/access-denied"
        path="/access-denied"
        element={<AccessDenied />}
      />
      <Route key="/contact" path="/contact" element={<ContactPage />} />
      <Route key="/about" path="/about" element={<AboutPage />} />
      <Route
        key="/reset-password"
        path="/reset-password"
        element={<ResetPassword />}
      />
      <Route key="/welcome" path="/welcome" element={<WelcomePage />} />,
      <Route
        key="/forgot-password"
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route key="wildcard" path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
