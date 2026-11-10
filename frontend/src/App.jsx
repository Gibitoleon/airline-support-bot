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
import StaffChat from "./pages/StaffChat.jsx";
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
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

/* ---------- Main App & Routing ---------- */
function App() {
  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.role === "KNOWLEDGE_BASE_ADMIN";

  const isStaff = user?.role === "STAFF";

  return (
    <>
      <AppToaster />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accept-invitation" element={<AcceptInvitation />} />

        {/* ---------- Staff Chat — STAFF ONLY ---------- */}
        <Route
          path="/staff/chat"
          element={
            isStaff ? (
              <StaffChat />
            ) : user ? (
              // logged in but wrong role → send to their correct home
              <Navigate to={isAdmin ? "/admin/dashboard" : "/"} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------- Admin Routes — ADMIN ONLY ---------- */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminLayout />
            ) : user ? (
              // logged in but not admin → staff to their chat, others to landing
              <Navigate to={isStaff ? "/staff/chat" : "/"} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
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

        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
