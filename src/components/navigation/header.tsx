"use client";

import { Button } from "@/components/ui/button";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Providers", href: "/providers" },
  { label: "Courses", href: "/learn" },
  { label: "About Us", href: "/about" },
];

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex h-[4.25rem] w-[9.75rem] shrink-0 items-center overflow-hidden sm:w-[10.5rem]"
          aria-label="Right Account home"
        >
          <Image
            src="/right-account-logo.png"
            alt="Right Accounts — Your Genuine Accountant"
            width={168}
            height={72}
            priority
            className="h-full w-full object-cover object-[center_43%]"
          />
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs font-semibold text-slate-600 transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/services"
            aria-label="Search services"
            className="rounded-md p-2 text-slate-600 transition-colors hover:bg-muted hover:text-primary"
          >
            <Search className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="hidden rounded-md p-2 text-slate-600 transition-colors hover:bg-muted hover:text-primary sm:inline-flex"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-8 px-3 text-xs"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild className="h-8 px-3 text-xs">
            <Link href="/register">Sign Up</Link>
          </Button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-md p-2 text-slate-600 hover:bg-muted md:hidden"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav
          className="border-t border-border bg-background px-4 py-3 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
