import { useEffect, useState } from "react";

export default function ScoreCard({ title, score, delay = 0, description }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setWidth(score);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, score]);

  return (
    <div className="rounded-[1.75rem] border border-borderSoft bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-textMain">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <span className="rounded-full bg-accentSoft px-3 py-1 text-sm font-semibold text-textMain">
          {score}%
        </span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondaryBg">
        <div
          className="h-full rounded-full bg-accentGold transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
