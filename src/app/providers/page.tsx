"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listItemTransition } from "@/lib/motion";
import { providers } from "@/lib/providers";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  MapPin,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const locations = [
  "All Locations",
  ...Array.from(new Set(providers.map((provider) => provider.location))),
];
const categories = [
  "All Categories",
  ...Array.from(new Set(providers.map((provider) => provider.category))),
];
const priceRanges = [
  { id: "under-5000", label: "Under ₹5,000" },
  { id: "5000-15000", label: "₹5,000–₹15,000" },
  { id: "15000-30000", label: "₹15,000–₹30,000" },
  { id: "over-30000", label: "Above ₹30,000" },
];

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [location, setLocation] = React.useState("All Locations");
  const [category, setCategory] = React.useState("All Categories");
  const [experience, setExperience] = React.useState("Any Experience");
  const [selectedPriceRanges, setSelectedPriceRanges] = React.useState<
    string[]
  >([]);
  const [sortOrder, setSortOrder] = React.useState("Relevance");

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setSearchQuery(query.get("q") ?? query.get("service") ?? "");
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProviders = providers
    .filter((provider) => {
      const searchableText = [
        provider.name,
        provider.category,
        provider.location,
        ...provider.services.map((service) => service.name),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = normalizedQuery
        .split(/\s+/)
        .filter(Boolean)
        .every((term) => searchableText.includes(term));
      const matchesLocation =
        location === "All Locations" || provider.location === location;
      const matchesCategory =
        category === "All Categories" || provider.category === category;
      const matchesExperience =
        experience === "Any Experience" ||
        provider.yearsExperience >= Number.parseInt(experience, 10);
      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => {
          if (range === "under-5000") return provider.startingPrice < 5000;
          if (range === "5000-15000") {
            return (
              provider.startingPrice >= 5000 && provider.startingPrice <= 15000
            );
          }
          if (range === "15000-30000") {
            return (
              provider.startingPrice > 15000 && provider.startingPrice <= 30000
            );
          }
          return range === "over-30000" && provider.startingPrice > 30000;
        });

      return (
        matchesQuery &&
        matchesLocation &&
        matchesCategory &&
        matchesExperience &&
        matchesPrice
      );
    })
    .sort((first, second) => {
      if (sortOrder === "Rating") return second.rating - first.rating;
      if (sortOrder === "Price: Low to High") {
        return first.startingPrice - second.startingPrice;
      }
      return 0;
    });

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    window.history.replaceState(
      null,
      "",
      query ? `/providers?q=${encodeURIComponent(query)}` : "/providers",
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          role="img"
          aria-label="Professionals collaborating around a table"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/70" />
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100">
              <ShieldCheck className="size-4" />
              Independent service professionals
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Meet the people
              <br className="hidden sm:block" /> behind the expertise
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
              Explore provider profiles, compare their services and experience,
              then ask Right Account to help make an introduction.
            </p>
            <form
              onSubmit={submitSearch}
              className="mt-7 flex max-w-2xl flex-col gap-2 rounded-xl bg-white p-2 shadow-xl sm:flex-row"
            >
              <label className="flex min-h-12 flex-1 items-center gap-3 px-3 text-slate-500">
                <Search className="size-5 shrink-0 text-primary" />
                <span className="sr-only">Search providers or services</span>
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by provider, service or location"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>
              <Button type="submit" className="h-11 px-6">
                Find providers <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-slate-300">
              Introductions are coordinated by Right Account. Customers and
              providers agree scope and payment directly.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Provider directory
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">
              Find a professional for your work
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Browse services <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-foreground">
              Refine your search
            </h3>
            <label className="mb-4 block text-xs font-medium text-slate-600">
              Service category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border border-border bg-white px-2 text-xs text-foreground outline-none focus:border-primary"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="mb-4 block text-xs font-medium text-slate-600">
              Location
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border border-border bg-white px-2 text-xs text-foreground outline-none focus:border-primary"
              >
                {locations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium text-slate-600">
              Experience
              <select
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border border-border bg-white px-2 text-xs text-foreground outline-none focus:border-primary"
              >
                <option>Any Experience</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
                <option value="15">15+ years</option>
              </select>
            </label>
            <fieldset className="mt-4">
              <legend className="mb-2 text-xs font-medium text-slate-600">
                Starting price
              </legend>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label
                    key={range.id}
                    className="flex items-center gap-2 text-xs text-slate-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.id)}
                      onChange={(event) =>
                        setSelectedPriceRanges((current) =>
                          event.target.checked
                            ? [...current, range.id]
                            : current.filter((item) => item !== range.id),
                        )
                      }
                      className="size-3.5 accent-primary"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </aside>

          <section aria-label="Service providers" className="scroll-mt-20">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-foreground">
                {filteredProviders.length}{" "}
                {filteredProviders.length === 1 ? "provider" : "providers"}
              </p>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Sort by
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  className="rounded-md border border-border bg-white px-2 py-1.5 text-xs text-foreground outline-none"
                >
                  <option>Relevance</option>
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                </select>
              </label>
            </div>
            <div className="space-y-3">
              {filteredProviders.map((provider) => (
                <motion.div
                  key={provider.id}
                  variants={listItemTransition}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="flex flex-col gap-4 border-border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center">
                    <div
                      className={`flex size-14 shrink-0 items-center justify-center rounded-full text-base font-bold ${provider.avatarColor}`}
                      aria-hidden="true"
                    >
                      {provider.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/services/${provider.id}`}
                        className="font-heading text-sm font-bold text-foreground hover:text-primary"
                      >
                        {provider.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {provider.category}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {provider.services.slice(0, 3).map((service) => (
                          <span
                            key={service.name}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600"
                          >
                            {service.name}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                        {provider.verified && (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                            <BadgeCheck className="size-3.5" />
                            Verified
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3" />
                          {provider.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BriefcaseBusiness className="size-3" />
                          {provider.yearsExperience}+ years
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-border pt-3 sm:w-40 sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:pt-0">
                      <div>
                        <p className="text-[10px] text-muted-foreground">
                          Services from
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          ₹{provider.startingPrice.toLocaleString("en-IN")}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-foreground">
                            {provider.rating.toFixed(1)}
                          </span>
                          ({provider.reviews} reviews)
                        </p>
                      </div>
                      <Button asChild size="sm" className="h-8 text-xs">
                        <Link href={`/services/${provider.id}`}>
                          View profile
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
              {filteredProviders.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-white py-12 text-center">
                  <Search className="mx-auto size-6 text-muted-foreground" />
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    No providers match those filters
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try another service, location or experience level.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
