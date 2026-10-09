import { useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  MapPin,
  Plane,
  Clock,
  ShieldCheck,
  ChevronRight,
  Menu,
} from "lucide-react";
import logo from "../assets/images/logos/Kenya-Airways-Logo.svg";

const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/9/93/5Y-KZA_%2818529035463%29.jpg";

/* ---------- Chat widget ---------- */
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi there! I'm the Kenya Airways support assistant. Ask me about baggage, check-in, refunds, or any travel question.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text },
      {
        id: Date.now() + 1,
        role: "assistant",
        text: "Thanks for your question. The RAG backend isn't wired up yet — this is just the UI shell.",
      },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-glow transition-colors hover:bg-primary-hover sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-40 flex h-[520px] max-h-[calc(100dvh-6rem)] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl sm:bottom-24 sm:right-6 sm:max-w-[calc(100vw-3rem)]">
          <div className="flex items-center gap-3 border-b border-border bg-elevated px-4 py-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text">
                Kenya Airways Support
              </p>
              <p className="flex items-center gap-1.5 truncate text-xs text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted transition hover:bg-surface-light hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={[
                    "max-w-[85%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-white"
                      : "rounded-bl-md border border-border bg-elevated text-text",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-border bg-surface p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="min-w-0 flex-1 rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-white transition hover:bg-primary-hover"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

/* ---------- Landing page ---------- */
const Landing = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { label: "Book", href: "#" },
    { label: "Destinations", href: "#destinations" },
    { label: "Services", href: "#services" },
    { label: "Help", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-background text-text antialiased">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
          {/* Logo — crop trick */}
          <a
            href="#"
            className="relative h-12 w-[200px] shrink-0 overflow-hidden sm:h-14 sm:w-[240px]"
          >
            <img
              src={logo}
              alt="Kenya Airways"
              className="absolute left-0 top-0 h-20 w-auto max-w-none object-contain sm:h-24"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-muted transition-colors hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#"
              className="hidden rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text sm:inline-flex"
            >
              Sign In
            </a>
            <button
              type="button"
              onClick={() => setMobileNavOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface text-muted transition hover:text-text lg:hidden"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <nav className="border-t border-border bg-surface px-4 py-4 sm:px-6 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="text-sm font-medium text-muted transition hover:text-text"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#"
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-border bg-elevated px-4 py-2.5 text-sm font-medium text-text transition hover:bg-surface-light"
              >
                Sign In
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent sm:via-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Plane className="h-3.5 w-3.5" />
              The Pride of Africa
            </span>

            <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
              Fly with Kenya Airways
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-lg">
              Africa&apos;s leading airline, connecting Nairobi to the world.
              Book your next journey, manage your trip, or get instant answers
              from our support assistant.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white shadow-glow transition-colors hover:bg-primary-hover"
              >
                Book a flight
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#destinations"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface/80 px-5 py-3 text-sm font-medium text-text backdrop-blur transition-colors hover:bg-surface-light"
              >
                Explore destinations
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Quick actions ---------- */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {[
            { icon: Plane, label: "Book a flight", sub: "Find your next trip" },
            { icon: Clock, label: "Check-in", sub: "Online or at the airport" },
            { icon: MapPin, label: "Flight status", sub: "Track any KQ flight" },
            { icon: ShieldCheck, label: "Manage booking", sub: "Seats, meals & more" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <a
                key={a.label}
                href="#"
                className="group flex items-start gap-4 px-4 py-5 transition-colors hover:bg-surface sm:px-6 sm:py-6"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-muted transition group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text">{a.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{a.sub}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------- Destinations ---------- */}
      <section
        id="destinations"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Popular destinations
            </h2>
            <p className="mt-2 text-sm text-muted">
              From Nairobi to the world, and back again.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-1 self-start text-sm font-medium text-primary transition hover:text-primary-hover sm:self-auto"
          >
            View all routes
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { city: "London", code: "LHR", sub: "Daily direct" },
            { city: "Dubai", code: "DXB", sub: "Daily direct" },
            { city: "Johannesburg", code: "JNB", sub: "Multiple daily" },
            { city: "Mombasa", code: "MBA", sub: "Domestic" },
          ].map((d) => (
            <a
              key={d.code}
              href="#"
              className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-muted">
                  {d.code}
                </span>
                <ChevronRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-4 text-base font-semibold text-text">{d.city}</p>
              <p className="mt-1 text-xs text-muted">{d.sub}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section
        id="services"
        className="border-t border-border bg-surface/50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Everything you need for your journey
            </h2>
            <p className="mt-2 text-sm text-muted">
              From booking to boarding, we&apos;re here to help.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {[
              {
                icon: Plane,
                title: "Baggage",
                body: "Check allowance, excess charges, and restricted items.",
              },
              {
                icon: Clock,
                title: "Flight disruptions",
                body: "Rebooking, refunds, and duty of care for delays.",
              },
              {
                icon: ShieldCheck,
                title: "Special assistance",
                body: "Support for passengers with reduced mobility.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-primary/30 sm:p-6"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-text">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-elevated p-5 sm:p-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-text sm:text-lg">
                  Have a question? Ask our assistant.
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  Instant answers about baggage, check-in, refunds, and more —
                  available 24/7.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector('button[aria-label="Open chat"]')
                    ?.click()
                }
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white shadow-glow transition-colors hover:bg-primary-hover sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Start chatting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              {/* Logo — crop trick */}
              <div className="relative h-14 w-[220px] overflow-hidden">
                <img
                  src={logo}
                  alt="Kenya Airways"
                  className="absolute left-0 top-0 h-24 w-auto max-w-none object-contain"
                />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted">
                The Pride of Africa. Connecting Nairobi to the world since 1977.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
              {[
                { title: "Travel", links: ["Book", "Check-in", "Flight status"] },
                { title: "Support", links: ["Help centre", "Contact us", "Refunds"] },
                { title: "Company", links: ["About", "Careers", "Press"] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {col.title}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="text-xs text-muted transition hover:text-text"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} Kenya Airways. All rights reserved.
            </p>
            <p className="text-xs text-muted">
              Hero photo by{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:5Y-KZA_(18529035463).jpg"
                target="_blank"
                rel="noreferrer"
                className="text-muted underline-offset-2 hover:text-text hover:underline"
              >
                Alec Wilson
              </a>{" "}
              (CC BY-SA 2.0)
            </p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Landing;