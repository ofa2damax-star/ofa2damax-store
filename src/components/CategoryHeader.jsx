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
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <h1 className="text-lg font-extrabold">{title}</h1>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-2 font-bold"
          onClick={onViewPicks}
        >
          <ShoppingBag className="w-4 h-4" />
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