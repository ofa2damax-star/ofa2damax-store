import { useRef, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Tracks which "root" tab each path belongs to
function getTabIndex(pathname) {
  if (pathname.startsWith("/command-center")) return 2;
  if (pathname.startsWith("/my-info")) return 1;
  if (pathname === "/" || pathname.startsWith("/hygiene") || pathname.startsWith("/clothes") || pathname.startsWith("/feminine-hygiene") || pathname.startsWith("/school-clothes") || pathname.startsWith("/sports-gear")) return 0;
  return 0;
}

const tabRoots = {
  home: "/",
  profile: "/my-info",
  command: "/command-center",
};

export function useTabStacks() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Store the last visited path for each tab
  const [tabPaths, setTabPaths] = useState(tabRoots);
  const currentTabIndex = getTabIndex(location.pathname);
  
  // Get the stored path for a tab
  const switchToTab = useCallback((tabKey) => {
    return tabPaths[tabKey] || tabRoots[tabKey];
  }, [tabPaths]);
  
  // Reset a tab to its root and return the root path
  const resetTab = useCallback((tabKey) => {
    const rootPath = tabRoots[tabKey];
    setTabPaths(prev => ({
      ...prev,
      [tabKey]: rootPath,
    }));
    return rootPath;
  }, []);
  
  // Update the path for the current tab when navigating within it
  const updateCurrentTabPath = useCallback((path) => {
    const tabKeys = Object.keys(tabRoots);
    const currentTabKey = tabKeys[currentTabIndex];
    setTabPaths(prev => ({
      ...prev,
      [currentTabKey]: path,
    }));
  }, [currentTabIndex]);
  
  return {
    currentTabIndex,
    switchToTab,
    resetTab,
    updateCurrentTabPath,
  };
}