import { ProviderEnquiryForm } from "@/components/forms/provider-enquiry-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProviderProfile {
  avatar: string;
  name: string;
  rating: string;
  reviews: number;
  location: string;
  clients: string;
  about: string;
  services: { name: string; price: string; icon: string }[];
  certifications: string[];
}

const providers: Record<string, ProviderProfile> = {
  "bright-compliance": {
    avatar: "BC",
    name: "BrightCompliance Solutions",
    rating: "4.8",
    reviews: 124,
    location: "Chennai, Tamil Nadu",
    clients: "2.5k+ clients served",
    about:
      "A hands-on finance and compliance team for growing businesses. BrightCompliance helps keep filings on schedule, books in order and business owners focused on their next step.",
    services: [
      { name: "GST Filing", price: "₹1,499", icon: "G" },
      { name: "TDS Filing", price: "₹999", icon: "T" },
      { name: "Accounting & Bookkeeping", price: "₹2,999", icon: "A" },
      { name: "Company Registration", price: "₹2,999", icon: "C" },
      { name: "Payroll Support", price: "₹1,999", icon: "P" },
    ],
    certifications: [
      "20+ years of experience",
      "PAN India service support",
      "Dedicated compliance team",
    ],
  },
  "tax-pro": {
    avatar: "TP",
    name: "TaxPro Advisors",
    rating: "4.6",
    reviews: 89,
    location: "Bengaluru, Karnataka",
    clients: "1.8k+ clients served",
    about:
      "TaxPro Advisors works with founders and small businesses on income tax, GST and TDS. Get clear filing timelines, practical answers and a point of contact for every engagement.",
    services: [
      { name: "Income Tax Filing", price: "₹1,499", icon: "I" },
      { name: "GST Returns", price: "₹1,499", icon: "G" },
      { name: "TDS Compliance", price: "₹999", icon: "T" },
      { name: "Tax Audit Support", price: "₹4,999", icon: "A" },
    ],
    certifications: [
      "Chartered tax professionals",
      "Small business specialists",
      "Secure document handling",
    ],
  },
  finwise: {
    avatar: "FW",
    name: "FinWise Consultants",
    rating: "4.7",
    reviews: 156,
    location: "Hyderabad, Telangana",
    clients: "3.2k+ clients served",
    about:
      "FinWise gives business owners a dependable view of their finances, from reconciled books to useful monthly reports. Work with a team that explains the numbers in plain language.",
    services: [
      { name: "Monthly Bookkeeping", price: "₹2,499", icon: "B" },
      { name: "Financial Reporting", price: "₹3,499", icon: "F" },
      { name: "Payroll Support", price: "₹1,999", icon: "P" },
      { name: "Virtual CFO", price: "₹9,999", icon: "C" },
    ],
    certifications: [
      "Qualified accounting team",
      "Monthly reporting cadence",
      "Cloud accounting support",
    ],
  },
  "legal-ease": {
    avatar: "LE",
    name: "LegalEase Services",
    rating: "4.5",
    reviews: 67,
    location: "Mumbai, Maharashtra",
    clients: "980+ clients served",
    about:
      "LegalEase supports founders with company formation and recurring ROC work. The team helps you understand the steps, prepare the paperwork and stay on top of important dates.",
    services: [
      { name: "Company Registration", price: "₹3,999", icon: "C" },
      { name: "LLP Registration", price: "₹2,999", icon: "L" },
      { name: "ROC Filings", price: "₹1,499", icon: "R" },
      { name: "Legal Documentation", price: "₹2,499", icon: "D" },
    ],
    certifications: [
      "Company law specialists",
      "Startup-focused support",
      "Clear filing checklists",
    ],
  },
  "audit-assurance": {
    avatar: "AW",
    name: "AuditWise Partners",
    rating: "4.7",
    reviews: 92,
    location: "Pune, Maharashtra",
    clients: "1.1k+ clients served",
    about:
      "AuditWise Partners helps growing companies improve reporting controls and prepare for statutory and internal audits. Engagements start with a clear scope, document checklist and agreed timeline.",
    services: [
      { name: "Statutory Audit", price: "₹5,999", icon: "S" },
      { name: "Internal Audit", price: "₹4,999", icon: "I" },
      { name: "Risk Assurance", price: "₹6,999", icon: "R" },
      { name: "Controls Review", price: "₹3,999", icon: "C" },
    ],
    certifications: [
      "Experienced audit team",
      "Clear scope and timelines",
      "Confidential document handling",
    ],
  },
};

const ratings = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 10 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

export default function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:px-8">
          Loading provider profile...
        </div>
      }
    >
      <ProviderProfile params={params} />
    </Suspense>
  );
}

