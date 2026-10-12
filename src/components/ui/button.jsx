import React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

    const variants = {
      default:
        "bg-[#034d44] text-white hover:bg-[#046156] shadow-lg shadow-teal-950/30",
      teal: "bg-[#065f54] text-white hover:bg-[#077063] shadow-md shadow-emerald-950/20",
      outline:
        "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
      ghost: "text-white hover:bg-white/10",
      glass:
        "bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 shadow-sm",
      link: "text-white underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5 text-sm",
      sm: "h-9 px-4 text-xs",
      lg: "h-13 px-8 text-base font-semibold",
      icon: "h-10 w-10 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
