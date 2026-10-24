"use client";

import { Button } from "@/components/ui/button";
import { listItemTransition } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Describe what you need",
    description:
      "Customers browse the service catalog and find providers whose experience fits the work.",
    icon: Search,
  },
  {
    number: "02",
    title: "Request an introduction",
    description:
      "Right Account receives the request and helps connect the customer with the selected provider.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Agree the engagement",
    description:
      "The customer and provider discuss requirements, confirm scope and agree payment directly.",
    icon: ClipboardCheck,
  },
];

const roles = [
  {
    title: "Customers",
    description:
      "Explain the work, review provider profiles, choose who to approach and decide whether to proceed after discussing the scope.",
    icon: UserRound,
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Service providers",
    description:
      "Create and maintain a clear profile, list the services they offer, respond to introductions and agree delivery terms directly with customers.",
    icon: BriefcaseBusiness,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Right Account team",
    description:
      "Manage the provider directory, review submitted profiles, route customer enquiries and support the introduction without taking over either party’s engagement.",
    icon: ShieldCheck,
    color: "bg-violet-50 text-violet-700",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          role="img"
          aria-label="A team working together in a bright office"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/70" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100">
              <Handshake className="size-4" />A connection point for businesses
              and specialists
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Good work starts
              <br className="hidden sm:block" /> with the right introduction
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              Right Account helps customers find relevant business services and
              gives independent providers a place to present their expertise. We
              connect the two sides; they decide together how the work moves
              forward.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/services">
                  Explore services <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link href="/providers">Meet providers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              How the connection works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-foreground">
              A guided introduction, not a checkout
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Right Account is the mediator between customers and service
              providers. We help people find each other and start a
              conversation; the service agreement stays between them.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Customers and providers discuss deliverables, timelines and
              payment directly before deciding to work together.
            </p>
          </div>

          <ol className="space-y-3">
            {steps.map(({ number, title, description, icon: Icon }) => (
              <motion.li
                key={number}
                variants={listItemTransition}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="group flex gap-4 rounded-xl border border-border bg-slate-50/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md sm:p-6"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-primary">
                    STEP {number}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Clear responsibilities
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
              Three roles, one straightforward process
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Each participant has a defined part in making a useful
              introduction and setting up a successful engagement.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {roles.map(({ title, description, icon: Icon, color }) => (
              <motion.article
                key={title}
                variants={listItemTransition}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-xl ${color}`}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-10 lg:py-16">
        <div
          role="img"
          aria-label="Practical team training session"
          className="min-h-72 rounded-2xl bg-cover bg-center shadow-sm"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85')",
          }}
        />
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Practical learning
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Skills that carry into the work
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Alongside the provider directory, Right Account can support
            employees and individuals with practical, industry-oriented
            training, onboarding and online classes.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Learning offerings are designed to build confidence with real
            workflows in accounting, tax and business operations.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/learn">
                <GraduationCap className="mr-2 size-4" />
                View courses
              </Link>
            </Button>
            <Link
              href="/register?type=service_provider"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <BookOpenCheck className="size-4" />
              Join as a provider
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-blue-50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Looking for a service or ready to offer one?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start with the directory that fits your next step.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/providers">Find a provider</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register?type=service_provider">
                Create a provider profile
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
