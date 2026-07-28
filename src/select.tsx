import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "./cn";
import { fieldVariants } from "./_shared";

export type SelectVariant = VariantProps<typeof fieldVariants>["variant"];
export type SelectSize = VariantProps<typeof fieldVariants>["size"];

export interface SelectProps
  extends
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof fieldVariants> {
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant = "default", size = "md", error = false, className, containerClassName, children, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <select
          ref={ref}
          className={cn(
            fieldVariants({ variant, size, error }),
            "appearance-none items-center justify-between pr-8",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        >
          {children}
        </select>
        <div
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-foreground-disabled"
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
