import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, Monitor } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home, to: "/" },
  { label: "My Info", icon: ClipboardList, to: "/my-info" },
  { label: "Command", icon: Monitor, to: "/command-center" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-yellow-400/30 flex select-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map(({ label, icon: Icon, to }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              active ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : ""}`} />
            <span className={`text-[10px] font-black uppercase tracking-wide ${active ? "text-yellow-400" : "text-gray-500"}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}