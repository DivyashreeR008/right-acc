"use client";

import { Card } from "@/components/ui/card";
import { listItemTransition } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  level?: string;
  duration?: string;
  price?: string;
  index: number;
}

export function CourseCard({
  slug,
  title,
  description,
  category,
  level,
  duration,
  price,
  index,
}: CourseCardProps) {
  return (
    <motion.div
      variants={listItemTransition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        href={`/learn/${slug}`}
        className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <div
            className={`flex h-28 items-center justify-center ${
              index % 2 === 0
                ? "bg-gradient-to-br from-blue-100 to-sky-50"
                : "bg-gradient-to-br from-emerald-100 to-teal-50"
            }`}
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="size-6" />
            </span>
          </div>
          <div className="p-4">
            <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-primary">
              {category}
            </span>
            <h3 className="mt-3 min-h-10 font-heading text-sm font-bold text-foreground">
              {title}
            </h3>
            <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock3 className="size-3" />
                {level ?? "Self-paced"}
                {duration && ` · ${duration}`}
              </span>
              <span className="font-semibold text-foreground">
                {price ?? "Free"}
              </span>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              View course <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
