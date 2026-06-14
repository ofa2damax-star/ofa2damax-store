import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import SelectionDrawer from "@/components/SelectionDrawer";
import PullToRefresh from "@/components/PullToRefresh";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const schoolItems = [
  { id: "polo_shirt", name: "Polo Shirt", emoji: "👔", color: "bg-green-700", borderColor: "border-yellow-400" },
  { id: "uniform_pants", name: "Uniform Pants", emoji: "👖", color: "bg-green-800", borderColor: "border-yellow-400" },
  { id: "uniform_skirt", name: "Uniform Skirt", emoji: "👗", color: "bg-yellow-400", borderColor: "border-green-700" },
  { id: "school_hoodie", name: "School Hoodie", emoji: "🧥", color: "bg-green-700", borderColor: "border-yellow-400" },
  { id: "school_jacket", name: "School Jacket", emoji: "🫱", color: "bg-green-800", borderColor: "border-yellow-400" },
  { id: "school_tshirt", name: "School T-Shirt", emoji: "👕", color: "bg-yellow-400", borderColor: "border-green-700" },
  { id: "gym_shorts", name: "Gym Shorts", emoji: "🩳", color: "bg-green-700", borderColor: "border-yellow-400" },
  { id: "gym_shirt", name: "Gym Shirt", emoji: "🏃", color: "bg-yellow-400", borderColor: "border-green-700" },
  { id: "school_hat", name: "School Cap", emoji: "🧢", color: "bg-green-800", borderColor: "border-yellow-400" },
  { id: "school_bag", name: "School Bag", emoji: "🎒", color: "bg-yellow-400", borderColor: "border-green-700" },
  { id: "school_socks", name: "School Socks", emoji: "🧦", color: "bg-green-700", borderColor: "border-yellow-400" },
  { id: "school_shoes", name: "School Shoes", emoji: "👟", color: "bg-green-800", borderColor: "border-yellow-400" },
  { id: "pencils", name: "Pencils", emoji: "✏️", color: "bg-yellow-400", borderColor: "border-green-700" },
  { id: "paper", name: "Paper", emoji: "📄", color: "bg-green-700", borderColor: "border-yellow-400" },
  { id: "pens", name: "Pens", emoji: "🖊️", color: "bg-green-800", borderColor: "border-yellow-400" },
  { id: "folders", name: "Folders", emoji: "📁", color: "bg-yellow-400", borderColor: "border-green-700" },
  { id: "binders", name: "Binders", emoji: "📒", color: "bg-green-700", borderColor: "border-yellow-400" },
];

export default function SchoolClothes() {
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sizeSelections, setSizeSelections] = useState({});

  const toggleItem = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const removeItem = (id) => {
    setSelected(prev => prev.filter(i => i !== id));
  };

  const setSize = (itemId, size) => {
    setSizeSelections(prev => ({ ...prev, [itemId]: size }));
  };

  return (
    <PullToRefresh onRefresh={() => Promise.resolve()}>
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏫</span>
              <h1 className="text-lg font-extrabold">School Clothes</h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-2 font-bold"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingBag className="w-4 h-4" />
            My Picks
            {selected.length > 0 && (
              <Badge className="bg-primary text-primary-foreground rounded-full px-2 py-0 text-xs">
                {selected.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="px-4 pt-5 max-w-2xl mx-auto space-y-6">

        {/* Kearns Cougars Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-700 to-green-800 rounded-3xl p-5 border-2 border-yellow-400 text-center shadow-lg"
        >
          <div className="text-4xl mb-2">🐆</div>
          <h2 className="font-black text-xl text-yellow-400 tracking-wide">Kearns Cougars</h2>
          <p className="text-yellow-300 font-bold text-sm mt-1">School Clothes · Green & Gold</p>
        </motion.div>

        {/* Items Grid */}
        <div>
          <p className="text-center text-muted-foreground font-semibold mb-4 text-sm">
            Tap items to select, then pick your size 🏫
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {schoolItems.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: "spring" }}
                className="flex flex-col gap-1"
              >
                {/* Item card */}
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => toggleItem(product.id)}
                  className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-[3px] transition-all duration-200 shadow-sm
                    ${product.color}
                    ${selected.includes(product.id)
                      ? `${product.borderColor} ring-4 ring-primary/20 shadow-lg`
                      : "border-transparent hover:shadow-md"
                    }`}
                >
                  {selected.includes(product.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-md"
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </motion.div>
                  )}
                  <span className="text-4xl drop-shadow-sm">{product.emoji}</span>
                  <span className={`text-xs font-bold text-center leading-tight ${product.color.includes('yellow') ? 'text-green-900' : 'text-white'}`}>
                    {product.name}
                  </span>
                </motion.button>

                {/* Size selector (shows when selected) */}
                {selected.includes(product.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-wrap gap-1 justify-center"
                  >
                    {SIZES.map(size => (
                      <button
                        key={size}
                        onClick={() => setSize(product.id, size)}
                        className={`text-xs px-2 py-0.5 rounded-full font-bold border transition-all
                          ${sizeSelections[product.id] === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border text-foreground/70 hover:border-primary"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <SelectionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedItems={selected}
        products={schoolItems}
        onRemove={removeItem}
        onClear={() => setSelected([])}
        categoryName="School Clothes"
      />
    </div>
    </PullToRefresh>
  );
}