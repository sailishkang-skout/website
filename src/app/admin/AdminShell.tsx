"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import logo from "@/assets/logo.png";
import { AdminNav, SignOutButton } from "./AdminSidebar";

const STORAGE_KEY = "admin-sidebar-collapsed";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setCollapsed(stored === "true");
    setMounted(true);
  }, []);

  // If browser restores this page from bfcache (back button after sign-out),
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

  function toggle() {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`flex h-full shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200 ease-in-out ${
          mounted && collapsed ? "w-14" : "w-56"
        }`}
      >
        {/* Header */}
        <div
          className={`flex h-14 shrink-0 items-center border-b border-border transition-[padding] duration-200 ${
            mounted && collapsed ? "justify-center px-2" : "gap-2.5 px-4"
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
          <button
            onClick={toggle}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
