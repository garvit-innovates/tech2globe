import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "How It Works", to: "/how-it-works" },
  { label: "Upload", to: "/upload" },
  { label: "History", to: "/history" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-borderSoft/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-accentSoft p-2 text-accentGold">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-textMain">
              AI Resume Analyzer
            </p>
            <p className="text-xs text-slate-500">Screen faster with clear fit signals</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-accentSoft text-textMain"
                    : "text-slate-600 hover:bg-secondaryBg hover:text-textMain"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <div className="rounded-full border border-borderSoft px-4 py-2 text-sm text-slate-600">
                {user?.name || "Analyst"}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-textMain px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-borderSoft px-5 py-2.5 text-sm font-semibold text-textMain transition hover:bg-secondaryBg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-accentGold px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-full border border-borderSoft p-2 text-textMain md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-borderSoft bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-secondaryBg"
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-textMain px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-borderSoft px-4 py-3 text-sm font-semibold text-textMain"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl bg-accentGold px-4 py-3 text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
