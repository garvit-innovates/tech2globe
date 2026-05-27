const path = require("path");

const MODEL_NAME = "claude-sonnet-4-20250514";
const STOP_WORDS = new Set([
  "able",
  "about",
  "across",
  "after",
  "against",
  "along",
  "also",
  "analysis",
  "analyst",
  "and",
  "application",
  "apps",
  "are",
  "backend",
  "business",
  "candidate",
  "collaborate",
  "communication",
  "company",
  "data",
  "deliver",
  "design",
  "development",
  "engineer",
  "engineering",
  "ensure",
  "experience",
  "familiarity",
  "focused",
  "for",
  "frontend",
  "from",
  "good",
  "have",
  "highly",
  "ideal",
  "improve",
  "including",
  "into",
  "job",
  "knowledge",
  "looking",
  "must",
  "need",
  "nice",
  "our",
  "plus",
  "preferred",
  "product",
  "quality",
  "responsible",
  "role",
  "skills",
  "software",
  "solutions",
  "strong",
  "team",
  "their",
  "they",
  "this",
  "tools",
  "using",
  "with",
  "work",
  "years",
]);

let anthropicClient = null;

try {
  const anthropicModule = require("anthropic");
  const Anthropic =
    anthropicModule.Anthropic || anthropicModule.default || anthropicModule;

  if (process.env.ANTHROPIC_API_KEY && typeof Anthropic === "function") {
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
} catch (_error) {
  anthropicClient = null;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function uniqueArray(items, count = 10) {
  return [...new Set(items.filter(Boolean))].slice(0, count);
}

function extractJson(text) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Claude response did not include valid JSON.");
  }

  return text.slice(firstBrace, lastBrace + 1);
}

function normalizeAnalysis(analysis, fallback) {
  return {
    overall_score: clampScore(analysis.overall_score ?? fallback.overall_score),
    skills_score: clampScore(analysis.skills_score ?? fallback.skills_score),
    experience_score: clampScore(
      analysis.experience_score ?? fallback.experience_score
    ),
    education_score: clampScore(
      analysis.education_score ?? fallback.education_score
    ),
    strengths: uniqueArray(
      Array.isArray(analysis.strengths) ? analysis.strengths : fallback.strengths,
      5
    ),
    improvements: uniqueArray(
      Array.isArray(analysis.improvements)
        ? analysis.improvements
        : fallback.improvements,
      5
    ),
    matched_skills: uniqueArray(
      Array.isArray(analysis.matched_skills)
        ? analysis.matched_skills
        : fallback.matched_skills,
      12
    ),
    missing_skills: uniqueArray(
      Array.isArray(analysis.missing_skills)
        ? analysis.missing_skills
        : fallback.missing_skills,
      12
    ),
    ai_feedback: {
      skills:
        analysis.ai_feedback?.skills ||
        fallback.ai_feedback.skills,
      experience:
        analysis.ai_feedback?.experience ||
        fallback.ai_feedback.experience,
      education:
        analysis.ai_feedback?.education ||
        fallback.ai_feedback.education,
    },
    candidate_summary:
      typeof analysis.candidate_summary === "string" &&
      analysis.candidate_summary.trim()
        ? analysis.candidate_summary.trim()
        : fallback.candidate_summary,
  };
}

