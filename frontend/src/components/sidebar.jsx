import { useState } from "react";
import { X } from "lucide-react";
import { navigationItems } from "../../data/data.js";
import logo from "../assets/images/logos/Kenya-Airways-Logo.svg";

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const [active, setActive] = useState("Dashboard");

  const links = navigationItems.filter((item) => item.to);
  const actions = navigationItems.filter((item) => !item.to);

  const handleNavigate = (label) => {
    setActive(label);
    onClose?.(); // close drawer after tapping a link on mobile
  };

  return (
    <>
      {/* Backdrop — mobile only, shown when open */}
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
          // Base layout
          "flex h-screen w-72 shrink-0 flex-col gap-4 border-r border-border bg-surface px-5 py-2.5",
          // Mobile: fixed drawer that slides in
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: back to static sidebar, always visible
          "lg:sticky lg:top-0 lg:translate-x-0 lg:transition-none",
        ].join(" ")}
      >
        {/* Close button — mobile only */}
        <button
          type="button"
          onClick={() => {
            console.log("close clicked");
            onClose()}
        }
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

        {/* Nav */}
        <nav className=" flex-1 space-y-0.5 overflow-y-auto">
          {links.map(({ label, icon: Icon }) => {
            const isActive = active === label;

            return (
              <button
                key={label}
                type="button"
                onClick={() => handleNavigate(label)}
                className={[
                  "relative flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-text"
                    : "text-muted hover:bg-surface-light hover:text-text",
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary shadow-glow" />
                )}
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive ? "text-primary" : ""
                  }`}
                />
                <span className="truncate">{label}</span>
              </button>
            );
          })}

          {/* Actions */}
          {actions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={onLogout}
              className="group flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-base font-medium text-muted transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="rounded-lg border border-border bg-elevated p-3.5  mb-4">
          <p className="text-sm text-muted">Signed in as</p>
          <p className="truncate text-base font-medium">
            agent@kenya-airways.com
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;