import apiClient from "./apiClient";
import { mockResults } from "../data/mockData";

const HISTORY_KEY = "resume-analyzer-history";
const LATEST_RESULTS_KEY = "resume-analyzer-latest-results";

function readLocalHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [...mockResults];
}

function writeLocalHistory(results) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(results));
}

function writeLatestResults(results) {
  localStorage.setItem(LATEST_RESULTS_KEY, JSON.stringify(results));
}

function generateMockResult(file, weights, jobDescription, index) {
  const fileName = file?.name || `Candidate_${index + 1}.pdf`;
  const extensionBias = fileName.toLowerCase().includes("senior") ? 7 : 0;
  const lengthBias = Math.min((file?.size || 120000) / 50000, 8);
  const overallScore = Math.min(
    96,
    Math.round(
      68 +
        extensionBias +
        lengthBias +
        weights.skills * 0.08 +
        weights.experience * 0.06 +
        weights.education * 0.03
    )
  );

  return {
    _id: `mock-${Date.now()}-${index}`,
    filename: fileName,
    jobDescription,
    overallScore,
    skillsScore: Math.min(98, overallScore + 3),
    experienceScore: Math.max(60, overallScore - 2),
    educationScore: Math.max(58, overallScore - 6),
    strengths: [
      "Resume structure is clean and recruiter-friendly.",
      "The profile contains relevant role language for fast screening.",
      "Candidate positioning feels credible for the target opening.",
      "Experience bullets leave a good foundation for interview follow-up.",
      "The file can be further strengthened with tighter JD alignment.",
    ],
    improvements: [
      "Add more measurable business outcomes to recent roles.",
      "Bring the most relevant stack keywords higher in the resume.",
      "Mirror job description phrasing more closely in the summary section.",
      "Include one clearer ownership example tied to delivery impact.",
      "Expand on tools or systems directly referenced in the role.",
    ],
    matchedSkills: [
      "Communication",
      "Delivery",
      "Ownership",
      "Product Thinking",
      "Problem Solving",
    ],
    missingSkills: ["Role-specific tooling", "Metrics", "Certifications"],
    aiFeedback: {
      skills:
        "The resume likely contains baseline alignment, but would benefit from more direct repetition of the role's target stack and capability language.",
      experience:
        "The candidate appears promising, though stronger quantified impact and ownership details would improve confidence.",
      education:
        "Education is a supporting signal here, and the profile would gain more from sharper role-specific tailoring than from academic changes.",
    },
    candidateSummary:
      "This is a polished fallback analysis generated locally so the experience remains usable even when the API is unavailable. The resume looks promising, and the biggest gains would come from tighter tailoring to the role.",
    createdAt: new Date().toISOString(),
  };
}

export async function analyzeResumes({ files, jobDescription, weights }) {
  const formData = new FormData();
  files.forEach((file) => formData.append("resumes", file));
  formData.append("jobDescription", jobDescription);
  formData.append("weights", JSON.stringify(weights));

  try {
    const response = await apiClient.post("/resume/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const results = (response.data.results || []).map((result, index) => ({
      ...result,
      rank: result.rank || index + 1,
    }));

    writeLocalHistory([...results, ...readLocalHistory()]);
    writeLatestResults(results);
    return results;
  } catch (error) {
    console.warn("Analyze API unavailable, using mock analysis fallback.", error);
    const fallbackResults = files
      .map((file, index) => generateMockResult(file, weights, jobDescription, index))
      .sort((first, second) => second.overallScore - first.overallScore)
      .map((result, index) => ({ ...result, rank: index + 1 }));

    writeLocalHistory([...fallbackResults, ...readLocalHistory()]);
    writeLatestResults(fallbackResults);
    return fallbackResults;
  }
}

export async function getHistory() {
  try {
    const response = await apiClient.get("/resume/history");
    const results = response.data.results || [];
    writeLocalHistory(results);
    return results;
  } catch (error) {
    console.warn("History API unavailable, using local fallback.", error);
    return readLocalHistory();
  }
}

export async function getAnalysisById(id) {
  try {
    const response = await apiClient.get(`/resume/analysis/${id}`);
    return response.data.result;
  } catch (error) {
    console.warn("Analysis API unavailable, using local fallback.", error);
    return readLocalHistory().find((item) => item._id === id) || mockResults[0];
  }
}

export async function deleteAnalysis(id) {
  try {
    await apiClient.delete(`/resume/analysis/${id}`);
  } catch (error) {
    console.warn("Delete API unavailable, deleting from local fallback only.", error);
  }

  const nextHistory = readLocalHistory().filter((item) => item._id !== id);
  writeLocalHistory(nextHistory);
  writeLatestResults(nextHistory.slice(0, 10));
  return nextHistory;
}

export function getCachedLatestResults() {
  const raw = localStorage.getItem(LATEST_RESULTS_KEY);
  return raw ? JSON.parse(raw) : [...mockResults];
}
