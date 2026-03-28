import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "warning" | "muted" | "secondary" | "outline";
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#6366f1]/20 text-[#6366f1]",
    accent: "bg-[#10b981]/20 text-[#10b981]",
    warning: "bg-[#f59e0b]/20 text-[#f59e0b]",
    muted: "bg-[#2a2a2a] text-[#737373]",
    secondary: "bg-[#2a2a2a] text-[#d4d4d4]",
    outline: "border border-[#2a2a2a] text-[#737373] bg-transparent",
  };
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
}
