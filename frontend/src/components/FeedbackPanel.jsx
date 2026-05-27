import { BadgeCheck, Lightbulb, MessageSquareMore } from "lucide-react";

export default function FeedbackPanel({ analysis }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-accentSoft p-3 text-accentGold">
            <MessageSquareMore size={22} />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-textMain">
              AI Feedback
            </h3>
            <p className="text-sm text-slate-500">{analysis.candidateSummary}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          {[
            ["Skills", analysis.aiFeedback?.skills],
            ["Experience", analysis.aiFeedback?.experience],
            ["Education", analysis.aiFeedback?.education],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-secondaryBg p-4">
              <p className="font-display text-lg font-semibold text-textMain">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-green-50 p-3 text-success">
              <BadgeCheck size={22} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-textMain">
              Top Strengths
            </h3>
          </div>
          <ul className="mt-5 space-y-3">
            {analysis.strengths?.map((item) => (
              <li key={item} className="rounded-2xl bg-secondaryBg px-4 py-3 text-sm text-slate-600">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 p-3 text-accentGold">
              <Lightbulb size={22} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-textMain">
              Improvement Areas
            </h3>
          </div>
          <ul className="mt-5 space-y-3">
            {analysis.improvements?.map((item) => (
              <li key={item} className="rounded-2xl bg-secondaryBg px-4 py-3 text-sm text-slate-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
