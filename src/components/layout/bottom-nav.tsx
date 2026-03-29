"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Dumbbell, FolderOpen, UtensilsCrossed, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/plans", label: "Plans", icon: FolderOpen },
  { href: "/nutrition", label: "Nutrition", icon: UtensilsCrossed },
  { href: "/metrics", label: "Metrics", icon: TrendingUp },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#2a2a2a]" role="navigation" aria-label="Hauptnavigation">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-all min-w-0 active:scale-90 min-h-[44px] min-w-[44px] justify-center",
                isActive ? "text-[#6366f1]" : "text-[#737373]"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {isActive && (
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
