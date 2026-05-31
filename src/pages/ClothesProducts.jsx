import { useState } from "react";
import { motion } from "framer-motion";
import { clothesProducts } from "@/lib/productData";
import ProductCard from "@/components/ProductCard";
import CategoryHeader from "@/components/CategoryHeader";
import SelectionDrawer from "@/components/SelectionDrawer";

export default function ClothesProducts() {
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
        title="Clothes"
        emoji="👕"
        selectedCount={selected.length}
        onViewPicks={() => setDrawerOpen(true)}
      />

      <div className="px-4 pt-5 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground font-semibold mb-6 text-sm"
        >
          Pick your favorite outfits! 👗
        </motion.p>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {clothesProducts.map((product, i) => (
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
        products={clothesProducts}
        onRemove={removeItem}
        onClear={() => setSelected([])}
        categoryName="Clothes"
      />
    </div>
  );
}