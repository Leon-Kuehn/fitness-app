import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, style, ...props }: ButtonProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--color-primary)",
      color: "#fff",
      borderRadius: "var(--radius-full)",
    },
    secondary: {
      background: "var(--color-surface-2)",
      color: "var(--color-text)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text-muted)",
      borderRadius: "var(--radius-md)",
    },
    destructive: {
      background: "rgba(239,68,68,0.15)",
      color: "var(--color-destructive)",
      borderRadius: "var(--radius-md)",
    },
    outline: {
      background: "transparent",
      color: "var(--color-text)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
    },
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        sizes[size],
        className
      )}
      style={{ ...variantStyles[variant], fontFamily: "var(--font-body)", ...style }}
      {...props}
    />
  );
}
