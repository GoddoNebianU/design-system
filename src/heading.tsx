"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";

const headingVariants = cva("text-foreground", {
  variants: {
    level: {
      h1: "text-2xl font-bold",
      h2: "text-xl font-bold",
      h3: "text-lg font-semibold",
      h4: "text-base font-semibold",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevel;
}

export function Heading({
  level = "h2",
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = level;
  return (
    <Component
      className={cn(headingVariants({ level }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
