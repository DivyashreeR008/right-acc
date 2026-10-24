import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeIndianRupee,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const serviceGroups = [
  {
    title: "Business registration",
    description:
      "Get support setting up a company and handling the registrations that follow.",
    icon: Building2,
    iconStyle: "bg-blue-50 text-blue-700",
    services: ["Company Registration", "LLP Registration", "ROC Filings"],
  },
  {
    title: "Accounting & bookkeeping",
    description:
      "Keep financial records current and get a clearer view of business performance.",
    icon: Calculator,
    iconStyle: "bg-emerald-50 text-emerald-700",
    services: [
      "Monthly Bookkeeping",
      "Financial Reporting",
      "Accounting Support",
    ],
  },
  {
    title: "Taxation",
    description:
      "Find help with recurring returns, income tax and related filing requirements.",
    icon: BadgeIndianRupee,
    iconStyle: "bg-orange-50 text-orange-700",
    services: ["GST Filing", "Income Tax Filing", "TDS Filing"],
  },
  {
    title: "Compliance & payroll",
    description:
      "Connect with professionals for compliance calendars and payroll support.",
    icon: ClipboardCheck,
    iconStyle: "bg-violet-50 text-violet-700",
    services: ["Compliance", "Payroll Support", "TDS Compliance"],
  },
  {
    title: "Audit & assurance",
    description:
      "Explore support for statutory audits, internal reviews and business controls.",
    icon: FileCheck2,
    iconStyle: "bg-rose-50 text-rose-700",
    services: ["Statutory Audit", "Internal Audit", "Risk Assurance"],
  },
  {
    title: "Business advisory",
    description:
      "Get practical financial guidance to support the decisions ahead.",
    icon: BriefcaseBusiness,
    iconStyle: "bg-sky-50 text-sky-700",
    services: ["Virtual CFO", "Financial Planning", "Business Support"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50/70">
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="size-4" />
              Services for growing businesses
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Start with the work
              <br className="hidden sm:block" /> you need done
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Browse common business services, then view the independent
              providers who offer them. Right Account helps make the
              introduction; you agree the engagement directly with your
              provider.
            </p>
            <form
              action="/providers"
              className="mt-6 flex max-w-2xl flex-col gap-2 rounded-xl border border-border bg-white p-2 shadow-sm sm:flex-row"
            >
              <label className="flex min-h-11 flex-1 items-center gap-3 px-3 text-slate-500">
                <Search className="size-5 shrink-0 text-primary" />
                <span className="sr-only">Search services</span>
                <input
                  name="q"
                  placeholder="Search a service, e.g. GST filing"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
              <Button type="submit" className="h-11 px-6">
                Find providers <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Service directory
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Choose a category to get started
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Select a specific service to see matching provider profiles and
            request an introduction.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map(
            ({ title, description, icon: Icon, iconStyle, services }) => (
              <article
                key={title}
                className="group flex h-full flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6"
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${iconStyle}`}
                >
                  <Icon className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {services.map((service) => (
                    <Link
                      key={service}
                      href={`/providers?q=${encodeURIComponent(service)}`}
                      className="rounded-full border border-border bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:border-primary/40 hover:bg-blue-50 hover:text-primary"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/providers?q=${encodeURIComponent(services[0])}`}
                  className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary"
                >
                  View matching providers
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
