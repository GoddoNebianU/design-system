import { cva } from "class-variance-authority";

/**
 * Design System 共享样式常量。
 *
 * 所有交互组件引用这些常量, 确保焦点环、禁用态、过渡动画一致。
 * 纯 CVA 定义, 无 hooks, 无需 "use client"。
 */

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const disabledStyles =
  "disabled:cursor-not-allowed disabled:opacity-50";

export const transition = "transition-all duration-250";

/**
 * 表单字段共享变体 (Input / Select / Textarea)。
 * 消除三个文件中的重复定义。
 */
export const fieldVariants = cva(
  `flex w-full rounded-md border px-3 py-2 text-base ${transition} placeholder:text-foreground-disabled resize-none ${focusRing} ${disabledStyles}`,
  {
    variants: {
      variant: {
        default: "border-b-2 border-border bg-transparent rounded-t-md",
        bordered: "border-border bg-white",
        filled: "border-transparent bg-muted",
        search: "border-border-secondary bg-white pl-10 rounded-full",
        light: "border-transparent bg-muted shadow-sm hover:bg-background-tertiary font-semibold cursor-pointer",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-5 text-lg",
      },
      error: {
        true: "border-error-500 focus-visible:ring-error-500",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "filled", error: true, className: "bg-error-50" },
      { variant: "light", error: true, className: "bg-error-50 hover:bg-error-100" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
    },
  }
);

export type FieldVariant = "default" | "bordered" | "filled";
export type FieldSize = "sm" | "md" | "lg";
