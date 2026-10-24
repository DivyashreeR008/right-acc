import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("rounded-md border border-border", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-md">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar className="flex-0 h-full w-2 px-0.5">
      <ScrollAreaPrimitive.Thumb className="rounded-full border border-border bg-accent/50" />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollArea };
