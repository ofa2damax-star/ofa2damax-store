import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import CategoryHeader from "@/components/CategoryHeader";
import SelectionDrawer from "@/components/SelectionDrawer";
import PullToRefresh from "@/components/PullToRefresh";

const feminineProducts = [
  { id: "pads_regular", name: "Pads – Regular", emoji: "🌸", color: "bg-pink-500", borderColor: "border-purple-400" },
  { id: "pads_heavy", name: "Pads – Heavy", emoji: "🌺", color: "bg-purple-600", borderColor: "border-pink-400" },
  { id: "pads_overnight", name: "Pads – Overnight", emoji: "🌙", color: "bg-pink-600", borderColor: "border-purple-400" },
  { id: "pads_panty_liner", name: "Panty Liners", emoji: "🩷", color: "bg-fuchsia-500", borderColor: "border-pink-400" },
  { id: "tampons_regular", name: "Tampons – Regular", emoji: "💜", color: "bg-purple-600", borderColor: "border-fuchsia-400" },
  { id: "tampons_light", name: "Tampons – Light", emoji: "🪷", color: "bg-pink-500", borderColor: "border-purple-400" },
  { id: "tampons_super", name: "Tampons – Super", emoji: "💪", color: "bg-fuchsia-600", borderColor: "border-pink-400" },
  { id: "period_underwear", name: "Period Underwear", emoji: "🩲", color: "bg-purple-500", borderColor: "border-fuchsia-400" },
  { id: "pain_relief", name: "Pain Relief", emoji: "💊", color: "bg-pink-600", borderColor: "border-purple-400" },
  { id: "heating_pad", name: "Heating Pad", emoji: "🔥", color: "bg-fuchsia-500", borderColor: "border-pink-400" },
  { id: "wet_wipes", name: "Feminine Wipes", emoji: "🧻", color: "bg-purple-500", borderColor: "border-fuchsia-400" },
  { id: "period_cup", name: "Menstrual Cup", emoji: "🫙", color: "bg-pink-500", borderColor: "border-purple-400" },
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
    <PullToRefresh onRefresh={() => Promise.resolve()}>
    <div className="min-h-screen bg-background pb-8 safe-inset">
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
    </PullToRefresh>
  );
}