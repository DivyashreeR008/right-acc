import { cn } from "@/lib/utils";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import * as React from "react";

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:flex-col sm:py-8 sm:px-8",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      "group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border border-border bg-background p-3 text-foreground shadow-sm transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-right-full data-[state=closed]:sm:slide-out-to-right-full data-[state=closed]:sm:slide-out-to-bottom-full",
      className,
    )}
    {...props}
  >
    <ToastPrimitive.Action altText="Close" className="h-4 shrink-0" />
    <ToastPrimitive.Close
      className={cn(
        "rounded-md p-1 opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
    >
      <X className="h-4 w-4" />
    </ToastPrimitive.Close>
  </ToastPrimitive.Root>
));
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription };
