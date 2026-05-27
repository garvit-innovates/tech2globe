import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-borderSoft bg-white p-10 text-center shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-textMain">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-accentGold px-6 py-3 text-sm font-semibold text-white"
      >
        Return home
      </Link>
    </div>
  );
}
