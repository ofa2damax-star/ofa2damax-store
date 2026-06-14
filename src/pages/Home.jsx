import { motion } from "framer-motion";
import { Sparkles, ClipboardList, Phone, Mail, Monitor } from "lucide-react";
import HomeCategoryCard from "@/components/HomeCategoryCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PanicButton from "@/components/PanicButton";
import PullToRefresh from "@/components/PullToRefresh";
import LazyImage from "@/components/LazyImage";

export default function Home() {
  return (
    <PullToRefresh onRefresh={() => Promise.resolve()} className="min-h-screen safe-inset">
    <div className="min-h-screen bg-background relative safe-viewport">
      {/* Black background base with cougar paw pattern */}
      <div className="fixed inset-0 bg-background z-0" />
      <div
        className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden lazy-load"
        aria-hidden="true"
        style={{ background: "hsl(var(--background))" }}
      >
        {Array.from({ length: 80 }).map((_, i) => {
          const col = i % 8;
          const row = Math.floor(i / 8);
          const isGreen = (col + row) % 2 === 0;
          return (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${(col / 8) * 100 + 2}%`,
                top: `${(row / 10) * 100 + 1}%`,
                opacity: 0.35,
                fontSize: "2.2rem",
                color: isGreen ? "hsl(var(--primary))" : "hsl(var(--accent))",
                transform: `rotate(${(i * 43) % 360}deg)`,
                lineHeight: 1,
              }}
            >
              🐾
            </span>
          );
        })}
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden px-4 pt-10 pb-6 md:pt-14 md:pb-8 z-10 bg-primary/90 safe-viewport" style={{ minHeight: "320px" }}>
        {/* N&N logo filling the hero background */}
        <div
          className="absolute inset-0 pointer-events-none lazy-load"
          style={{
            backgroundImage: `url(https://media.base44.com/images/public/6a1b94aa3da2d1391351474e/c3fa25a5d_Image1.jpg)`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.55,
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-6xl md:text-7xl mb-3 inline-block drop-shadow-lg"
          style={{ filter: "sepia(1) saturate(5) hue-rotate(10deg) brightness(1.4)" }}
          >
            🐾
          </motion.div>
          <p className="text-sm font-black uppercase tracking-widest text-accent mb-1 drop-shadow-md">Kearns High School</p>
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-accent drop-shadow-lg">
            Pick Your Stuff!
          </h1>
          <p className="text-accent/90 font-semibold text-base md:text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Go Cougars! 🐆
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

      {/* Full-width green top parapet banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="w-full bg-primary border-b-4 border-accent relative z-10 mb-4 shadow-xl safe-viewport"
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          {/* OFA2DAMAX logo left */}
          <LazyImage
            src="https://media.base44.com/images/public/6a1b94aa3da2d1391351474e/8eb0be84a_65D4C14F-6DC7-4C0B-8C73-800AAAD84CF4.jpeg"
            alt="OFA2DAMAX Logo"
            className="w-16 h-16 rounded-xl"
            aspectRatio="1"
          />

          {/* Center text */}
          <div className="flex-1 text-center px-3">
            <p className="text-accent/90 text-xs font-black uppercase tracking-widest leading-tight">Unconditional Love</p>
            <h2 className="text-primary-foreground text-2xl md:text-3xl font-black tracking-tight leading-tight">OFA2DAMAX</h2>
            <div className="flex items-center justify-center gap-3 mt-1 flex-wrap">
              <a href="tel:8015298857" className="flex items-center gap-1 text-accent/90 text-xs font-bold hover:text-accent transition-colors">
                <Phone className="w-3 h-3" />(801) 529-8857
              </a>
              <a href="mailto:ofa2damax@gmail.com" className="flex items-center gap-1 text-accent/90 text-xs font-bold hover:text-accent transition-colors">
                <Mail className="w-3 h-3" />ofa2damax@gmail.com
              </a>
            </div>
          </div>

          {/* OFAS logo right */}
          <div className="flex flex-col items-center gap-0.5">
            <LazyImage
              src="https://media.base44.com/images/public/6a1b94aa3da2d1391351474e/8eb0be84a_65D4C14F-6DC7-4C0B-8C73-800AAAD84CF4.jpeg"
              alt="OFAS"
              className="w-16 h-16 rounded-xl"
              aspectRatio="1"
            />
            <span className="text-accent/90 text-xs font-black tracking-widest uppercase">OFAS</span>
          </div>
        </div>
      </motion.div>

      {/* Emergency Panic Button - fixed right side, double tap to call */}
      <PanicButton />

      {/* Cougar */}
      <div className="text-center text-5xl mb-1 relative z-10" title="Go Cougars!">🐆</div>

      {/* Categories */}
      <div className="px-4 pb-12 max-w-lg mx-auto space-y-4 relative z-10">
        <HomeCategoryCard
          title="Hygiene Products"
          emoji="🧼"
          description="Toothbrush, soap, shampoo & more"
          to="/hygiene"
          gradient="bg-gradient-to-br from-green-600 to-green-700"
          delay={0.1}
        />
        <HomeCategoryCard
          title="Feminine Hygiene"
          emoji="🌸"
          description="Pads, tampons & period care"
          to="/feminine-hygiene"
          gradient="bg-gradient-to-br from-yellow-400 to-yellow-500"
          delay={0.15}
        />
        <HomeCategoryCard
          title="Clothes"
          emoji="👕"
          description="Shirts, pants, shoes & more"
          to="/clothes"
          gradient="bg-gradient-to-br from-green-500 to-yellow-400"
          delay={0.2}
        />
        <HomeCategoryCard
          title="School Clothes"
          emoji="🏫"
          description="Uniforms & clothes with school logo"
          to="/school-clothes"
          gradient="bg-gradient-to-br from-yellow-500 to-green-600"
          delay={0.25}
        />
        <HomeCategoryCard
          title="Sports & Equipment"
          emoji="🏆"
          description="Cleats, gear & equipment needed"
          to="/sports-gear"
          gradient="bg-gradient-to-br from-green-700 to-yellow-500"
          delay={0.3}
        />
      </div>

      {/* Office staff link */}
      <div className="pb-8 text-center relative z-10">
        <Link to="/command-center" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-semibold transition-colors">
          <Monitor className="w-3.5 h-3.5" />
          Office Command Center
        </Link>
      </div>
    </div>
    </PullToRefresh>
  );
}