function extractKeywords(text) {
  const matches = text.match(/[A-Za-z][A-Za-z0-9+.#-]{2,}/g) || [];

  return uniqueArray(
    matches
      .map((word) => word.trim())
      .filter((word) => !STOP_WORDS.has(word.toLowerCase())),
    24
  );
}

function buildHeuristicAnalysis({ resumeText, jobDescription, weights, filename }) {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();
  const jdKeywords = extractKeywords(jobDescription);
  const matchedSkills = jdKeywords.filter((skill) =>
    resumeLower.includes(skill.toLowerCase())
  );
  const missingSkills = jdKeywords.filter(
    (skill) => !resumeLower.includes(skill.toLowerCase())
  );

  const resumeLines = resumeText.split(/[.!?\n]/).map((line) => line.trim()).filter(Boolean);
  const topResumeSignals = uniqueArray(
    resumeLines.filter((line) => line.length > 40).slice(0, 10),
    10
  );

  const skillMatchRatio =
    jdKeywords.length > 0 ? matchedSkills.length / jdKeywords.length : 0.7;
  const yearsMentioned = (resumeText.match(/\b\d+\+?\s+years?\b/gi) || []).length;
  const hasEducationKeywords =
    /\b(bachelor|master|b\.tech|m\.tech|degree|university|college|certification)\b/i.test(
      resumeText
    );
  const actionVerbsCount = (resumeText.match(/\b(led|built|created|designed|launched|improved|optimized|managed|developed|implemented)\b/gi) || []).length;
  const jdActionKeywordsCount = (jdLower.match(/\b(lead|build|design|develop|optimize|collaborate|analyze|manage)\b/gi) || []).length;

  const skillsScore = clampScore(45 + skillMatchRatio * 50);
  const experienceScore = clampScore(
    40 + Math.min(yearsMentioned * 8, 24) + Math.min(actionVerbsCount * 2, 18)
  );
  const educationScore = clampScore(
    hasEducationKeywords ? 72 + Math.min(actionVerbsCount, 10) : 48
  );

  const weightedOverall =
    (skillsScore * weights.skills +
      experienceScore * weights.experience +
      educationScore * weights.education) /
    100;

  const strengths = uniqueArray(
    [
      matchedSkills.length
        ? `Matches ${matchedSkills.length} relevant job keywords including ${matchedSkills
            .slice(0, 3)
            .join(", ")}.`
        : "",
      topResumeSignals[0]
        ? `Resume highlights measurable experience: "${topResumeSignals[0]}".`
        : "",
      actionVerbsCount >= 3
        ? "Uses strong action-driven language that signals ownership and delivery."
        : "Presents a clear career narrative that is easy for recruiters to scan.",
      yearsMentioned
        ? "Mentions time-in-role signals, which helps validate depth of experience."
        : "Shows transferable experience that can be tailored for the target role.",
      hasEducationKeywords
        ? "Includes educational or certification context to support foundational fit."
        : "Leaves room to strengthen academic or certification context if relevant.",
    ],
    5
  );

  const improvements = uniqueArray(
    [
      missingSkills[0]
        ? `Add evidence around ${missingSkills[0]} if you have hands-on exposure.`
        : "Tailor the resume keywords more tightly to the job description.",
      missingSkills[1]
        ? `Surface ${missingSkills[1]} closer to the top summary or recent experience.`
        : "Quantify impact with stronger metrics across recent roles.",
      yearsMentioned === 0
        ? "Mention years of experience or tenure for relevant roles."
        : "Add more quantified outcomes to strengthen credibility.",
      !hasEducationKeywords
        ? "Include degree, certification, or coursework details when applicable."
        : "Align education details more directly with the target position.",
      jdActionKeywordsCount > actionVerbsCount
        ? "Mirror the job description's execution language more closely."
        : "Use a sharper role summary to connect experience to the target opening.",
    ],
    5
  );

  const safeFilename = path.basename(filename, path.extname(filename));

  return {
    overall_score: clampScore(weightedOverall),
    skills_score: skillsScore,
    experience_score: experienceScore,
    education_score: educationScore,
    strengths,
    improvements,
    matched_skills: matchedSkills,
    missing_skills: missingSkills.slice(0, 12),
    ai_feedback: {
      skills: matchedSkills.length
        ? `The resume lines up with several core skills from the role, especially around ${matchedSkills
            .slice(0, 4)
            .join(", ")}.`
        : "The resume needs stronger keyword alignment with the role's core skill expectations.",
      experience:
        yearsMentioned || actionVerbsCount
          ? "Experience reads credibly, but it would be even stronger with more measurable outcomes tied to responsibilities."
          : "Experience should be made more concrete with project outcomes, role scope, and business impact.",
      education: hasEducationKeywords
        ? "Education appears supportive, though it can be positioned more clearly if the role values formal credentials."
        : "Education is either missing or under-emphasized relative to the expectations in this role.",
    },
    candidate_summary: `${safeFilename} appears to be a credible candidate with an estimated ${clampScore(
      weightedOverall
    )}% fit against the target job description. The strongest opportunities are to sharpen keyword alignment and make recent impact more measurable.`,
  };
}

async function callClaudeAnalysis({ resumeText, jobDescription, weights, filename }) {
  const systemPrompt =
    "You are an expert HR analyst. Analyze the resume against the job description. Return ONLY valid JSON, no extra text.";

  const userPrompt = [
    `Resume filename: ${filename}`,
    `Weights: ${JSON.stringify(weights)}`,
    "Return JSON using exactly these keys:",
    '{"overall_score":0,"skills_score":0,"experience_score":0,"education_score":0,"strengths":[],"improvements":[],"matched_skills":[],"missing_skills":[],"ai_feedback":{"skills":"","experience":"","education":""},"candidate_summary":""}',
    `Job description:\n${jobDescription}`,
    `Resume text:\n${resumeText}`,
  ].join("\n\n");

  const response = await anthropicClient.messages.create({
    model: MODEL_NAME,
    max_tokens: 1400,
    temperature: 0.2,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const responseText = response.content
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n")
    .trim();

  return JSON.parse(extractJson(responseText));
}

async function analyzeResume({ resumeText, jobDescription, weights, filename }) {
  const fallback = buildHeuristicAnalysis({
    resumeText,
    jobDescription,
    weights,
    filename,
  });

  if (!anthropicClient || !process.env.ANTHROPIC_API_KEY) {
    return fallback;
  }

  try {
    const aiAnalysis = await callClaudeAnalysis({
      resumeText,
      jobDescription,
      weights,
      filename,
    });

    return normalizeAnalysis(aiAnalysis, fallback);
  } catch (error) {
    console.error("Claude analysis failed, using heuristic fallback:", error.message);
    return fallback;
  }
}

module.exports = analyzeResume;
