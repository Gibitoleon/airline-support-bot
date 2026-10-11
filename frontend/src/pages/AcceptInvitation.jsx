import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import logo from "../assets/images/logos/Kenya-Airways-Logo.svg";
import useAcceptInvitation from "../customhooks/useAcceptInvitation.js";

const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/9/93/5Y-KZA_%2818529035463%29.jpg";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-elevated py-3 pl-10 pr-10 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60";

/* ---------- Password rules ---------- */
const checkRules = (password) => ({
  minLength: password.length >= 8,
  hasUpper: /[A-Z]/.test(password),
  hasLower: /[a-z]/.test(password),
  hasNumber: /\d/.test(password),
});

const PasswordRules = ({ password }) => {
  const rules = checkRules(password);

  const items = [
    { key: "minLength", label: "At least 8 characters" },
    { key: "hasUpper", label: "One uppercase letter" },
    { key: "hasLower", label: "One lowercase letter" },
    { key: "hasNumber", label: "One number" },
  ];

  return (
    <ul className="space-y-1 pt-1">
      {items.map((r) => (
        <li
          key={r.key}
          className={[
            "flex items-center gap-1.5 text-xs transition-colors",
            rules[r.key] ? "text-emerald-400" : "text-muted",
          ].join(" ")}
        >
          <CheckCircle2 className="h-3 w-3 shrink-0" />
          {r.label}
        </li>
      ))}
    </ul>
  );
};

/* ---------- Missing token state ---------- */
const MissingToken = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="w-full max-w-md rounded-xl border border-primary/30 bg-surface p-10 text-center shadow-card">
      <AlertCircle className="mx-auto h-10 w-10 text-primary" />
      <h1 className="mt-4 text-xl font-semibold text-text">
        Invalid invitation link
      </h1>
      <p className="mt-2 text-sm text-muted">
        This invitation link is missing its token. Please use the link from your
        email, or request a new invitation.
      </p>
      <Link
        to="/login"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover"
      >
        Back to sign in
      </Link>
    </div>
  </div>
);

/* ---------- Page ---------- */
const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { acceptInvitation, isPending } = useAcceptInvitation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  if (!token) return <MissingToken />;

  const rules = checkRules(password);
  const allRulesPass = Object.values(rules).every(Boolean);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!allRulesPass) {
      setError("Please meet all password requirements.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    acceptInvitation({ token, password });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* ---------- Image panel (LEFT, lg+ only) ---------- */}
      <div className="relative hidden w-1/2 overflow-hidden border-r border-border lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            The Pride of Africa
          </p>
          <p className="mt-3 max-w-md text-lg font-semibold leading-tight text-text xl:text-xl">
            Connecting Nairobi to the world, one journey at a time.
          </p>
        </div>
      </div>

      {/* ---------- Form panel (RIGHT) ---------- */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">
        <div className="w-full max-w-md">
          <div className="relative mb-10 h-16 w-[240px] overflow-hidden">
            <img
              src={logo}
              alt="Kenya Airways"
              className="absolute left-0 top-0 h-28 w-auto max-w-none object-contain"
            />
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Invitation
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Set your password
            </h1>
            <p className="mt-2 text-sm text-muted">
              Choose a password to activate your account. You&apos;ll use it to
              sign in from now on.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="accept-password"
                className="block text-xs font-medium uppercase tracking-wider text-muted"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="accept-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  disabled={isPending}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={FIELD_CLASS}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  disabled={isPending}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-muted transition hover:bg-surface-light hover:text-text disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {password.length > 0 && <PasswordRules password={password} />}
            </div>

            {/* Confirm */}
            <div className="space-y-2">
              <label
                htmlFor="accept-confirm"
                className="block text-xs font-medium uppercase tracking-wider text-muted"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="accept-confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  disabled={isPending}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={FIELD_CLASS}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  disabled={isPending}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-muted transition hover:bg-surface-light hover:text-text disabled:cursor-not-allowed"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="flex items-center gap-1.5 pt-1 text-xs text-primary">
                  <AlertCircle className="h-3 w-3" />
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending || !allRulesPass || !passwordsMatch}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Activating account...
                </>
              ) : (
                "Activate Account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-text underline-offset-2 transition hover:text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;
