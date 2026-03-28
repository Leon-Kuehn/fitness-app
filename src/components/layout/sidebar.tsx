"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dumbbell,
  LayoutDashboard,
  Calendar,
  BookOpen,
  UtensilsCrossed,
  TrendingUp,
  Sparkles,
  FolderOpen,
  Building2,
  ShieldCheck,
  LogOut,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/plans", label: "Plans", icon: FolderOpen },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/exercises", label: "Exercises", icon: BookOpen },
  { href: "/nutrition", label: "Nutrition", icon: UtensilsCrossed },
  { href: "/metrics", label: "Metrics", icon: TrendingUp },
  { href: "/ai", label: "AI Coach", icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, user } = useAuth();

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-60 bg-[#1a1a1a] border-r border-[#2a2a2a] z-40">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-[#2a2a2a]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f1]">
          <Dumbbell className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold text-[#f5f5f5]">FitTrack</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-[#6366f1]/15 text-[#6366f1]"
                  : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        {/* My Gym — visible to authenticated users */}
        {role && (
          <Link
            href="/gym"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/gym"
                ? "bg-[#6366f1]/15 text-[#6366f1]"
                : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
            )}
          >
            <Building2 className="h-4 w-4 shrink-0" />
            My Gym
          </Link>
        )}

        {/* Admin — visible only to gym_admin */}
        {role === "gym_admin" && (
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/admin"
                ? "bg-[#6366f1]/15 text-[#6366f1]"
                : "text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5]"
            )}
          >
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Admin
          </Link>
        )}
      </nav>

      {/* Footer: user info or login */}
      <div className="px-3 py-4 border-t border-[#2a2a2a] space-y-2">
        {user ? (
          <>
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6366f1]/20 shrink-0">
                <span className="text-xs font-semibold text-[#6366f1]">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[#f5f5f5] truncate">{user.name}</p>
                <p className="text-[10px] text-[#737373] truncate">
                  {role === "gym_admin" ? "Gym Admin" : "Member"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5] transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#737373] hover:bg-[#242424] hover:text-[#f5f5f5] transition-colors"
          >
            <LogIn className="h-4 w-4 shrink-0" />
            Login
          </Link>
        )}
      </div>
    </aside>
  );
}
