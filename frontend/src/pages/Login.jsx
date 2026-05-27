import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(form);
      showToast("You are signed in and ready to analyze resumes.");
      navigate(location.state?.from || "/upload", { replace: true });
    } catch (_error) {
      showToast("Login failed. Please check your credentials.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-[2.5rem] border border-borderSoft bg-white p-8 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
        Welcome back
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-textMain">Login</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Sign in to upload resumes, run analysis, and review past candidate scores.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-textMain">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-borderSoft bg-secondaryBg px-4 py-3 text-sm outline-none transition focus:border-accentGold focus:bg-white"
            placeholder="name@company.com"
            required
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-textMain">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            className="w-full rounded-2xl border border-borderSoft bg-secondaryBg px-4 py-3 text-sm outline-none transition focus:border-accentGold focus:bg-white"
            placeholder="Enter your password"
            required
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-accentGold px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Need an account?{" "}
        <Link to="/register" className="font-semibold text-textMain">
          Create one
        </Link>
      </p>
    </div>
  );
}
