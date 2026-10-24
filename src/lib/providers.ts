export interface ProviderService {
  name: string;
  price: string;
  icon: string;
}

export interface Provider {
  id: string;
  avatar: string;
  avatarColor: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  clients: string;
  startingPrice: number;
  yearsExperience: number;
  category: string;
  verified: boolean;
  about: string;
  services: ProviderService[];
  certifications: string[];
}

export const providers: Provider[] = [
  {
    id: "bright-compliance",
    avatar: "BC",
    avatarColor: "bg-sky-100 text-sky-900",
    name: "BrightCompliance Solutions",
    rating: 4.8,
    reviews: 124,
    location: "Chennai, Tamil Nadu",
    clients: "2.5k+ clients served",
    startingPrice: 2999,
    yearsExperience: 20,
    category: "Compliance",
    verified: true,
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
  {
    id: "tax-pro",
    avatar: "TP",
    avatarColor: "bg-violet-100 text-violet-900",
    name: "TaxPro Advisors",
    rating: 4.6,
    reviews: 89,
    location: "Bengaluru, Karnataka",
    clients: "1.8k+ clients served",
    startingPrice: 1499,
    yearsExperience: 8,
    category: "Taxation",
    verified: true,
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
  {
    id: "finwise",
    avatar: "FW",
    avatarColor: "bg-blue-100 text-blue-900",
    name: "FinWise Consultants",
    rating: 4.7,
    reviews: 156,
    location: "Hyderabad, Telangana",
    clients: "3.2k+ clients served",
    startingPrice: 2499,
    yearsExperience: 12,
    category: "Accounting & Bookkeeping",
    verified: true,
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
  {
    id: "legal-ease",
    avatar: "LE",
    avatarColor: "bg-slate-200 text-slate-900",
    name: "LegalEase Services",
    rating: 4.5,
    reviews: 67,
    location: "Mumbai, Maharashtra",
    clients: "980+ clients served",
    startingPrice: 3999,
    yearsExperience: 10,
    category: "Company Registration",
    verified: true,
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
  {
    id: "audit-assurance",
    avatar: "AW",
    avatarColor: "bg-amber-100 text-amber-900",
    name: "AuditWise Partners",
    rating: 4.7,
    reviews: 92,
    location: "Pune, Maharashtra",
    clients: "1.1k+ clients served",
    startingPrice: 5999,
    yearsExperience: 15,
    category: "Audit & Assurance",
    verified: true,
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
];
