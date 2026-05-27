export default function SkillsTags({ title, items, tone = "gold" }) {
  const toneClass =
    tone === "green"
      ? "bg-green-50 text-success border-green-100"
      : tone === "red"
        ? "bg-red-50 text-danger border-red-100"
        : "bg-accentSoft/60 text-textMain border-amber-100";

  return (
    <div className="rounded-[2rem] border border-borderSoft bg-white p-6 shadow-card">
      <h3 className="font-display text-2xl font-semibold text-textMain">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-3">
        {items?.length ? (
          items.map((item) => (
            <span
              key={item}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${toneClass}`}
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500">No items available.</p>
        )}
      </div>
    </div>
  );
}
