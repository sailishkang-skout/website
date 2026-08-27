"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PanelLeftClose, PanelLeftOpen, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { AdminNav, SignOutButton } from "./AdminSidebar";

const STORAGE_KEY = "admin-sidebar-collapsed";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setCollapsed(stored === "true");
    setMounted(true);
  }, []);

  // If browser restores this page from cache (back button after sign-out),
  // the server was never hit so middleware didn't run. Force a reload so the
  // middleware can check the cookie and redirect to login if needed.
  useEffect(() => {
    function handlePageShow(e: PageTransitionEvent) {
      if (e.persisted) {
        window.location.replace(window.location.href);
      }
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggle() {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggleMobileMenu} />
      )}

      {/* Sidebar - Mobile: fixed overlay, Desktop: static */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-200 ease-in-out md:static ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${mounted && collapsed && "md:w-14 md:translate-x-0"}`}
      >
        {/* Header */}
        <div
          className={`flex h-14 shrink-0 items-center border-b border-border transition-[padding] duration-200 ${
            mounted && collapsed ? "md:justify-center md:px-2" : "gap-2.5 px-4"
          }`}
        >
          {(!mounted || !collapsed) && (
            <Image
              src={logo}
              alt="Skout AI"
              width={28}
              height={28}
              className="shrink-0 rounded-md"
            />
          )}
          {(!mounted || !collapsed) && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold leading-none">Skout AI</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Admin</div>
            </div>
          )}
          {/* Mobile close button */}
          <button
            onClick={toggleMobileMenu}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
          {/* Desktop toggle button */}
          <button
            onClick={toggle}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
          >
            {mounted && collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto">
          <AdminNav collapsed={mounted && collapsed} />
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border p-2">
          <SignOutButton collapsed={mounted && collapsed} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-14 shrink-0 items-center border-b border-border px-4 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-4 flex-1">
            <div className="text-sm font-semibold">Skout AI Admin</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
