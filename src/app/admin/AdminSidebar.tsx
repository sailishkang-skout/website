"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, CalendarDays, Bell, LogOut, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/waitlist", label: "Waitlist", icon: Bell },
  { href: "/admin/content", label: "Content", icon: FileText },
];

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
}

function NavLink({ href, icon: Icon, label, collapsed }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`flex items-center rounded-md py-2 text-sm transition-colors ${
        collapsed ? "justify-center px-2" : "gap-2.5 px-3"
      } ${
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export function AdminNav({ collapsed }: { collapsed: boolean }) {
  return (
    <nav className="flex flex-col gap-0.5 p-2">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          collapsed={collapsed}
        />
      ))}
    </nav>
  );
}

export function SignOutButton({ collapsed }: { collapsed: boolean }) {
  async function handleSignOut() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    // Hard navigation: clears Next.js router cache so no admin page
    // can be served from cache after the cookie is gone.
    window.location.replace("/admin/login");
  }

  return (
    <button
      onClick={handleSignOut}
      title={collapsed ? "Sign out" : undefined}
      className={`flex w-full items-center rounded-md py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${
        collapsed ? "justify-center px-2" : "gap-2.5 px-3"
      }`}
    >
      <LogOut className="h-4 w-4 shrink-0" />
      {!collapsed && <span>Sign out</span>}
    </button>
  );
}
