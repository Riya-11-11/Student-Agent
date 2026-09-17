import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Bookmark, CalendarDays, ChartNoAxesCombined, Home, Menu, Moon, Search, Settings, Sparkles, Sun, Text, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "./app-context";

const nav = [
  { label: "Home", to: "/", icon: Home }, { label: "Study Plan", to: "/study-plan", icon: CalendarDays }, { label: "PYQ Analysis", to: "/pyq-analysis", icon: ChartNoAxesCombined }, { label: "Notes Summarizer", to: "/notes-summarizer", icon: Text }, { label: "Saved Plans", to: "/saved-plans", icon: Bookmark }, { label: "Settings", to: "/settings", icon: Settings },
] as const;

function NavContent({ close }: { close?: () => void }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return <><Link to="/" className="brand" onClick={close}><span className="brand-mark"><Sparkles /></span><span><strong>AI Student</strong><small>AGENT</small></span></Link><nav className="side-nav" aria-label="Main navigation">{nav.map((item) => <Link key={item.to} to={item.to} onClick={close} className={path === item.to ? "nav-item active" : "nav-item"}><item.icon /><span>{item.label}</span></Link>)}</nav><div className="sidebar-note"><span>✦</span><p><strong>Small steps.</strong><br />Big progress.</p></div></>;
}
export function ThemeToggle() { const { theme, setTheme } = useApp(); return <div className="theme-toggle" aria-label="Theme"><Button size="sm" variant={theme === "light" ? "secondary" : "ghost"} onClick={() => setTheme("light")} aria-pressed={theme === "light"}><Sun /> <span>Light</span></Button><Button size="sm" variant={theme === "dark" ? "secondary" : "ghost"} onClick={() => setTheme("dark")} aria-pressed={theme === "dark"}><Moon /> <span>Dark</span></Button></div>; }
export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell"><aside className="sidebar"><NavContent /></aside>{menuOpen && <div className="mobile-drawer"><div className="drawer-head"><span>Menu</span><Button size="icon" variant="ghost" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button></div><NavContent close={() => setMenuOpen(false)} /></div>}<div className="app-body"><header className="topbar"><Button className="mobile-menu" size="icon" variant="ghost" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button><div className="global-search"><Search /><input aria-label="Search" placeholder="Search your study space..." /></div><div className="topbar-actions"><ThemeToggle /><Button size="icon" variant="ghost" aria-label="Notifications"><Bell /></Button><div className="avatar" aria-label="Profile">RS</div></div></header><main className="page-canvas">{children}</main></div></div>;
}
