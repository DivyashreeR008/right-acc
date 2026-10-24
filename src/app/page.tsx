import {
  ArrowRight,
  BadgeIndianRupee,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Business & Registration",
    description: "Company, LLP, partnership, MSME and more",
    icon: Building2,
    iconStyle: "bg-blue-50 text-blue-700",
  },
  {
    title: "Accounting & Bookkeeping",
    description: "Virtual accounting, financial statements and more",
    icon: Calculator,
    iconStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Taxation",
    description: "GST, TDS, income tax and more",
    icon: BadgeIndianRupee,
    iconStyle: "bg-orange-50 text-orange-700",
  },
  {
    title: "Compliance & Payroll",
    description: "EPF, ESI, professional tax and more",
    icon: ClipboardCheck,
    iconStyle: "bg-violet-50 text-violet-700",
  },
  {
    title: "Audits & Assurance",
    description: "Statutory audit, internal audit and more",
    icon: FileCheck2,
    iconStyle: "bg-rose-50 text-rose-700",
  },
];

const popularSearches = [
  "GST Filing",
  "Company Registration",
  "Accounting",
  "Taxation",
  "Compliance",
];

export default function Home() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/70" />
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100">
              <ShieldCheck className="size-4" />A clearer way to find business
              support
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The right expertise
              <br className="hidden sm:block" /> for your next business step
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
              Compare professionals for accounting, tax and compliance, then
              contact the one that fits your business.
            </p>

            <form
              action="/providers"
              className="mt-7 flex max-w-2xl flex-col gap-2 rounded-xl bg-white p-2 shadow-xl sm:flex-row"
            >
              <label className="flex min-h-12 flex-1 items-center gap-3 px-3 text-slate-500">
                <Search className="size-5 shrink-0 text-primary" />
                <span className="sr-only">Search for a service</span>
                <input
                  name="q"
                  placeholder="Search for a service (e.g. GST, Accounting, Company Registration)"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Search <ArrowRight className="size-4" />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium text-slate-200">
                Popular searches:
              </span>
              {popularSearches.map((search) => (
                <Link
                  key={search}
                  href={`/providers?q=${encodeURIComponent(search)}`}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                >
                  {search}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Everything your business needs
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Explore our services
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex"
          >
            View all services <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {services.map(({ title, description, icon: Icon, iconStyle }) => (
            <Link
              key={title}
              href={`/providers?q=${encodeURIComponent(title)}`}
              className="group flex items-start gap-4 py-5 sm:flex-col sm:px-5 sm:py-4 first:sm:pl-0 last:sm:pr-0"
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:-translate-y-1 ${iconStyle}`}
              >
                <Icon className="size-6" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-sm font-bold text-foreground">
                  {title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline sm:hidden"
        >
          View all services <ArrowRight className="size-4" />
        </Link>
      </section>

      <section className="mx-auto mb-10 grid max-w-7xl gap-4 px-5 sm:px-8 lg:mb-14 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col justify-center rounded-2xl bg-blue-50 p-6 sm:p-8">
          <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
            <BriefcaseBusiness className="size-5" />
          </div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Put your expertise in front of more businesses.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Create a profile, list your services and help customers find the
            right support.
          </p>
          <Link
            href="/register?type=service_provider"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Create a provider profile <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-slate-50 p-6 sm:p-8">
          <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
            <GraduationCap className="size-5" />
          </div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Build practical skills for your business.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Learn accounting, tax and finance through focused, practical
            courses.
          </p>
          <Link
            href="/learn"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Browse the course library <BookOpenCheck className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
