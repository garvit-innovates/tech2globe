export default function CandidateTable({ results }) {
  if (!results.length) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-borderSoft bg-white shadow-card">
      <div className="border-b border-borderSoft px-6 py-5">
        <h3 className="font-display text-2xl font-semibold text-textMain">
          Candidate Ranking
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Compare multiple uploaded resumes by overall fit and section scores.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-secondaryBg text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Overall</th>
              <th className="px-6 py-4">Skills</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Education</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id} className="border-t border-borderSoft text-sm">
                <td className="px-6 py-4 font-semibold text-textMain">#{result.rank}</td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-textMain">{result.filename}</p>
                  <p className="text-slate-500">Uploaded candidate</p>
                </td>
                <td className="px-6 py-4 font-semibold text-accentGold">
                  {result.overallScore}%
                </td>
                <td className="px-6 py-4 text-slate-600">{result.skillsScore}%</td>
                <td className="px-6 py-4 text-slate-600">{result.experienceScore}%</td>
                <td className="px-6 py-4 text-slate-600">{result.educationScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
