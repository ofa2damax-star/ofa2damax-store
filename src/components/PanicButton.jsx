import { useState } from "react";
import { motion } from "framer-motion";

export default function PanicButton() {
  const [pressCount, setPressCount] = useState(0);

  const handlePress = () => {
    const newCount = pressCount + 1;
    setPressCount(newCount);
    if (newCount >= 2) {
      setPressCount(0);
      window.location.href = "tel:911";
    } else {
      // Reset after 3 seconds if second press doesn't come
      setTimeout(() => setPressCount(0), 3000);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1">
      <motion.button
        onClick={handlePress}
        whileTap={{ scale: 0.9 }}
        animate={pressCount === 1 ? { scale: [1, 1.15, 1], backgroundColor: ["#dc2626", "#ff0000", "#dc2626"] } : {}}
        transition={{ duration: 0.3 }}
        className="w-16 h-16 rounded-full bg-red-600 border-4 border-red-400 shadow-lg shadow-red-500/50 flex items-center justify-center text-2xl active:bg-red-800"
        aria-label="Emergency 911 button - double tap to call"
      >
        <span aria-hidden="true">🚨</span>
      </motion.button>
      <span className="text-xs font-black text-red-600 text-center leading-tight w-16">
        {pressCount === 1 ? "PRESS\nAGAIN!" : "911"}
      </span>
    </div>
  );
}