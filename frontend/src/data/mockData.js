const now = new Date();

export const mockResults = [
  {
    _id: "mock-analysis-1",
    filename: "Aarav_Sharma_Resume.pdf",
    jobDescription:
      "We need a React and Node.js engineer with API design, MongoDB, analytics dashboards, authentication, and cloud deployment experience.",
    overallScore: 88,
    skillsScore: 91,
    experienceScore: 86,
    educationScore: 82,
    strengths: [
      "Strong alignment with React, Node.js, MongoDB, and REST API requirements.",
      "Includes measurable delivery outcomes across recent roles.",
      "Resume summary quickly communicates full-stack fit for the position.",
      "Projects show ownership from design through deployment.",
      "Relevant technical stack appears consistently throughout the document.",
    ],
    improvements: [
      "Add clearer evidence of authentication or authorization ownership.",
      "Surface cloud deployment tools higher in the resume summary.",
      "Quantify team collaboration impact with one more metric-driven bullet.",
      "Include one recent example of performance optimization work.",
      "Mirror job description language around analytics and reporting.",
    ],
    matchedSkills: [
      "React",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "JWT",
      "Analytics",
      "Deployment",
    ],
    missingSkills: ["AWS", "CI/CD", "Testing"],
    aiFeedback: {
      skills:
        "The resume is well aligned with the job stack and demonstrates broad ownership across the full stack.",
      experience:
        "Experience reads as credible and impact-driven, though it can be pushed further with one or two more quantified wins.",
      education:
        "Education supports the role, but the resume's strongest signal is clearly the hands-on project and product delivery record.",
    },
    candidateSummary:
      "Aarav presents as a strong full-stack candidate with high stack alignment and a clear record of execution. Small refinements around deployment and testing language would make the profile even more competitive.",
    createdAt: new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
    rank: 1,
  },
  {
    _id: "mock-analysis-2",
    filename: "Naina_Verma_Resume.docx",
    jobDescription:
      "We need a React and Node.js engineer with API design, MongoDB, analytics dashboards, authentication, and cloud deployment experience.",
    overallScore: 81,
    skillsScore: 83,
    experienceScore: 79,
    educationScore: 80,
    strengths: [
      "Front-end and API work are both represented with relevant tools.",
      "Project descriptions communicate product thinking and collaboration.",
      "Resume is easy to skim and has a clear structure.",
      "Several core job keywords already appear naturally in context.",
      "Education and certifications are clearly presented.",
    ],
    improvements: [
      "Bring backend ownership examples closer to the top of the resume.",
      "Add stronger MongoDB or database optimization evidence.",
      "Quantify recent impact with traffic, revenue, or velocity metrics.",
      "Mention deployment workflows more explicitly.",
      "Expand on authentication, security, or permissions work.",
    ],
    matchedSkills: ["React", "JavaScript", "Node.js", "APIs", "UI", "Agile"],
    missingSkills: ["MongoDB", "JWT", "AWS", "Dashboarding"],
    aiFeedback: {
      skills:
        "The candidate covers many role fundamentals, but some stack keywords are lighter than the strongest profile would show.",
      experience:
        "Experience is relevant and transferable, especially for product-facing teams, though deeper backend examples would improve confidence.",
      education:
        "Education is a stable supporting signal and helps reinforce long-term fit.",
    },
    candidateSummary:
      "Naina looks like a well-rounded product engineer with good front-end strength and enough backend foundation to be viable for the role. A tighter emphasis on databases, auth, and deployment would lift the match score.",
    createdAt: new Date(now.getTime() - 1000 * 60 * 120).toISOString(),
    rank: 2,
  },
];

export const landingStats = [
  { label: "Average match clarity", value: "94%" },
  { label: "Time saved per review", value: "7h" },
  { label: "Resumes compared together", value: "10" },
  { label: "Actionable feedback sections", value: "6" },
];

export const features = [
  {
    title: "Weighted fit scoring",
    description:
      "Balance skills, experience, and education with custom weights that always total 100%.",
  },
  {
    title: "Multiple resume ranking",
    description:
      "Upload several resumes at once and instantly compare candidates side by side.",
  },
  {
    title: "Structured AI feedback",
    description:
      "Get strengths, improvement areas, matched skills, and missing skills in one clean view.",
  },
];

export const faqItems = [
  {
    question: "Which resume files are supported?",
    answer:
      "The app supports PDF and DOCX uploads. The backend extracts raw text and sends it to the analysis pipeline.",
  },
  {
    question: "What happens if the API is unavailable?",
    answer:
      "The frontend automatically falls back to a polished mock experience so the product remains fully explorable.",
  },
  {
    question: "Can I compare multiple candidates at once?",
    answer:
      "Yes. Upload multiple resumes in one analysis request and the results page will rank them by overall fit score.",
  },
];

export const techStack = [
  "React 18",
  "React Router v6",
  "Tailwind CSS",
  "Axios",
  "Express.js",
  "MongoDB + Mongoose",
  "JWT Auth",
  "Multer",
  "pdf-parse",
  "mammoth",
  "Claude Sonnet 4",
];
