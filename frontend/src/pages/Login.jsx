import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import logo from "../assets/images/logos/Kenya-Airways-Logo.svg";

const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/9/93/5Y-KZA_%2818529035463%29.jpg";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-elevated py-3 pl-10 pr-10 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));

      if (password.length < 6) {
        throw new Error("Invalid email or password.");
      }

      console.warn("[Login] Backend integration pending. Would sign in:", {
        email,
      });

      onLoginSuccess?.({ email });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

        {/* Caption */}
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
          {/* Logo — same size and crop as sidebar */}
          <div className="relative mb-10 h-16 w-[240px] overflow-hidden">
            <img
              src={logo}
              alt="Kenya Airways"
              className="absolute left-0 top-0 h-28 w-auto max-w-none object-contain"
            />
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="block text-xs font-medium uppercase tracking-wider text-muted"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  placeholder="you@kenya-airways.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={FIELD_CLASS}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-medium uppercase tracking-wider text-muted"
                >
                  Password
                </label>
                <button
                  type="button"
                  tabIndex={-1}
                  className="text-xs font-medium text-muted transition hover:text-text"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={FIELD_CLASS}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  disabled={isLoading}
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer hint */}
          <p className="mt-8 text-center text-xs text-muted">
            Customers don&apos;t need an account — just start chatting on the{" "}
            <a
              href="/"
              className="font-medium text-text underline-offset-2 transition hover:text-primary hover:underline"
            >
              home page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;