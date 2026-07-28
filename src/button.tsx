import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";
import { focusRing, disabledStyles, transition } from "./_shared";

export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold shadow leading-none",
    transition,
    focusRing,
    disabledStyles
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-600 shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-error-600 shadow-md",
        outline: "border-2 border-border bg-background hover:border-primary-500 hover:text-primary-600 shadow-none",
        ghost: "bg-transparent text-foreground hover:bg-muted shadow-none",
        link: "bg-transparent text-primary-500 hover:text-primary-600 hover:underline shadow-none font-medium",
      },
      size: {
        default: "h-10 px-4 text-base",
        sm: "h-8 px-2.5 text-sm",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
      selected: {
        true: "ring-2 ring-primary-500 ring-offset-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      pill: false,
      selected: false,
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  href?: string;
  openInNewTab?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  loading?: boolean;
  asChild?: boolean;
  className?: string;
}

const ICON_SIZE_MAP: Record<NonNullable<ButtonSize>, number> = {
  default: 16,
  sm: 14,
  lg: 20,
  icon: 18,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    pill,
    selected,
    href,
    openInNewTab = false,
    iconSrc,
    iconAlt,
    leftIcon,
    rightIcon,
    children,
    className,
    loading = false,
    disabled,
    type = "button",
    asChild = false,
    ...props
  },
  ref
) {
  const computedClass = cn(buttonVariants({ variant, size, fullWidth, pill, selected }), className);
  const resolvedSize = size ?? "default";
  const iconSize = ICON_SIZE_MAP[resolvedSize];

  const renderSvgIcon = (icon: React.ReactNode, position: "left" | "right") => {
    if (!icon) return null;
    return (
      <span
        className={cn("flex shrink-0 items-center", position === "left" ? "mr-2 -ml-1" : "-mr-1 ml-2")}
        aria-hidden="true"
      >
        {icon}
      </span>
    );
  };

  const renderImageIcon = () => {
    if (!iconSrc) return null;
    return (
      <img src={iconSrc} width={iconSize} height={iconSize} alt={iconAlt || "icon"} className="shrink-0" />
    );
  };

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {renderImageIcon()}
      {renderSvgIcon(leftIcon, "left")}
      {children}
      {renderSvgIcon(rightIcon, "right")}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={computedClass}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  if (asChild) {
    return (
      <Slot ref={ref} className={computedClass} {...(props as React.HTMLAttributes<HTMLElement>)}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={computedClass}
      {...props}
    >
      {content}
    </button>
  );
});
