import React from "react";
import { cn } from "./cn";

/**
 * Navbar 导航栏纯展示原语
 *
 * 零业务耦合：不含 auth / i18n / routing 逻辑，只提供 lernu.cc 各项目统一
 * 的导航栏视觉外壳（灰蓝底 + 白字，learn-languages 风格）与共享 className
 * 常量。消费端在各项目内自行组合业务子组件（语言切换、登录链接、移动菜单等）。
 *
 * 配色来自 tokens.css 的 `--primary-500`（灰蓝 `#8594a8`），由各项目已接入
 * 的 `@goddonebianu/design-system/tokens.css` 注入。容器高度 `h-16` = 4rem，
 * 与各项目 globals.css 的 `--navbar-h` 对齐。
 *
 * 纯展示组件，无 hooks，无需 "use client"。
 */

/**
 * 导航栏内链接样式 — 白字 + hover 半透明白底圆角药丸。
 *
 * 用 `!` important 修饰符（`hidden!` / `md:block!`）控制可见性时，需在
 * 消费端拼接（Tailwind v4 important-modifier 语法），本常量只承载基础外观。
 */
export const navLinkClassName =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10";

/**
 * 导航栏内图标按钮样式 — 用于语言切换 / 移动菜单等 dropdown trigger。
 *
 * 比 `navLinkClassName` 更紧凑（`p-2` 无文字），含完整 focus ring。
 */
export const navbarIconButtonClassName =
  "inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export interface NavbarBarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * Navbar 容器 — lernu.cc 统一的灰蓝色顶栏。
 *
 * `h-16`（4rem）高度，`bg-primary-500` 灰蓝底，白字，subtle shadow。
 * 用 `justify-between` 让消费端自由组织左右两簇内容（左侧品牌 / 右侧工具）。
 *
 * @example
 * ```tsx
 * <NavbarBar>
 *   <Link href="/" className={navLinkClassName}>{t("title")}</Link>
 *   <div className="flex items-center gap-0.5">{/* 语言 / auth / 移动菜单 *\/}</div>
 * </NavbarBar>
 * ```
 */
export function NavbarBar({ children, className, ...props }: NavbarBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 w-full items-center justify-between bg-primary-500 px-4 text-white shadow-sm md:px-8",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}
