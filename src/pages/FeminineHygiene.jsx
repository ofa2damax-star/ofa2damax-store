import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import CategoryHeader from "@/components/CategoryHeader";
import SelectionDrawer from "@/components/SelectionDrawer";

const feminineProducts = [
  { id: "pads_regular", name: "Pads – Regular", emoji: "🌸", color: "bg-pink-100", borderColor: "border-pink-300" },
  { id: "pads_heavy", name: "Pads – Heavy", emoji: "🌺", color: "bg-rose-100", borderColor: "border-rose-300" },
  { id: "pads_overnight", name: "Pads – Overnight", emoji: "🌙", color: "bg-purple-100", borderColor: "border-purple-300" },
  { id: "pads_panty_liner", name: "Panty Liners", emoji: "🩷", color: "bg-fuchsia-100", borderColor: "border-fuchsia-300" },
  { id: "tampons_regular", name: "Tampons – Regular", emoji: "💜", color: "bg-violet-100", borderColor: "border-violet-300" },
  { id: "tampons_light", name: "Tampons – Light", emoji: "🪷", color: "bg-pink-100", borderColor: "border-pink-300" },
  { id: "tampons_super", name: "Tampons – Super", emoji: "💪", color: "bg-indigo-100", borderColor: "border-indigo-300" },
  { id: "period_underwear", name: "Period Underwear", emoji: "🩲", color: "bg-red-100", borderColor: "border-red-300" },
  { id: "pain_relief", name: "Pain Relief", emoji: "💊", color: "bg-orange-100", borderColor: "border-orange-300" },
  { id: "heating_pad", name: "Heating Pad", emoji: "🔥", color: "bg-amber-100", borderColor: "border-amber-300" },
  { id: "wet_wipes", name: "Feminine Wipes", emoji: "🧻", color: "bg-teal-100", borderColor: "border-teal-300" },
  { id: "period_cup", name: "Menstrual Cup", emoji: "🫙", color: "bg-cyan-100", borderColor: "border-cyan-300" },
];

export default function FeminineHygiene() {
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleItem = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const removeItem = (id) => {
    setSelected(prev => prev.filter(i => i !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <CategoryHeader
        title="Feminine Hygiene"
        emoji="🌸"
        selectedCount={selected.length}
        onViewPicks={() => setDrawerOpen(true)}
      />

      <div className="px-4 pt-5 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground font-semibold mb-6 text-sm"
        >
          Pick what you need — all private & safe 💜
        </motion.p>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {feminineProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
            >
              <ProductCard
                product={product}
                isSelected={selected.includes(product.id)}
                onToggle={toggleItem}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <SelectionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedItems={selected}
        products={feminineProducts}
        onRemove={removeItem}
        onClear={() => setSelected([])}
        categoryName="Feminine Hygiene"
      />
    </div>
  );
}