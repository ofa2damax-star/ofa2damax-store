const CATEGORY_CONFIG = {
  hygiene:          { label: "Hygiene",          emoji: "🧼", className: "bg-purple-100 text-purple-800 border-purple-300" },
  clothes:          { label: "Clothes",           emoji: "👕", className: "bg-sky-100 text-sky-800 border-sky-300" },
  feminine_hygiene: { label: "Feminine Hygiene",  emoji: "🌸", className: "bg-pink-100 text-pink-800 border-pink-300" },
  school_clothes:   { label: "School Clothes",    emoji: "🏫", className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
};

export default function CategoryBadge({ category }) {
  const cfg = CATEGORY_CONFIG[category] || { label: category, emoji: "📦", className: "bg-gray-100 text-gray-800 border-gray-300" };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${cfg.className}`}>
      {cfg.emoji} {cfg.label}
    </span>
  );
}