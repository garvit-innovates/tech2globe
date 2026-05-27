import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register(form);
      showToast("Account created successfully.");
      navigate("/upload", { replace: true });
    } catch (_error) {
      showToast("Registration failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-[2.5rem] border border-borderSoft bg-white p-8 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
        Create account
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-textMain">Register</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Set up your workspace to save analyses, compare candidates, and revisit history anytime.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-textMain">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-borderSoft bg-secondaryBg px-4 py-3 text-sm outline-none transition focus:border-accentGold focus:bg-white"
            placeholder="Your name"
            required
          />
        </label>
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
            placeholder="Create a password"
            required
            minLength={6}
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-accentGold px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-textMain">
          Login
        </Link>
      </p>
    </div>
  );
}
