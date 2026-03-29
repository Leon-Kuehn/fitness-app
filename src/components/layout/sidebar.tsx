"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dumbbell, LayoutDashboard, UtensilsCrossed,
  TrendingUp, LogOut, LogIn,
  ChevronLeft, ChevronRight, UserCircle, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, user } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => { router.push("/logout"); };

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : (href === "/" ? pathname === "/" : (pathname ?? "").startsWith(href));

  const navLink = (href: string, label: string, Icon: React.ComponentType<{ className?: string }>, exact = false) => {
    const active = isActive(href, exact);
    return (
      <Link
        key={href}
        href={href}
        title={collapsed ? label : undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          collapsed ? "justify-center" : "gap-3",
        )}
        style={{
          background: active ? "rgba(255,55,95,0.12)" : "transparent",
          color: active ? "var(--color-primary)" : "var(--color-text-muted)",
        }}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" />
        {!collapsed && label}
      </Link>
    );
  };

  const primaryNav = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard, exact: true },
    { href: "/workout", label: "Training", icon: Dumbbell },
    { href: "/progress", label: t("progress"), icon: TrendingUp },
    { href: "/nutrition", label: t("nutrition"), icon: UtensilsCrossed },
    { href: "/profile", label: t("profile"), icon: UserCircle },
  ];

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 transition-all duration-300",
        collapsed ? "w-[60px]" : "w-56"
      )}
      style={{
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
      }}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center shrink-0",
          collapsed ? "justify-center px-0 py-5" : "gap-2 px-5 py-5"
        )}
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          <Dumbbell className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <span
            className="text-base font-bold whitespace-nowrap overflow-hidden"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            FitTrack
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5" aria-label="Main navigation">
        {primaryNav.map(({ href, label, icon: Icon, exact }) => navLink(href, label, Icon, exact))}

        {role === "gym_admin" && navLink("/admin", t("admin"), ShieldCheck)}
      </nav>

      {/* Bottom section — account */}
      <div className="px-2 py-4 space-y-0.5" style={{ borderTop: "1px solid var(--color-border)" }}>
        {user ? (
          <button
            onClick={handleLogout}
            title={collapsed ? t("signOut") : undefined}
            className={cn(
              "flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              collapsed ? "justify-center" : "gap-3"
            )}
            style={{ color: "var(--color-text-muted)" }}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && t("signOut")}
          </button>
        ) : (
          navLink("/login", t("login"), LogIn)
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-colors",
            collapsed ? "justify-center" : "gap-3"
          )}
          style={{ color: "var(--color-text-muted)" }}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              Collapse
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
