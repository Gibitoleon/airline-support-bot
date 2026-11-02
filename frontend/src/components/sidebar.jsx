import { NavLink } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { navigationItems } from "../../data/data.js";
import logo from "../assets/images/logos/Kenya-Airways-Logo.svg";
import useLogout from "../customhooks/useLogout.js";
import useAuthStore from "../stores/useLoginStore.js";

const getInitials = (email) => {
  if (!email) return "KA";
  const namePart = email.split("@")[0];
  const parts = namePart.split(/[._-]/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return namePart.slice(0, 2).toUpperCase();
};

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, isPending } = useLogout();

  // Get the logged-in user
  const user = useAuthStore((state) => state.user);

  const links = navigationItems.filter((item) => item.to);
  const actions = navigationItems.filter((item) => !item.to);

  return (
    <>
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden="true"
      />

      <aside
        className={[
          "flex h-screen w-72 shrink-0 flex-col gap-4 border-r border-border bg-surface px-5 py-2.5",
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:sticky lg:top-0 lg:translate-x-0 lg:transition-none",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-3 top-3 z-60 grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-light hover:text-text lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="relative h-16 mb-4 overflow-hidden">
          <img
            src={logo}
            alt="Kenya Airways"
            className="absolute left-0 top-0 h-28 w-auto max-w-none object-contain"
          />
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "relative flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-text"
                    : "text-muted hover:bg-surface-light hover:text-text",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary shadow-glow" />
                  )}
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? "text-primary" : ""
                    }`}
                  />
                  <span className="truncate">{label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Logout Action */}
          {actions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={logout}
              disabled={isPending}
              className="group flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-base font-medium text-muted transition-colors hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
              ) : (
                <Icon className="h-5 w-5 shrink-0" />
              )}
              <span className="truncate">
                {isPending ? "Signing out..." : label}
              </span>
            </button>
          ))}
        </nav>

        {/* Sleek User Profile Footer */}
        <div className="mt-auto rounded-xl border border-border bg-elevated p-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar Circle with Initials */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              {getInitials(user?.email)}
            </div>

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted">Signed in as</p>
              <p
                className="truncate text-sm font-semibold text-text"
                title={user?.email}
              >
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
