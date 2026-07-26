"use client";

import React, { forwardRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "./cn";
import { fieldVariants } from "./_shared";

export type TextareaVariant = VariantProps<typeof fieldVariants>["variant"];
export type TextareaSize = VariantProps<typeof fieldVariants>["size"];

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof fieldVariants> {
  autoResize?: boolean;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "default",
      size = "md",
      error = false,
      className,
      containerClassName,
      autoResize = false,
      onChange,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }
      onChange?.(e);
    };

    const textareaEl = (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(fieldVariants({ variant, size, error }), className)}
        onChange={handleChange}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );

    return containerClassName ? (
      <div className={cn("relative", containerClassName)}>{textareaEl}</div>
    ) : (
      textareaEl
    );
  }
);

Textarea.displayName = "Textarea";
