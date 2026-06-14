import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CONFETTI_EMOJIS = ["🎉", "⭐", "🌟", "✨", "🎊", "💫", "🌈", "🎈"];

function ConfettiPiece({ emoji, index }) {
  const x = Math.random() * 100;
  const delay = Math.random() * 0.6;
  const duration = 1.5 + Math.random() * 1;

  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={{ left: `${x}%`, top: "-10%" }}
      initial={{ y: 0, opacity: 1, rotate: 0 }}
      animate={{ y: "120vh", opacity: [1, 1, 0], rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
      transition={{ duration, delay, ease: "easeIn" }}
    >
      {emoji}
    </motion.div>
  );
}

export default function SubmitConfirmation({ isOpen, onClose, selectedProducts, categoryName }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const newPieces = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
      }));
      setPieces(newPieces);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >
          {/* Confetti */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {pieces.map((p) => (
              <ConfettiPiece key={p.id} emoji={p.emoji} index={p.id} />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-border"
          >
            {/* Big checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-primary/20 rounded-full p-4">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="text-3xl font-black mb-1">You Did It! 🎉</h2>
              <p className="text-muted-foreground font-semibold text-sm mb-5">
                Your picks have been sent to the office!
              </p>
            </motion.div>

            {/* Selected items list */}
            {selectedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-muted/50 rounded-2xl p-4 mb-5 text-left max-h-48 overflow-y-auto"
              >
                <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">
                  🛍 Your {categoryName} picks:
                </p>
                <div className="space-y-1.5">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-2">
                      <span className="text-xl">{product.emoji}</span>
                      <span className="font-bold text-sm">{product.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Fun message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="bg-gradient-to-r from-primary/10 to-accent/20 rounded-2xl p-3 mb-6"
            >
              <p className="text-sm font-bold">
                📬 The office will take care of the rest. We've got you! 💪
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col gap-3"
            >
              <Button
                onClick={onClose}
                className="w-full rounded-2xl h-12 font-extrabold text-base"
              >
                Pick More Stuff 🛒
              </Button>
              <Link to="/" className="w-full">
                <Button variant="outline" className="w-full rounded-2xl h-12 font-bold gap-2">
                  <Home className="w-4 h-4" /> Go Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}