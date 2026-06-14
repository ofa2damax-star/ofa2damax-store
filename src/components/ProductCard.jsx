import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ProductCard({ product, isSelected, onToggle }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => onToggle(product.id)}
      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-3 transition-all duration-200 shadow-sm
        ${product.color} 
        ${isSelected 
          ? `${product.borderColor} border-[3px] ring-4 ring-primary/20 shadow-lg` 
          : "border-transparent border-[3px] hover:shadow-md"
        }`}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-md"
        >
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </motion.div>
      )}
      <span className="text-4xl md:text-5xl drop-shadow-sm">{product.emoji}</span>
      <span className={`text-xs md:text-sm font-bold text-center leading-tight ${product.color?.includes('yellow') ? 'text-green-900' : 'text-white'}`} style={product.color?.includes('yellow') ? {} : { color: 'white' }}>
        {product.name}
      </span>
    </motion.button>
  );
}