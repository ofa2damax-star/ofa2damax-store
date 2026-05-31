import { motion } from "framer-motion";
import { Sparkles, ClipboardList, Phone, Mail } from "lucide-react";
import HomeCategoryCard from "@/components/HomeCategoryCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden px-4 pt-10 pb-6 md:pt-14 md:pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-6xl md:text-7xl mb-3 inline-block"
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

          {/* My Info button */}
          <Link to="/my-info">
            <Button
              variant="outline"
              className="mt-5 rounded-full gap-2 font-bold border-2 px-6"
            >
              <ClipboardList className="w-4 h-4" />
              Fill In My Info
            </Button>
          </Link>
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

      {/* Business Header */}
      <div className="px-4 max-w-lg mx-auto -mt-2 mb-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-5 border border-primary/20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <img
              src="https://media.base44.com/images/public/6a1b94aa3da2d1391351474e/8eb0be84a_65D4C14F-6DC7-4C0B-8C73-800AAAD84CF4.jpeg"
              alt="OFA2DAMAX Logo"
              className="w-24 h-24 object-contain drop-shadow-md rounded-xl"
            />
            <img
              src="https://media.base44.com/images/public/6a1b94aa3da2d1391351474e/c3fa25a5d_Image1.jpg"
              alt="Unconditional Love N&N Logo"
              className="w-24 h-24 object-contain drop-shadow-md rounded-xl"
            />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-foreground mb-1">OFA2DAMAX</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-3">
            <a
              href="tel:8015298857"
              className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <Phone className="w-4 h-4" />
              (801) 529-8857
            </a>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <a
              href="mailto:ofa2damax@gmail.com"
              className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              ofa2damax@gmail.com
            </a>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <a
              href="mailto:jason@ofa2damax.com"
              className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              jason@ofa2damax.com
            </a>
          </div>
        </motion.div>
      </div>

      {/* Emergency Panic Button */}
      <div className="px-4 max-w-lg mx-auto mb-6">
        <motion.a
          href="tel:911"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xl rounded-2xl py-5 shadow-lg shadow-red-500/40 border-4 border-red-400"
        >
          <span className="text-2xl">🚨</span>
          EMERGENCY — CALL 911
          <span className="text-2xl">🚨</span>
        </motion.a>
      </div>

      {/* Categories */}
      <div className="px-4 pb-12 max-w-lg mx-auto space-y-4">
        <HomeCategoryCard
          title="Hygiene Products"
          emoji="🧼"
          description="Toothbrush, soap, shampoo & more"
          to="/hygiene"
          gradient="bg-gradient-to-br from-purple-500 to-pink-500"
          delay={0.1}
        />
        <HomeCategoryCard
          title="Feminine Hygiene"
          emoji="🌸"
          description="Pads, tampons & period care"
          to="/feminine-hygiene"
          gradient="bg-gradient-to-br from-pink-400 to-rose-500"
          delay={0.15}
        />
        <HomeCategoryCard
          title="Clothes"
          emoji="👕"
          description="Shirts, pants, shoes & more"
          to="/clothes"
          gradient="bg-gradient-to-br from-sky-500 to-indigo-500"
          delay={0.2}
        />
        <HomeCategoryCard
          title="School Clothes"
          emoji="🏫"
          description="Uniforms & clothes with school logo"
          to="/school-clothes"
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          delay={0.25}
        />
      </div>
    </div>
  );
}