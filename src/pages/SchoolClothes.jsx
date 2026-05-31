import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, School } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import SelectionDrawer from "@/components/SelectionDrawer";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const schoolItems = [
  { id: "polo_shirt", name: "Polo Shirt", emoji: "👔", color: "bg-blue-100", borderColor: "border-blue-300" },
  { id: "uniform_pants", name: "Uniform Pants", emoji: "👖", color: "bg-indigo-100", borderColor: "border-indigo-300" },
  { id: "uniform_skirt", name: "Uniform Skirt", emoji: "👗", color: "bg-pink-100", borderColor: "border-pink-300" },
  { id: "school_hoodie", name: "School Hoodie", emoji: "🧥", color: "bg-purple-100", borderColor: "border-purple-300" },
  { id: "school_jacket", name: "School Jacket", emoji: "🫱", color: "bg-sky-100", borderColor: "border-sky-300" },
  { id: "school_tshirt", name: "School T-Shirt", emoji: "👕", color: "bg-teal-100", borderColor: "border-teal-300" },
  { id: "gym_shorts", name: "Gym Shorts", emoji: "🩳", color: "bg-green-100", borderColor: "border-green-300" },
  { id: "gym_shirt", name: "Gym Shirt", emoji: "🏃", color: "bg-lime-100", borderColor: "border-lime-300" },
  { id: "school_hat", name: "School Cap", emoji: "🧢", color: "bg-yellow-100", borderColor: "border-yellow-300" },
  { id: "school_bag", name: "School Bag", emoji: "🎒", color: "bg-orange-100", borderColor: "border-orange-300" },
  { id: "school_socks", name: "School Socks", emoji: "🧦", color: "bg-rose-100", borderColor: "border-rose-300" },
  { id: "school_shoes", name: "School Shoes", emoji: "👟", color: "bg-amber-100", borderColor: "border-amber-300" },
];

export default function SchoolClothes() {
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [schoolColors, setSchoolColors] = useState("");
  const [logoRequest, setLogoRequest] = useState("");
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

        {/* School Logo Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-3xl p-5 border border-sky-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <School className="w-5 h-5 text-sky-600" />
            <h2 className="font-extrabold text-base text-sky-900">School Logo Details</h2>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="font-bold text-sm mb-1 block">School Name</Label>
              <Input
                placeholder="e.g. Lincoln Middle School"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="font-bold text-sm mb-1 block">School Colors</Label>
              <Input
                placeholder="e.g. Navy Blue & Gold"
                value={schoolColors}
                onChange={e => setSchoolColors(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="font-bold text-sm mb-1 block">Logo / Design Request</Label>
              <Input
                placeholder="e.g. School mascot on front, name on back"
                value={logoRequest}
                onChange={e => setLogoRequest(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
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
                  <span className="text-xs font-bold text-foreground/80 text-center leading-tight">
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
  );
}