async function ProviderProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = providers[slug];
  if (!provider) notFound();

  return (
    <main className="min-h-full bg-slate-50/70" data-provider={slug}>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/providers" className="hover:text-primary">
            Providers
          </Link>
          <span>/</span>
          <span>{provider.name}</span>
        </div>

        <Card className="overflow-hidden border-border bg-white shadow-sm">
          <section className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-2xl font-semibold text-sky-100 shadow-md ring-1 ring-border sm:size-24">
              {provider.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="flex flex-wrap items-center gap-2 font-heading text-xl font-bold text-foreground sm:text-2xl">
                {provider.name}
                <BadgeCheck className="size-5 fill-blue-600 text-white" />
              </h1>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="size-3.5" />
                Verified Provider
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-amber-600">
                  <Star className="size-3.5 fill-current" />
                  <strong>{provider.rating}</strong>
                  <span className="text-muted-foreground">
                    ({provider.reviews} reviews)
                  </span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <BriefcaseBusiness className="size-3.5" />
                  {provider.clients}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {provider.location}
                </span>
              </div>
            </div>
            <div className="flex gap-2 sm:flex-col">
              <Button asChild className="flex-1 sm:flex-none">
                <Link href="#contact-provider">
                  Request an introduction <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </section>

          <nav
            className="flex gap-7 overflow-x-auto border-y border-border px-5 sm:px-7"
            aria-label="Provider profile sections"
          >
            {["About", "Services", "Reviews", "Certifications"].map(
              (tab, index) => (
                <a
                  key={tab}
                  href={`#${tab.toLowerCase()}`}
                  className={`whitespace-nowrap border-b-2 py-3 text-xs font-semibold ${
                    index === 0
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-primary"
                  }`}
                >
                  {tab}
                </a>
              ),
            )}
          </nav>

          <div className="divide-y divide-border">
            <section
              id="about"
              className="grid gap-5 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-7"
            >
              <div>
                <h2 className="font-heading text-base font-bold text-foreground">
                  About Us
                </h2>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {provider.about}
                </p>
                <ul className="mt-4 space-y-2">
                  {provider.certifications.map((certification) => (
                    <li
                      key={certification}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700"
                    >
                      <Check className="size-3.5 text-primary" />
                      {certification}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                role="img"
                aria-label="Bright modern office"
                className="min-h-48 rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80')",
                }}
              />
            </section>

            <section id="services" className="p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-heading text-base font-bold text-foreground">
                  Services Offered
                </h2>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  View all services <ChevronRight className="size-3.5" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {provider.services.map((service, index) => (
                  <Card
                    key={service.name}
                    className="border-border bg-white p-4 shadow-none transition-shadow hover:shadow-sm"
                  >
                    <span
                      className={`flex size-9 items-center justify-center rounded-xl text-sm font-bold ${
                        index % 2 === 0
                          ? "bg-blue-50 text-blue-700"
                          : "bg-violet-50 text-violet-700"
                      }`}
                    >
                      {service.icon}
                    </span>
                    <h3 className="mt-3 text-xs font-bold text-foreground">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Starting from{" "}
                      <span className="font-semibold text-foreground">
                        {service.price}
                      </span>
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            <section
              id="reviews"
              className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7"
            >
              <div>
                <h2 className="font-heading text-base font-bold text-foreground">
                  Reviews
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="size-4 fill-current" />
                    {provider.rating}
                  </span>
                  out of 5
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Based on {provider.reviews} reviews
                </p>
                <div className="mt-3 space-y-1.5">
                  {ratings.map(({ stars, percent }) => (
                    <div
                      key={stars}
                      className="flex items-center gap-2 text-[11px] text-muted-foreground"
                    >
                      <span className="w-5">{stars}★</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="h-fit border-border bg-white p-4 shadow-none">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-900">
                    AS
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Anjali Sharma
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      12 Aug 2024
                    </p>
                  </div>
                  <span className="ml-auto flex items-center gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="size-3 fill-current" />
                    ))}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Very professional and responsive team. Helped us with GST
                  filing without any hassle. Highly recommended!
                </p>
              </Card>
            </section>

            <section id="certifications" className="p-5 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {provider.certifications.map((certification) => (
                  <Badge
                    key={certification}
                    variant="outline"
                    className="gap-1.5 px-3 py-1.5 text-xs"
                  >
                    <Check className="size-3 text-emerald-600" />
                    {certification}
                  </Badge>
                ))}
              </div>
            </section>

            <section id="contact-provider" className="bg-blue-50/60 p-5 sm:p-7">
              <div className="mb-4 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Talk to Right Account
                </p>
                <h2 className="mt-1 font-heading text-lg font-bold text-foreground">
                  Request an introduction
                </h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Tell us what you need. Right Account will coordinate the
                  introduction; you can agree scope and payment directly with
                  the provider.
                </p>
              </div>
              <ProviderEnquiryForm
                providerId={slug}
                providerName={provider.name}
                services={provider.services.map((service) => service.name)}
              />
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}
