import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqItems, techStack } from "../data/mockData";

const timeline = [
  {
    title: "1. Upload and describe the role",
    body: "Candidates are uploaded as PDF or DOCX files, then paired with the target job description and scoring weights.",
  },
  {
    title: "2. Parse and normalize resume text",
    body: "The backend extracts clean text with pdf-parse and mammoth so each candidate can be evaluated consistently.",
  },
  {
    title: "3. Analyze against the role",
    body: "Claude Sonnet 4 compares each resume to the job description and returns structured JSON feedback for the app.",
  },
  {
    title: "4. Save, rank, and review",
    body: "Results are stored in MongoDB, ranked by overall score, and presented with section breakdowns and candidate history.",
  },
];

export default function HowItWorks() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-borderSoft bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
          Product Walkthrough
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-textMain">
          How the analyzer works from upload to ranking
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          This app combines a polished React experience with a protected MERN backend and structured Claude-powered analysis.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
          <h2 className="font-display text-3xl font-semibold text-textMain">Timeline</h2>
          <div className="mt-6 space-y-5">
            {timeline.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accentSoft font-display text-lg font-semibold text-textMain">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 ? (
                    <div className="mt-3 h-full w-px bg-borderSoft" />
                  ) : null}
                </div>
                <div className="pb-6">
                  <h3 className="font-display text-xl font-semibold text-textMain">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
          <h2 className="font-display text-3xl font-semibold text-textMain">Tech Stack</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {techStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-amber-100 bg-accentSoft/60 px-4 py-2 text-sm font-medium text-textMain"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
        <h2 className="font-display text-3xl font-semibold text-textMain">FAQ</h2>
        <div className="mt-6 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="rounded-[1.5rem] border border-borderSoft">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-xl font-semibold text-textMain">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-borderSoft px-5 py-4 text-sm leading-7 text-slate-600">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
