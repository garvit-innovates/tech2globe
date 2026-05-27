import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-borderSoft bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>AI Resume Analyzer for faster, clearer hiring decisions.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/" className="transition hover:text-textMain">
            Home
          </Link>
          <Link to="/how-it-works" className="transition hover:text-textMain">
            How It Works
          </Link>
          <Link to="/upload" className="transition hover:text-textMain">
            Upload
          </Link>
        </div>
      </div>
    </footer>
  );
}
