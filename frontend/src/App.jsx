import { useState } from "react";
import { Menu } from "lucide-react";

import { Route, Routes, useNavigate } from "react-router-dom";

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


function App() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.userid;
  console.log(user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearUser();
    setSidebarOpen(false);
  };

  return (
    <>
      <AppToaster />

      {!userId ? (
        <Routes>
          <Route path="/accept-invitation" element={<AcceptInvitation />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
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

              <span className="text-base font-semibold">
                Support Portal
              </span>
            </header>

            <main className="relative min-w-0 flex-1 p-6 lg:p-10">
              <div className="mx-auto w-full max-w-[1600px]">
                <Routes>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/groups" element={<Groups />} />
                  <Route path="/admin/groups/:groupId" element={<GroupDetail />} />
                  <Route path="/admin/permissions" element={<Permissions />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/documents" element={<Documents />} />
                  <Route path="/admin/documents/:documentId" element={<DocumentDetails />} />
                  <Route path="/admin/users/:userId" element={<UserDetail />} />
                  <Route path="/admin/feedbacks" element={<Feedback />} />
                  <Route path="/login" element={<Login />} />
                 
                </Routes>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;