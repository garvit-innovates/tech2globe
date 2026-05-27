import { ArrowRight, BarChart3, BrainCircuit, Files, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { features, landingStats } from "../data/mockData";

const howItWorksSteps = [
  {
    title: "Upload resumes",
    description: "Drop in PDF or DOCX files and paste the target job description.",
    icon: Files,
  },
  {
    title: "Weight what matters",
    description: "Tune skills, experience, and education so the scoring reflects your hiring priorities.",
    icon: BarChart3,
  },
  {
    title: "Get structured analysis",
    description: "Review fit scores, matched skills, gaps, and candidate ranking in a clean dashboard.",
    icon: BrainCircuit,
  },
];

export default function Landing() {
  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-borderSoft bg-white px-6 py-12 shadow-soft sm:px-10 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fadeUp">
            <span className="inline-flex items-center gap-2 rounded-full bg-accentSoft px-4 py-2 text-sm font-semibold text-textMain">
              <ShieldCheck size={16} className="text-accentGold" />
              Built for modern hiring teams and candidates
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-textMain sm:text-5xl lg:text-6xl">
              AI resume screening that feels precise, transparent, and fast.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Compare resumes against a job description, tune what matters most,
              and surface strong-fit candidates with structured AI feedback in minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accentGold px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Start analyzing <ArrowRight size={16} />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-borderSoft px-6 py-3.5 text-sm font-semibold text-textMain transition hover:bg-secondaryBg"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {landingStats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-borderSoft bg-secondaryBg p-6 shadow-card"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="font-display text-4xl font-bold text-textMain">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card"
          >
            <div className="h-12 w-12 rounded-2xl bg-accentSoft" />
            <h2 className="mt-5 font-display text-2xl font-semibold text-textMain">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-borderSoft bg-white p-6 shadow-card sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accentGold">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-textMain sm:text-4xl">
            A simple workflow with sharper screening outcomes
          </h2>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-[2rem] bg-secondaryBg p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-white p-3 text-accentGold shadow-card">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-semibold text-slate-400">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-textMain">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-borderSoft bg-textMain px-6 py-10 text-white shadow-soft sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Ready To Screen Faster?
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Launch the upload flow and start ranking candidates right away.
            </h2>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-textMain transition hover:bg-slate-100"
          >
            Open analyzer
          </Link>
        </div>
      </section>
    </div>
  );
}
