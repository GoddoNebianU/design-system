import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      default: "text-foreground",
      secondary: "text-foreground-secondary",
      muted: "text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
      tone: "default",
    align: "left",
  },
});

type TextAs = "span" | "p" | "div" | "strong" | "em" | "label";

interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: TextAs;
}

export function Text({
  size,
  weight,
  tone,
  align,
  as: Component = "span",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ size, weight, tone, align }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
