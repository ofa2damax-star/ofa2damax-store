import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function CategoryHeader({ title, emoji, selectedCount, onViewPicks }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-3"
      style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))" }}
      role="banner"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              aria-label="Go back to home"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">{emoji}</span>
            <div>
              <h1 className="text-lg font-extrabold leading-tight">{title}</h1>
              <p className="text-xs font-black text-accent uppercase tracking-widest leading-tight">Go Cougars! · Kearns</p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-2 font-bold"
          onClick={onViewPicks}
          aria-label={`View my picks: ${selectedCount} items selected`}
          aria-expanded={false}
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          My Picks
          {selectedCount > 0 && (
            <Badge className="bg-primary text-primary-foreground rounded-full px-2 py-0 text-xs">
              {selectedCount}
            </Badge>
          )}
        </Button>
      </div>
    </motion.div>
  );
}