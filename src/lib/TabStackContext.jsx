import { createContext, useContext } from "react";
import { useTabStacks } from "@/hooks/useTabStacks";

const TabStackContext = createContext(null);

export function TabStackProvider({ children }) {
  const tabStacks = useTabStacks();
  return (
    <TabStackContext.Provider value={tabStacks}>
      {children}
    </TabStackContext.Provider>
  );
}

export function useTabStack() {
  const context = useContext(TabStackContext);
  if (!context) {
    throw new Error("useTabStack must be used within TabStackProvider");
  }
  return context;
}