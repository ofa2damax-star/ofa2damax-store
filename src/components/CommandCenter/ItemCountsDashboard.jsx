import { hygieneProducts, clothesProducts } from "@/lib/productData";

const feminineProducts = [
  { id: "pads", name: "Pads", emoji: "🩸" },
  { id: "tampons", name: "Tampons", emoji: "🌸" },
  { id: "panty_liners", name: "Panty Liners", emoji: "💜" },
  { id: "pain_relief", name: "Pain Relief", emoji: "💊" },
  { id: "heating_pad", name: "Heating Pad", emoji: "🔥" },
  { id: "wipes", name: "Wipes", emoji: "🧻" },
  { id: "underwear_fem", name: "Period Underwear", emoji: "🩲" },
  { id: "chocolate", name: "Chocolate", emoji: "🍫" },
];

const schoolProducts = [
  { id: "tshirt_school", name: "T-Shirt", emoji: "👕" },
  { id: "hoodie_school", name: "Hoodie", emoji: "🧥" },
  { id: "pants_school", name: "Pants", emoji: "👖" },
  { id: "shorts_school", name: "Shorts", emoji: "🩳" },
  { id: "hat_school", name: "Hat", emoji: "🧢" },
  { id: "jacket_school", name: "Jacket", emoji: "🫱" },
];

const SECTIONS = [
  { key: "hygiene",          label: "Hygiene",          emoji: "🧼", color: "from-purple-50 to-purple-100", border: "border-purple-200", badge: "bg-purple-600", products: hygieneProducts },
  { key: "clothes",          label: "Clothes",           emoji: "👕", color: "from-sky-50 to-sky-100",    border: "border-sky-200",    badge: "bg-sky-600",    products: clothesProducts },
  { key: "feminine_hygiene", label: "Feminine Hygiene",  emoji: "🌸", color: "from-pink-50 to-pink-100",  border: "border-pink-200",   badge: "bg-pink-600",   products: feminineProducts },
  { key: "school_clothes",   label: "School Clothes",    emoji: "🏫", color: "from-emerald-50 to-emerald-100", border: "border-emerald-200", badge: "bg-emerald-600", products: schoolProducts },
];

function countItems(submissions, categoryKey, products) {
  const counts = {};
  submissions
    .filter(s => s.category === categoryKey)
    .forEach(s => {
      (s.items || []).forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
      });
    });

  return products
    .map(p => ({ ...p, count: counts[p.id] || 0 }))
    .filter(p => p.count > 0)
    .sort((a, b) => b.count - a.count);
}

function CategoryItemCounts({ section, submissions }) {
  const items = countItems(submissions, section.key, section.products);
  const totalRequests = submissions.filter(s => s.category === section.key).length;

  return (
    <div className={`bg-gradient-to-br ${section.color} border ${section.border} rounded-2xl p-5`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
          <span className="text-xl">{section.emoji}</span>
          {section.label}
        </h3>
        <span className="text-xs font-bold text-slate-500">{totalRequests} order{totalRequests !== 1 ? "s" : ""}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 italic text-center py-4">No items requested yet</p>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-white/70 rounded-xl px-3 py-2 shadow-sm">
              <span className="text-lg">{item.emoji}</span>
              <span className="flex-1 text-sm font-bold text-slate-700">{item.name}</span>
              <span className={`${section.badge} text-white text-xs font-black px-2.5 py-1 rounded-full min-w-[2rem] text-center`}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ItemCountsDashboard({ submissions }) {
  const totalItems = submissions.reduce((acc, s) => acc + (s.items?.length || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
          Total items requested across all orders: <span className="text-slate-700">{totalItems}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SECTIONS.map(section => (
          <CategoryItemCounts key={section.key} section={section} submissions={submissions} />
        ))}
      </div>
    </div>
  );
}