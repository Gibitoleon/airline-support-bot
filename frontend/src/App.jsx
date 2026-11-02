import { useState } from "react";
import { Menu } from "lucide-react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";

import AppToaster from "./components/AppToaster.jsx";
import Sidebar from "./components/sidebar.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Users from "./pages/users.jsx";
import Documents from "./pages/Document.jsx";
import Permissions from "./pages/Permission.jsx";
import Groups from "./pages/Group.jsx";
import Feedback from "./pages/Feedback.jsx";
import Login from "./pages/Login.jsx";
import UserDetail from "./components/user/UserDetail.jsx";
import DocumentDetails from "./components/documents/DocumentDetails.jsx";
import GroupDetail from "./components/groups/GroupDetails.jsx";
import Landing from "./pages/Landing.jsx";
import AcceptInvitation from "./pages/AcceptInvitation.jsx";
import "./App.css";
import useAuthStore from "./stores/useLoginStore.js";

/* ---------- Admin Layout (Sidebar + Topbar) ---------- */
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    setSidebarOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-text antialiased">
      <div className="pointer-events-none fixed inset-0" />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface text-muted transition hover:border-primary/30 hover:text-text"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-base font-semibold">Support Portal</span>
        </header>

        <main className="relative min-w-0 flex-1 p-6 lg:p-10">
          <div className="mx-auto w-full max-w-[1600px]">
            {/* This is where the Admin pages get injected */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

/* ---------- Main App & Routing ---------- */
function App() {
  // We still track the full user object here
  const user = useAuthStore((state) => state.user);

  // We use the role to protect the admin routes
  const isAdmin = user?.role === "KNOWLEDGE_BASE_ADMIN";

  return (
    <>
      <AppToaster />

      <Routes>
        {/* Public & Staff Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accept-invitation" element={<AcceptInvitation />} />

        {/* Admin Routes (Protected) */}
        {/* If they are not an Admin, we redirect them. 
            If they are logged in as Staff, they get sent back to the Landing page.
            If they are logged out, they get sent to Login. */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminLayout />
            ) : user ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Nested Admin Routes */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/:groupId" element={<GroupDetail />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetail />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/:documentId" element={<DocumentDetails />} />
          <Route path="feedbacks" element={<Feedback />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
