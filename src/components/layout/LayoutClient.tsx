"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { Footer } from "./Footer";
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
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          collapsed ? "lg:ml-[60px]" : "lg:ml-60"
        )}
      >
        <main
          id="main-content"
          className="flex-1 pb-20 lg:pb-0"
        >
          <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
