import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Monitor } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home, to: "/" },
  { label: "My Info", icon: ClipboardList, to: "/my-info" },
  { label: "Command", icon: Monitor, to: "/command-center" },
];

// Map each tab root to whether the current pathname belongs to it
function isTabActive(pathname, tabTo) {
  if (tabTo === "/") {
    return pathname === "/" || pathname.startsWith("/hygiene") || pathname.startsWith("/clothes") || pathname.startsWith("/feminine-hygiene") || pathname.startsWith("/school-clothes") || pathname.startsWith("/sports-gear");
  }
  return pathname.startsWith(tabTo);
}

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  // Preserve scroll position when switching tabs
  const handleTabChange = (to) => {
    if (pathname === to) {
      navigate(to, { replace: true });
    } else {
      navigate(to);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-yellow-400/30 flex select-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map(({ label, icon: Icon, to }) => {
        const active = isTabActive(pathname, to);
        return (
          <button
            key={to}
            onClick={() => handleTabChange(to)}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              active ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : ""}`} aria-hidden="true" />
            <span className={`text-xs font-black uppercase tracking-wide ${active ? "text-yellow-400" : "text-gray-500"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}