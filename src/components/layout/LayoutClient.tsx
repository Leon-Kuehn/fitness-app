"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fittrack_sidebar_collapsed");
    if (stored === "true") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("fittrack_sidebar_collapsed", String(next));
  };

  return (
    <>
      <Sidebar collapsed={collapsed} onToggleCollapse={toggleCollapsed} />
      <main
        id="main-content"
        className={cn(
          "min-h-screen pb-20 lg:pb-0 transition-all duration-300",
          collapsed ? "lg:ml-[60px]" : "lg:ml-60"
        )}
      >
        <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">{children}</div>
      </main>
    </>
  );
}
