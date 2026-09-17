import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SavedPlan } from "@/lib/mock-data";

export type Theme = "light" | "dark";
type AppContextValue = { theme: Theme; setTheme: (theme: Theme) => void; savedPlans: SavedPlan[]; savePlan: (plan: SavedPlan) => void; deletePlan: (id: string) => void };
const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  useEffect(() => {
    const storedTheme = window.localStorage.getItem("student-agent-theme") as Theme | null;
    const storedPlans = window.localStorage.getItem("student-agent-plans");
    if (storedTheme === "dark") setThemeState("dark");
    if (storedPlans) { try { setSavedPlans(JSON.parse(storedPlans)); } catch { setSavedPlans([]); } }
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); document.documentElement.style.colorScheme = theme; window.localStorage.setItem("student-agent-theme", theme); }, [theme]);
  const setTheme = (value: Theme) => setThemeState(value);
  const savePlan = (plan: SavedPlan) => setSavedPlans((current) => { const next = [plan, ...current.filter((item) => item.id !== plan.id)]; window.localStorage.setItem("student-agent-plans", JSON.stringify(next)); return next; });
  const deletePlan = (id: string) => setSavedPlans((current) => { const next = current.filter((item) => item.id !== id); window.localStorage.setItem("student-agent-plans", JSON.stringify(next)); return next; });
  return <AppContext.Provider value={{ theme, setTheme, savedPlans, savePlan, deletePlan }}>{children}</AppContext.Provider>;
}
export function useApp() { const value = useContext(AppContext); if (!value) throw new Error("useApp must be used inside AppProvider"); return value; }
