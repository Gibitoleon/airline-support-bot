import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./components/sidebar.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Users from "./pages/users.jsx";
import Documents from "./pages/Document.jsx";
import Permissions from "./pages/Permission.jsx";
import Groups from "./pages/Group.jsx";
import Feedback from "./pages/Feedback.jsx";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setSidebarOpen(false);
  };

  if (!user) {
    return <Landing/>
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-text antialiased">
      <div className="pointer-events-none fixed inset-0" />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => {
           setSidebarOpen(false)
        }}
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

        <main className="relative flex-1 min-w-0 p-6 lg:p-10">
          <div className="mx-auto w-full max-w-[1600px]">
           <Dashboard/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;