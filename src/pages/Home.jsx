import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HomeCategoryCard from "@/components/HomeCategoryCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden px-4 pt-12 pb-8 md:pt-16 md:pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-6xl md:text-7xl mb-4 inline-block"
          >
            🌟
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
            Pick Your Stuff!
          </h1>
          <p className="text-muted-foreground font-semibold text-base md:text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Choose your favorite items
            <Sparkles className="w-4 h-4 text-accent" />
          </p>
        </motion.div>

        {/* Floating decorations */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-8 left-6 text-3xl opacity-40"
        >
          🫧
        </motion.div>
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute top-16 right-8 text-2xl opacity-40"
        >
          ✨
        </motion.div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-12 max-w-lg mx-auto space-y-5">
        <HomeCategoryCard
          title="Hygiene Products"
          emoji="🧼"
          description="Toothbrush, soap, shampoo & more"
          to="/hygiene"
          gradient="bg-gradient-to-br from-purple-500 to-pink-500"
          delay={0.1}
        />
        <HomeCategoryCard
          title="Clothes"
          emoji="👕"
          description="Shirts, pants, shoes & more"
          to="/clothes"
          gradient="bg-gradient-to-br from-sky-500 to-indigo-500"
          delay={0.2}
        />
      </div>
    </div>
  );
}