"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProviderProfileStore } from "@/lib/stores";
import { ArrowLeft, Building2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

export default function ProviderDashboardPage() {
  const profile = useProviderProfileStore((state) => state.profile);
  const addService = useProviderProfileStore((state) => state.addService);
  const updateProfile = useProviderProfileStore((state) => state.updateProfile);
  const updateService = useProviderProfileStore((state) => state.updateService);
  const removeService = useProviderProfileStore((state) => state.removeService);
  const [businessName, setBusinessName] = useState(profile?.businessName ?? "");
  const [description, setDescription] = useState(profile?.description ?? "");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [notice, setNotice] = useState("");

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!businessName.trim()) {
      setNotice("Enter a business name before saving your profile.");
      return;
    }
    updateProfile({
      businessName: businessName.trim(),
      description: description.trim(),
    });
    setNotice("Profile changes saved on this device.");
  };

  const createService = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serviceName.trim()) {
      setNotice("Enter a service name before adding a listing.");
      return;
    }
    addService({
      id: crypto.randomUUID(),
      name: serviceName.trim(),
      startingPrice: servicePrice.trim() || "Contact for pricing",
      description: serviceDescription.trim(),
    });
    setServiceName("");
    setServicePrice("");
    setServiceDescription("");
    setNotice("Service listing added to your draft profile.");
  };

  if (!profile) {
    return (
      <main className="min-h-full bg-slate-50/70">
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <Card className="p-8 text-center sm:p-12">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <Building2 className="size-6" />
            </span>
            <h1 className="mt-5 font-heading text-2xl font-bold text-foreground">
              Your provider workspace
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Register as a service provider to create a profile and manage the
              services customers can find.
            </p>
            <Button asChild className="mt-6">
              <Link href="/register?type=service_provider">
                Create provider profile
              </Link>
            </Button>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-slate-50/70">
      <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Browse services
        </Link>
        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Provider workspace
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Manage your profile
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep your business details and service listings up to date.
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
            Awaiting Right Account review
          </span>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-5 sm:p-6">
            <h2 className="font-heading text-base font-bold text-foreground">
              Business profile
            </h2>
            <form onSubmit={saveProfile} className="mt-4 space-y-4">
              <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
                Business name
                <input
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  className="h-10 rounded-lg border border-border px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
                />
              </label>
              <div className="grid gap-1.5 text-xs font-semibold text-slate-700">
                Contact email
                <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-700">
                  {profile.email}
                </p>
              </div>
              <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
                About your business
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={5}
                  maxLength={500}
                  className="resize-y rounded-lg border border-border px-3 py-2 text-sm font-normal text-foreground outline-none focus:border-primary"
                />
              </label>
              <Button type="submit">Save profile</Button>
            </form>
          </Card>

          <section>
            <Card className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading text-base font-bold text-foreground">
                    Services you offer
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Edit or add services customers can search for.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {profile.services.length}
                </span>
              </div>

              <form
                onSubmit={createService}
                className="mt-4 grid gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"
              >
                <label className="grid gap-1 text-xs font-semibold text-slate-700">
                  Service name
                  <input
                    value={serviceName}
                    onChange={(event) => setServiceName(event.target.value)}
                    placeholder="e.g. Monthly GST filing"
                    className="h-9 rounded-lg border border-border bg-white px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold text-slate-700">
                  Starting price (optional)
                  <input
                    value={servicePrice}
                    onChange={(event) => setServicePrice(event.target.value)}
                    placeholder="e.g. ₹1,499"
                    className="h-9 rounded-lg border border-border bg-white px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold text-slate-700">
                  Short description
                  <input
                    value={serviceDescription}
                    onChange={(event) =>
                      setServiceDescription(event.target.value)
                    }
                    placeholder="Describe what is included"
                    className="h-9 rounded-lg border border-border bg-white px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
                  />
                </label>
                <Button type="submit" variant="outline" className="w-fit">
                  <Plus className="mr-2 size-4" />
                  Add service
                </Button>
              </form>

              <div className="mt-4 space-y-3">
                {profile.services.map((service) => (
                  <article
                    key={service.id}
                    className="rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid flex-1 gap-3 sm:grid-cols-2">
                        <label className="grid gap-1 text-[11px] font-semibold text-slate-600">
                          Service
                          <input
                            value={service.name}
                            onChange={(event) =>
                              updateService(service.id, {
                                name: event.target.value,
                              })
                            }
                            className="h-9 rounded-md border border-border px-2 text-sm font-normal text-foreground outline-none focus:border-primary"
                          />
                        </label>
                        <label className="grid gap-1 text-[11px] font-semibold text-slate-600">
                          Starting price
                          <input
                            value={service.startingPrice}
                            onChange={(event) =>
                              updateService(service.id, {
                                startingPrice: event.target.value,
                              })
                            }
                            className="h-9 rounded-md border border-border px-2 text-sm font-normal text-foreground outline-none focus:border-primary"
                          />
                        </label>
                        <label className="grid gap-1 text-[11px] font-semibold text-slate-600 sm:col-span-2">
                          Description
                          <input
                            value={service.description}
                            onChange={(event) =>
                              updateService(service.id, {
                                description: event.target.value,
                              })
                            }
                            className="h-9 rounded-md border border-border px-2 text-sm font-normal text-foreground outline-none focus:border-primary"
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removeService(service.id);
                          setNotice(
                            `${service.name} removed from your profile.`,
                          );
                        }}
                        className="rounded-md p-2 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
                        aria-label={`Remove ${service.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </article>
                ))}
                {profile.services.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                    Add your first service listing above.
                  </p>
                )}
              </div>
            </Card>
          </section>
        </div>

        {notice && (
          <output aria-live="polite" className="mt-4 text-xs text-primary">
            {notice}
          </output>
        )}
        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Changes are stored in this browser for the prototype. Right Account
          administrator review, account access and publishing require the
          production backend.
        </p>
      </div>
    </main>
  );
}
