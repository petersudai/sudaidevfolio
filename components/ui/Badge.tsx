import { cn } from "@/lib/utils";
interface BadgeProps { children: React.ReactNode; variant?: "brand" | "subtle" | "outline"; className?: string; }
export function Badge({ children, variant = "subtle", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full tracking-wide",
      variant === "brand"   && "bg-brand-500/15 text-brand-300 border border-brand-500/20",
      variant === "subtle"  && "bg-white/[0.06] text-[#9898b0] border border-white/[0.08]",
      variant === "outline" && "bg-transparent text-brand-400 border border-brand-500/40",
      className
    )}>
      {children}
    </span>
  );
}
