import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SelectionDrawer({ isOpen, onClose, selectedItems, products, onRemove, onClear }) {
  const selectedProducts = products.filter(p => selectedItems.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-50 max-h-[70vh] overflow-hidden"
          >
            <div className="p-5">
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-extrabold">My Picks</h2>
                </div>
                <div className="flex gap-2">
                  {selectedProducts.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive text-xs">
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[50vh] pb-4">
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-10">
                    <span className="text-5xl block mb-3">🛒</span>
                    <p className="text-muted-foreground font-semibold">No items picked yet!</p>
                    <p className="text-muted-foreground text-sm mt-1">Tap items to add them here</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`flex items-center gap-3 p-3 rounded-xl ${product.color}`}
                      >
                        <span className="text-2xl">{product.emoji}</span>
                        <span className="font-bold flex-1">{product.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-destructive/10"
                          onClick={() => onRemove(product.id)}
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}