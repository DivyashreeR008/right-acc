"use client";

import { pageTransition } from "@/lib/motion";
import { motion } from "framer-motion";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-0"
    >
      {children}
    </motion.div>
  );
}
