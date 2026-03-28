import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-[#6366f1] hover:bg-[#4f46e5] text-white",
    secondary: "bg-[#242424] hover:bg-[#2a2a2a] text-[#f5f5f5] border border-[#2a2a2a]",
    ghost: "hover:bg-[#242424] text-[#737373] hover:text-[#f5f5f5]",
    destructive: "bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444]",
    outline: "border border-[#2a2a2a] text-[#f5f5f5] hover:bg-[#1a1a1a] bg-transparent",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={cn("inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
