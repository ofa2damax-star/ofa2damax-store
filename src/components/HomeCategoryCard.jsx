import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeCategoryCard({ title, emoji, description, to, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
    >
      <Link to={to}>
        <motion.div
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className={`relative overflow-hidden rounded-3xl p-6 md:p-8 ${gradient} shadow-lg cursor-pointer`}
        >
          <div className="relative z-10">
            <span className="text-6xl md:text-7xl block mb-4 drop-shadow-md">{emoji}</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-1">{title}</h2>
            <p className="text-white/90 text-sm font-semibold">{description}</p>
            <div className="flex items-center gap-1 mt-4 text-white font-bold text-sm">
              Let's go! <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 text-[120px] opacity-10 rotate-12">
            {emoji}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}