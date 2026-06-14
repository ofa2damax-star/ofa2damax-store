import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";

/**
 * Mobile-friendly select that opens a bottom-sheet drawer on tap.
 * Props: options [{value, label}], value, onChange, className, placeholder
 */
export default function MobileSelect({ options = [], value, onChange, className = "", placeholder = "Select…" }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  const handlePick = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        className={`inline-flex items-center gap-1.5 select-none font-bold text-xs border border-slate-200 rounded-xl px-2 py-1 bg-white focus:outline-none cursor-pointer ${className}`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl pb-safe"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="p-4">
                <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between mb-3">
                  <p className="font-black text-slate-800 text-base">Select option</p>
                  <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {options.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handlePick(opt.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-colors select-none
                        ${value === opt.value ? "bg-primary text-primary-foreground" : "hover:bg-slate-100 text-slate-700"}`}
                    >
                      {opt.label}
                      {value === opt.value && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}