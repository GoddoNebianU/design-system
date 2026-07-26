"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./cn";

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-full mx-4",
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: keyof typeof sizeClasses;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: ModalProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-modal bg-black/50 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
          onPointerDownOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
          className={cn(
            "fixed left-1/2 top-1/2 z-modal flex max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-card shadow-2xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            sizeClasses[size],
            className
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

Modal.Header = function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between border-b border-border p-6", className)} {...props}>
      {children}
    </div>
  );
};

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

Modal.Title = function ModalTitle({ children, className, ...props }: ModalTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn("text-xl font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  );
};

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

Modal.Body = function ModalBody({ children, className, ...props }: ModalBodyProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)} {...props}>
      {children}
    </div>
  );
};

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}

Modal.Footer = function ModalFooter({
  children,
  align = "right",
  className,
  ...props
}: ModalFooterProps) {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={cn("flex items-center gap-3 border-t border-border p-6", alignClasses[align], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label"?: string;
}

Modal.CloseButton = function ModalCloseButton({
  className,
  "aria-label": ariaLabel = "Close",
  ...props
}: ModalCloseButtonProps) {
  return (
    <DialogPrimitive.Close
      aria-label={ariaLabel}
      className={cn(
        "rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <X className="h-5 w-5" />
    </DialogPrimitive.Close>
  );
};
