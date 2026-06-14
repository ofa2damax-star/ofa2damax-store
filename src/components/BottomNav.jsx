import { useNavigate } from "react-router-dom";
import { Home, ClipboardList, Monitor } from "lucide-react";
import { useTabStack } from "@/lib/TabStackContext";

const tabs = [
  { key: "home", label: "Home", icon: Home, to: "/" },
  { key: "profile", label: "My Info", icon: ClipboardList, to: "/my-info" },
  { key: "command", label: "Command", icon: Monitor, to: "/command-center" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { switchToTab, resetTab, currentTabIndex } = useTabStack();

  const handleTabChange = (tab) => {
    const targetIndex = tabs.findIndex(t => t.key === tab.key);
    
    if (currentTabIndex === targetIndex) {
      // Already on this tab - reset to root
      const rootPath = resetTab(tab.key);
      navigate(rootPath, { replace: true });
    } else {
      // Switching to different tab - use preserved stack
      const path = switchToTab(tab.key);
      navigate(path, { replace: true });
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border flex select-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map(({ key, label, icon: Icon, to }, index) => {
        const active = currentTabIndex === index;
        return (
          <button
            key={key}
            onClick={() => handleTabChange({ key, to })}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              active ? "text-accent" : "text-muted-foreground"
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : ""}`} aria-hidden="true" />
            <span className={`text-xs font-black uppercase tracking-wide ${active ? "text-accent" : "text-muted-foreground"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}