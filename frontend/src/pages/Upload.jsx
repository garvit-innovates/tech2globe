import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeResumes } from "../api/resumeApi";
import LoadingOverlay from "../components/LoadingOverlay";
import UploadZone from "../components/UploadZone";
import { useToast } from "../components/Toast";

const sliderLabels = {
  skills: "Skills",
  experience: "Experience",
  education: "Education",
};

function rebalanceWeights(currentWeights, key, nextValue) {
  const clampedValue = Math.max(0, Math.min(100, Number(nextValue)));
  const otherKeys = Object.keys(currentWeights).filter((item) => item !== key);
  const remaining = 100 - clampedValue;
  const currentOtherTotal = otherKeys.reduce(
    (total, item) => total + currentWeights[item],
    0
  );

  const updated = { ...currentWeights, [key]: clampedValue };

  if (currentOtherTotal === 0) {
    const evenSplit = Math.floor(remaining / otherKeys.length);
    otherKeys.forEach((item, index) => {
      updated[item] =
        index === otherKeys.length - 1
          ? remaining - evenSplit * index
          : evenSplit;
    });
    return updated;
  }

  let assigned = 0;
  otherKeys.forEach((item, index) => {
    if (index === otherKeys.length - 1) {
      updated[item] = remaining - assigned;
      return;
    }

    const proportionalValue = Math.round(
      (currentWeights[item] / currentOtherTotal) * remaining
    );
    updated[item] = proportionalValue;
    assigned += proportionalValue;
  });

  return updated;
}

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [weights, setWeights] = useState({
    skills: 40,
    experience: 35,
    education: 25,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAnalyze = async () => {
    if (!files.length) {
      showToast("Please upload at least one resume file.", "error");
      return;
    }

    if (!jobDescription.trim()) {
      showToast("Please paste the target job description before analyzing.", "error");
      return;
    }

    setIsAnalyzing(true);

    try {
      const results = await analyzeResumes({ files, jobDescription, weights });
      showToast("Analysis complete.");
      navigate("/results", { state: { results } });
    } catch (_error) {
      showToast("Unable to analyze the resumes right now.", "error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <LoadingOverlay
        isVisible={isAnalyzing}
        title="Analyzing resumes"
        subtitle="We’re parsing files, comparing them to the job description, and preparing ranked AI feedback."
      />

      <div className="space-y-8">
        <section className="rounded-[2.5rem] border border-borderSoft bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
            Resume Upload
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-textMain">
            Run a new candidate analysis
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Upload one or more resumes, paste the role requirements, and tune the scoring balance for skills, experience, and education.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <UploadZone files={files} onFilesChange={setFiles} />

          <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-accentSoft p-3 text-accentGold">
                <SlidersHorizontal size={20} />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-textMain">
                  Analysis Inputs
                </h2>
                <p className="text-sm text-slate-500">
                  Define the role and choose how the fit score should be weighted.
                </p>
              </div>
            </div>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-semibold text-textMain">
                Job description
              </span>
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                rows={10}
                className="w-full rounded-[1.5rem] border border-borderSoft bg-secondaryBg px-4 py-4 text-sm leading-6 outline-none transition focus:border-accentGold focus:bg-white"
                placeholder="Paste the target job description here..."
              />
            </label>

            <div className="mt-6 rounded-[1.5rem] bg-secondaryBg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-xl font-semibold text-textMain">
                    Weight sliders
                  </p>
                  <p className="text-sm text-slate-500">
                    Total always stays locked at 100%.
                  </p>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-textMain">
                  {Object.values(weights).reduce((sum, value) => sum + value, 0)}%
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {Object.entries(weights).map(([key, value]) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-textMain">{sliderLabels[key]}</span>
                      <span className="text-slate-500">{value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(event) =>
                        setWeights((current) =>
                          rebalanceWeights(current, key, event.target.value)
                        )
                      }
                      className="slider-gold h-2 w-full cursor-pointer appearance-none rounded-full bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              className="mt-6 w-full rounded-full bg-accentGold px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Analyze resumes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
