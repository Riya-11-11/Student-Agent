import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bookmark,
  CalendarCheck,
  ChartNoAxesCombined,
  ChevronRight,
  Home,
  Menu,
  Moon,
  NotebookTabs,
  Search,
  Settings,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useApp } from "./app-context";

const nav = [
  { label: "Home", to: "/", icon: Home },
  { label: "Study Plan", to: "/study-plan", icon: CalendarCheck },
  { label: "PYQ Analysis", to: "/pyq-analysis", icon: ChartNoAxesCombined },
  { label: "Notes Summarizer", to: "/notes-summarizer", icon: NotebookTabs },
  { label: "Saved Plans", to: "/saved-plans", icon: Bookmark },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

function NavContent({ close }: { close?: () => void }) {
  const path = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <>
      <Link to="/" className="brand" onClick={close}>
        <span className="brand-mark">
          <Sparkles />
        </span>

        <span className="brand-text">
          <strong>AI Student</strong>
          <small>Your study companion</small>
        </span>
      </Link>

      <div className="sidebar-section-label">Study space</div>

      <nav className="side-nav" aria-label="Main navigation">
        {nav.map((item) => {
          const isActive = path === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              className={isActive ? "nav-item active" : "nav-item"}
            >
              <span className="nav-icon">
                <item.icon />
              </span>

              <span className="nav-label">{item.label}</span>

              {isActive && (
                <ChevronRight className="nav-arrow" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-note">
        <span className="sidebar-note-icon">
          <Sparkles />
        </span>

        <div>
          <strong>Study at your pace.</strong>
          <p>
            Small steps today can make tomorrow easier.
          </p>
        </div>
      </div>
    </>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useApp();

  return (
    <div className="theme-toggle" aria-label="Choose theme">
      <Button
        size="sm"
        variant={theme === "light" ? "secondary" : "ghost"}
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        className={theme === "light" ? "theme-option active" : "theme-option"}
      >
        <Sun />
        <span>Light</span>
      </Button>

      <Button
        size="sm"
        variant={theme === "dark" ? "secondary" : "ghost"}
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        className={theme === "dark" ? "theme-option active" : "theme-option"}
      >
        <Moon />
        <span>Dark</span>
      </Button>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <NavContent />
      </aside>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <button
            className="drawer-overlay"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />

          <div className="mobile-drawer">
            <div className="drawer-head">
              <div>
                <span className="drawer-title">Study space</span>
                <small>Everything in one place</small>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X />
              </Button>
            </div>

            <NavContent close={() => setMenuOpen(false)} />
          </div>
        </>
      )}

      <div className="app-body">
        <header className="topbar">
          <Button
            className="mobile-menu"
            size="icon"
            variant="ghost"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>

          <div className="topbar-welcome">
            <span className="topbar-kicker">Your study space</span>
            <strong>Let's make today count ✦</strong>
          </div>

          <div className="global-search">
            <Search />
            <input
              aria-label="Search"
              placeholder="Search your study space..."
            />
          </div>

          <div className="topbar-actions">
            <ThemeToggle />

            <Button
              size="icon"
              variant="ghost"
              aria-label="Notifications"
              className="notification-button"
            >
              <Bell />
              <span className="notification-dot" />
            </Button>

            <div
              className="avatar"
              aria-label="Profile"
              title="Your profile"
            >
              RS
            </div>
          </div>
        </header>

        <main className="page-canvas">{children}</main>
      </div>
    </div>
  );
}