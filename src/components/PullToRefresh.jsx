import { useRef, useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";

export default function PullToRefresh({ onRefresh, children, className = "" }) {
  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const scrollRef = useRef(null);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    const el = scrollRef.current;
    if (!el || el.scrollTop > 0) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setPullY(Math.min(delta * 0.4, 60));
  }, []);

  const handleTouchEnd = useCallback(async () => {
    if (pullY >= 50) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullY(0);
  }, [pullY, onRefresh]);

  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {(pullY > 0 || isRefreshing) && (
        <div
          className="flex justify-center items-center transition-all"
          style={{ height: isRefreshing ? 48 : pullY, overflow: "hidden" }}
        >
          <RefreshCw
            className={`w-5 h-5 text-primary ${isRefreshing ? "animate-spin" : ""}`}
            style={{ transform: `rotate(${pullY * 4}deg)` }}
          />
        </div>
      )}
      {children}
    </div>
  );
}