export default function LoadingOverlay({ isVisible, title, subtitle }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-borderSoft bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accentSoft/60">
          <div className="h-12 w-12 animate-pulseGlow rounded-full border-4 border-accentGold border-t-transparent" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-textMain">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}
