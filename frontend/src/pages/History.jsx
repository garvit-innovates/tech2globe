import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAnalysis, getHistory } from "../api/resumeApi";
import { useToast } from "../components/Toast";

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

export default function History() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      try {
        const results = await getHistory();
        if (isMounted) {
          setHistory(results);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const nextHistory = await deleteAnalysis(id);
    setHistory(nextHistory);
    showToast("Analysis removed from history.");
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-borderSoft bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
          History
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-textMain">
          Past analyses
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Review previous resume comparisons, reopen results, or clear analyses you no longer need.
        </p>
      </section>

      <div className="overflow-hidden rounded-[2rem] border border-borderSoft bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-secondaryBg text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Filename</th>
                <th className="px-6 py-4">Overall</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500">
                    Loading analysis history...
                  </td>
                </tr>
              ) : history.length ? (
                history.map((item) => (
                  <tr key={item._id} className="border-t border-borderSoft text-sm">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-textMain">{item.filename}</p>
                      <p className="mt-1 line-clamp-1 text-slate-500">
                        {item.candidateSummary}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-accentGold">
                      {item.overallScore}%
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => navigate("/results", { state: { results: [item] } })}
                          className="rounded-full border border-borderSoft px-4 py-2 text-xs font-semibold text-textMain transition hover:bg-secondaryBg"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          className="rounded-full border border-red-100 px-4 py-2 text-xs font-semibold text-danger transition hover:bg-red-50"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Trash2 size={14} />
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500">
                    No analysis history yet. Upload resumes to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
