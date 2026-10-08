import {  useState } from "react";
import { Plus, Send, X} from "lucide-react";
import { invitationData, usersData, userGroupsData } from "../../data/data.js";
import UsersPanel from "../components/user/UsersPanel.jsx";
import InvitationsPanel from "../components/invitation/InvitationPanel.jsx";

const TABS = [
  { key: "users", label: "Users" },
  { key: "invitations", label: "Invitations" },
];

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "ACCEPTED", label: "Accepted" },
];

const INVITATION_COLUMNS = ["Email", "Role", "Status", "Created", "Expires"];
const USER_COLUMNS = ["Email", "Role", "Groups", "Joined"];

const ROLE_OPTIONS = [{ value: "Staff", label: "Staff" }];




const Users = () => {
  const [tab, setTab] = useState("users");

  return (
    <div className="space-y-4 sm:space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-text lg:text-3xl">
          Users
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Manage users, groups, and invitations
        </p>
      </header>

      <div className="border-b border-border">
        <nav className="-mb-px flex gap-6">
          {TABS.map((t) => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={[
                  "relative pb-3 text-sm font-medium transition-colors",
                  isActive ? "text-text" : "text-muted hover:text-text",
                ].join(" ")}
              >
                {t.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary shadow-glow" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {tab === "users" && <UsersPanel />}
      {tab === "invitations" && <InvitationsPanel />}
    </div>
  );
};

export default Users;