import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CandidateTable from "../components/CandidateTable";
import FeedbackPanel from "../components/FeedbackPanel";
import ScoreCard from "../components/ScoreCard";
import ScoreRing from "../components/ScoreRing";
import SkillsTags from "../components/SkillsTags";
import { getCachedLatestResults } from "../api/resumeApi";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");

  const results = useMemo(() => {
    const incoming = location.state?.results;
    return incoming?.length ? incoming : getCachedLatestResults();
  }, [location.state?.results]);

  useEffect(() => {
    if (results.length) {
      setSelectedId(results[0]._id);
    }
  }, [results]);

  const selectedAnalysis =
    results.find((item) => item._id === selectedId) || results[0] || null;

  if (!selectedAnalysis) {
    return (
      <div className="rounded-[2rem] border border-borderSoft bg-white p-8 text-center shadow-card">
        <h1 className="font-display text-3xl font-semibold text-textMain">
          No analysis available yet
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Run an upload first and we’ll show the ranked results here.
        </p>
        <button
          type="button"
          onClick={() => navigate("/upload")}
          className="mt-6 rounded-full bg-accentGold px-6 py-3 text-sm font-semibold text-white"
        >
          Go to upload
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-borderSoft bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
              Analysis Results
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-textMain">
              {selectedAnalysis.filename}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Review the overall fit score, section-level breakdown, strengths, improvement areas, and ranked candidate comparison.
            </p>
          </div>

          {results.length > 1 ? (
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="rounded-full border border-borderSoft bg-secondaryBg px-5 py-3 text-sm font-semibold text-textMain outline-none"
            >
              {results.map((result) => (
                <option key={result._id} value={result._id}>
                  #{result.rank || 1} {result.filename}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ScoreRing score={selectedAnalysis.overallScore} />
        <div className="grid gap-5">
          <ScoreCard
            title="Skills Fit"
            score={selectedAnalysis.skillsScore}
            description="How closely the resume's capabilities align with the job requirements."
            delay={120}
          />
          <ScoreCard
            title="Experience Fit"
            score={selectedAnalysis.experienceScore}
            description="How well the candidate's background and delivery history support the role."
            delay={240}
          />
          <ScoreCard
            title="Education Fit"
            score={selectedAnalysis.educationScore}
            description="How strongly education and credentials support the position."
            delay={360}
          />
        </div>
      </div>

      <FeedbackPanel analysis={selectedAnalysis} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SkillsTags
          title="Matched Skills"
          items={selectedAnalysis.matchedSkills}
          tone="green"
        />
        <SkillsTags
          title="Missing Skills"
          items={selectedAnalysis.missingSkills}
          tone="red"
        />
      </div>

      {results.length > 1 ? <CandidateTable results={results} /> : null}
    </div>
  );
}
