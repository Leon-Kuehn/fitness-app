"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dumbbell, LayoutDashboard, Calendar, BookOpen, UtensilsCrossed,
  TrendingUp, Sparkles, FolderOpen, Building2, ShieldCheck, LogOut, LogIn,
  Settings, ChevronLeft, ChevronRight, MapPin, Trophy, Clock,
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

  const navItems = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/workout", label: t("workout"), icon: Dumbbell },
    { href: "/history", label: t("history"), icon: Clock },
    { href: "/plans", label: t("plans"), icon: FolderOpen },
    { href: "/calendar", label: t("calendar"), icon: Calendar },
    { href: "/exercises", label: t("exercises"), icon: BookOpen },
    { href: "/nutrition", label: t("nutrition"), icon: UtensilsCrossed },
    { href: "/metrics", label: t("metrics"), icon: TrendingUp },
    { href: "/ai", label: t("aiCoach"), icon: Sparkles },
    { href: "/achievements", label: t("achievements"), icon: Trophy },
    { href: "/gyms", label: t("gymFinder"), icon: MapPin },
  ];

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 h-full bg-[#1a1a1a] border-r border-[#2a2a2a] z-40 transition-all duration-300",
        collapsed ? "w-[60px]" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center border-b border-[#2a2a2a] shrink-0",
        collapsed ? "justify-center px-0 py-5" : "gap-2 px-5 py-5"
      )}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f1] shrink-0">
          <Dumbbell className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold text-[#f5f5f5] whitespace-nowrap overflow-hidden">FitTrack</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                collapsed ? "justify-center gap-0" : "gap-3",
                isActive
                  ? "bg-[#6366f1]/15 text-[#6366f1]"
                  : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && item.label}
            </Link>
          );
        })}

        {role && (
          <Link
            href="/gym"
            title={collapsed ? t("myGym") : undefined}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
              collapsed ? "justify-center gap-0" : "gap-3",
              pathname === "/gym"
                ? "bg-[#6366f1]/15 text-[#6366f1]"
                : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
            )}
          >
            <Building2 className="h-4 w-4 shrink-0" />
            {!collapsed && t("myGym")}
          </Link>
        )}

        {role === "gym_admin" && (
          <Link
            href="/admin"
            title={collapsed ? t("admin") : undefined}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
              collapsed ? "justify-center gap-0" : "gap-3",
              pathname === "/admin"
                ? "bg-[#6366f1]/15 text-[#6366f1]"
                : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
            )}
          >
            <ShieldCheck className="h-4 w-4 shrink-0" />
            {!collapsed && t("admin")}
          </Link>
        )}
      </nav>

      {/* Bottom section */}
      <div className="px-2 py-4 border-t border-[#2a2a2a] space-y-1">
        {/* Settings */}
        <Link
          href="/settings"
          title={collapsed ? t("settings") : undefined}
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
            collapsed ? "justify-center gap-0" : "gap-3",
            pathname === "/settings"
              ? "bg-[#6366f1]/15 text-[#6366f1]"
              : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && t("settings")}
        </Link>

        {user ? (
          <>
            {!collapsed && (
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6366f1]/20 shrink-0">
                  <span className="text-xs font-semibold text-[#6366f1]">{user.name.charAt(0)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[#f5f5f5] truncate">{user.name}</p>
                  <p className="text-[10px] text-[#737373] truncate">
                    {role === "gym_admin" ? "Gym Admin" : "Member"}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              title={collapsed ? t("signOut") : undefined}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5] transition-colors",
                collapsed ? "justify-center gap-0" : "gap-3"
              )}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && t("signOut")}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            title={collapsed ? t("login") : undefined}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5] transition-colors",
              collapsed ? "justify-center gap-0" : "gap-3"
            )}
          >
            <LogIn className="h-4 w-4 shrink-0" />
            {!collapsed && t("login")}
          </Link>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          title={collapsed ? "Erweitern" : "Einklappen"}
          className={cn(
            "flex w-full items-center rounded-lg px-3 py-2 text-sm text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5] transition-colors",
            collapsed ? "justify-center gap-0" : "gap-3"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              Einklappen
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
