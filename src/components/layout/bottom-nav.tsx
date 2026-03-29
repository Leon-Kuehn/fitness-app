"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Dumbbell, FolderOpen, TrendingUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/plans", label: "Plans", icon: FolderOpen },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/exercises", label: "Library", icon: BookOpen },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : (pathname ?? "").startsWith(href);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#2a2a2a]" role="navigation" aria-label="Main navigation">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-all min-h-[44px] min-w-[44px] justify-center active:scale-90",
                active ? "text-[#6366f1]" : "text-[#737373]"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#6366f1] rounded-full" />
                )}
              </div>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
