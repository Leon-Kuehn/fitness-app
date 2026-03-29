"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dumbbell, LayoutDashboard, BookOpen, UtensilsCrossed,
  TrendingUp, Sparkles, FolderOpen, ShieldCheck, LogOut, LogIn,
  Settings, ChevronLeft, ChevronRight, MapPin, Trophy, UserCircle,
  Calendar,
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : (pathname ?? "").startsWith(href);

  const navLink = (href: string, label: string, Icon: React.ComponentType<{ className?: string }>) => (
    <Link
      key={href}
      href={href}
      title={collapsed ? label : undefined}
      aria-current={isActive(href) ? "page" : undefined}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        collapsed ? "justify-center" : "gap-3",
        isActive(href)
          ? "bg-[#6366f1]/10 text-[#6366f1]"
          : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && label}
    </Link>
  );

  const coreNav = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/workout", label: t("workout"), icon: Dumbbell },
    { href: "/plans", label: t("plans"), icon: FolderOpen },
    { href: "/progress", label: t("progress"), icon: TrendingUp },
    { href: "/exercises", label: t("library"), icon: BookOpen },
  ];

  const secondaryNav = [
    { href: "/nutrition", label: t("nutrition"), icon: UtensilsCrossed },
    { href: "/calendar", label: t("calendar"), icon: Calendar },
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
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5" aria-label="Main navigation">
        {/* Core navigation */}
        {coreNav.map(({ href, label, icon: Icon }) => navLink(href, label, Icon))}

        {/* Divider */}
        {!collapsed && (
          <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-[#404040]">
            More
          </p>
        )}
        {collapsed && <div className="my-2 mx-3 border-t border-[#2a2a2a]" />}

        {/* Secondary navigation */}
        {secondaryNav.map(({ href, label, icon: Icon }) => navLink(href, label, Icon))}

        {role === "gym_admin" && navLink("/admin", t("admin"), ShieldCheck)}
      </nav>

      {/* Bottom section — account */}
      <div className="px-2 py-4 border-t border-[#2a2a2a] space-y-0.5">
        {navLink("/settings", t("settings"), Settings)}

        {user ? (
          <>
            {navLink("/profile", t("profile"), UserCircle)}
            <button
              onClick={handleLogout}
              title={collapsed ? t("signOut") : undefined}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5] transition-colors",
                collapsed ? "justify-center" : "gap-3"
              )}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && t("signOut")}
            </button>
          </>
        ) : (
          navLink("/login", t("login"), LogIn)
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex w-full items-center rounded-lg px-3 py-2 text-sm text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5] transition-colors",
            collapsed ? "justify-center" : "gap-3"
          )}
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
