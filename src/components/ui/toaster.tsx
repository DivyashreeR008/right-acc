"use client";

import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import * as React from "react";

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  );
}
