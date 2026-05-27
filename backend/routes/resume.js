const express = require("express");
const multer = require("multer");

const Analysis = require("../models/Analysis");
const authMiddleware = require("../middleware/authMiddleware");
const analyzeResume = require("../utils/analyzer");
const parseFile = require("../utils/parseFile");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    const error = new Error("Only PDF and DOCX files are allowed.");
    error.statusCode = 400;
    cb(error);
  },
});

function normalizeWeights(rawWeights) {
  const defaults = {
    skills: 40,
    experience: 35,
    education: 25,
  };

  if (!rawWeights) {
    return defaults;
  }

  const parsed =
    typeof rawWeights === "string" ? JSON.parse(rawWeights) : rawWeights;

  const weights = {
    skills: Number(parsed.skills) || 0,
    experience: Number(parsed.experience) || 0,
    education: Number(parsed.education) || 0,
  };

  const total = weights.skills + weights.experience + weights.education;

  if (total !== 100) {
    const error = new Error("Skills, experience, and education weights must total 100.");
    error.statusCode = 400;
    throw error;
  }

  return weights;
}

router.post(
  "/analyze",
  authMiddleware,
  upload.array("resumes", 10),
  async (req, res) => {
    const files = req.files || [];
    const jobDescription = String(req.body.jobDescription || "").trim();
    const weights = normalizeWeights(req.body.weights);

    if (!files.length) {
      return res.status(400).json({ message: "At least one resume file is required." });
    }

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required." });
    }

    const analyses = [];

    for (const file of files) {
      const resumeText = await parseFile(file);

      if (!resumeText) {
        const error = new Error(`No readable text found in ${file.originalname}.`);
        error.statusCode = 400;
        throw error;
      }

      const aiResult = await analyzeResume({
        resumeText,
        jobDescription,
        weights,
        filename: file.originalname,
      });

      const savedAnalysis = await Analysis.create({
        userId: req.user.id,
        filename: file.originalname,
        jobDescription,
        overallScore: aiResult.overall_score,
        skillsScore: aiResult.skills_score,
        experienceScore: aiResult.experience_score,
        educationScore: aiResult.education_score,
        strengths: aiResult.strengths,
        improvements: aiResult.improvements,
        matchedSkills: aiResult.matched_skills,
        missingSkills: aiResult.missing_skills,
        aiFeedback: aiResult.ai_feedback,
        candidateSummary: aiResult.candidate_summary,
      });

      analyses.push(savedAnalysis.toObject());
    }

    const rankedResults = analyses
      .sort((first, second) => second.overallScore - first.overallScore)
      .map((analysis, index) => ({
        ...analysis,
        rank: index + 1,
      }));

    return res.status(201).json({ results: rankedResults });
  }
);

router.get("/history", authMiddleware, async (req, res) => {
  const analyses = await Analysis.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  return res.json({ results: analyses });
});

router.get("/analysis/:id", authMiddleware, async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!analysis) {
    return res.status(404).json({ message: "Analysis not found." });
  }

  return res.json({ result: analysis });
});

router.delete("/analysis/:id", authMiddleware, async (req, res) => {
  const analysis = await Analysis.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!analysis) {
    return res.status(404).json({ message: "Analysis not found." });
  }

  return res.json({ message: "Analysis deleted successfully." });
});

module.exports = router;
