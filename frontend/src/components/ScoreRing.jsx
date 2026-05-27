import { useEffect, useMemo, useState } from "react";

export default function ScoreRing({ score, label = "Overall Match" }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = 72;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let frameId = 0;
    let startTime = 0;
    const duration = 1100;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayScore(Math.round(progress * score));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    setDisplayScore(0);
    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [score]);

  const dashOffset = useMemo(
    () => circumference - (displayScore / 100) * circumference,
    [circumference, displayScore]
  );

  return (
    <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
      <div className="flex flex-col items-center justify-center">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={stroke}
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="-mt-28 text-center">
          <p className="font-display text-5xl font-bold text-textMain">{displayScore}</p>
          <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
