import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  LogOut,
  User,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Users,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/images/logos/Kenya-Airways-Logo.svg";
import ChatWidget from "../components/chat/ChatWidget.jsx";
import useAuthStore from "../stores/useLoginStore.js";
import useLogout from "../customhooks/useLogout.js";

const StaffChat = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { logout, isPending } = useLogout("/staff/login");
  const [chatOpen, setChatOpen] = useState(false);

  const isStaff = user?.role === "STAFF";

  if (!user || !isStaff) return null;

  const quickActions = [
    {
      icon: BookOpen,
      title: "Procedures & policies",
      body: "Look up standard operating procedures and internal guidelines.",
    },
    {
      icon: Users,
      title: "Customer escalations",
      body: "Guidance on handling complaints, refunds, and special cases.",
    },
    {
      icon: HelpCircle,
      title: "Flight disruptions",
      body: "Rebooking rules, duty of care, and disruption handling.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text antialiased">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <a
              href="/staff/chat"
              className="relative h-12 w-[200px] shrink-0 overflow-hidden sm:h-14 sm:w-[240px]"
            >
              <img
                src={logo}
                alt="Kenya Airways"
                className="absolute left-0 top-0 h-20 w-auto max-w-none object-contain sm:h-24"
              />
            </a>
            <span className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5" />
              Staff Portal
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden max-w-[220px] items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted sm:flex">
              <User className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{user.email}</span>
            </div>
            <button
              onClick={logout}
              disabled={isPending}
              title="Log out"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted transition hover:bg-surface-light hover:text-primary disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Authenticated staff only
            </span>

            <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
              Staff Assistant
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Get instant answers on internal procedures, customer escalations,
              and disruption handling — backed by Kenya Airways knowledge base.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white shadow-glow transition-colors hover:bg-primary-hover"
              >
                <MessageCircle className="h-4 w-4" />
                Open assistant
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Quick actions ---------- */}
      <section className="border-t border-border bg-surface/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              What you can ask about
            </h2>
            <p className="mt-2 text-sm text-muted">
              Click the assistant button above to start a conversation.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.title}
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="group flex flex-col rounded-xl border border-border bg-surface p-5 text-left shadow-card transition-colors hover:border-primary/30 sm:p-6"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-text">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {a.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                    Ask the assistant
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} Kenya Airways. Staff portal.
            </p>
            <p className="text-xs text-muted">Need help? Contact IT support.</p>
          </div>
        </div>
      </footer>

      {/* ---------- Shared chat widget (staff context via auth token) ---------- */}
      <ChatWidget isOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default StaffChat;
