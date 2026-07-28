import React, { forwardRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "./cn";
import { fieldVariants } from "./_shared";

export type InputVariant = VariantProps<typeof fieldVariants>["variant"];
export type InputSize = VariantProps<typeof fieldVariants>["size"];

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof fieldVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", size = "md", error = false, className, containerClassName, leftIcon, rightIcon, type = "text", ...props }, ref) => {
    const inputEl = (
      <input
        ref={ref}
        type={type}
        className={cn(fieldVariants({ variant, size, error }), leftIcon && "pl-10", className)}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );

    if (!leftIcon && !rightIcon) {
      return containerClassName ? <div className={cn("relative", containerClassName)}>{inputEl}</div> : inputEl;
    }

    return (
      <div className={cn("relative", containerClassName)}>
        {leftIcon && (
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-foreground-disabled" aria-hidden="true">
            {leftIcon}
          </div>
        )}
        {inputEl}
        {rightIcon && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground-disabled" aria-hidden="true">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
