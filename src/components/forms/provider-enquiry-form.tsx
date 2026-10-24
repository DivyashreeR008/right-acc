"use client";

import { Button } from "@/components/ui/button";
import { type EnquiryInput, enquirySchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ProviderEnquiryFormProps {
  providerId: string;
  providerName: string;
  services: string[];
}

interface EnquiryResponse {
  message?: string;
  error?: string;
}

export function ProviderEnquiryForm({
  providerId,
  providerName,
  services,
}: ProviderEnquiryFormProps) {
  const [responseMessage, setResponseMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      providerId,
      serviceType: services[0] ?? "",
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setResponseMessage(null);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result: EnquiryResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your enquiry.");
      }

      setResponseMessage({
        type: "success",
        text:
          result.message ?? "Your request has been received by Right Account.",
      });
    } catch (error) {
      setResponseMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "We could not send your enquiry. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-2 sm:p-6"
    >
      <input type="hidden" {...register("providerId")} />
      <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
        Your name
        <input
          {...register("name")}
          autoComplete="name"
          className="h-10 rounded-lg border border-border px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
          placeholder="Enter your name"
        />
        {errors.name && (
          <span className="font-normal text-destructive">
            {errors.name.message}
          </span>
        )}
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
        Work email
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          className="h-10 rounded-lg border border-border px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
          placeholder="you@company.com"
        />
        {errors.email && (
          <span className="font-normal text-destructive">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
        Phone number
        <input
          {...register("phoneNumber")}
          type="tel"
          autoComplete="tel"
          className="h-10 rounded-lg border border-border px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
          placeholder="+91 98765 43210"
        />
        {errors.phoneNumber && (
          <span className="font-normal text-destructive">
            {errors.phoneNumber.message}
          </span>
        )}
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
        Service needed
        <select
          {...register("serviceType")}
          className="h-10 rounded-lg border border-border bg-white px-3 text-sm font-normal text-foreground outline-none focus:border-primary"
        >
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
        {errors.serviceType && (
          <span className="font-normal text-destructive">
            {errors.serviceType.message}
          </span>
        )}
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-slate-700 sm:col-span-2">
        What would you like help with?
        <textarea
          {...register("message")}
          rows={4}
          className="resize-y rounded-lg border border-border px-3 py-2 text-sm font-normal text-foreground outline-none focus:border-primary"
          placeholder={`Share a little about your ${services[0]?.toLowerCase() ?? "service"} needs.`}
        />
        {errors.message && (
          <span className="font-normal text-destructive">
            {errors.message.message}
          </span>
        )}
      </label>
      {responseMessage && (
        <output
          aria-live="polite"
          className={`text-sm sm:col-span-2 ${
            responseMessage.type === "success"
              ? "text-emerald-700"
              : "text-destructive"
          }`}
        >
          {responseMessage.text}
        </output>
      )}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-xs leading-5 text-muted-foreground">
          Right Account coordinates the introduction. You and the provider
          discuss the work and payment directly.
        </p>
        <Button type="submit" disabled={isSubmitting} className="h-10 shrink-0">
          {isSubmitting ? "Sending request..." : "Request an introduction"}
        </Button>
      </div>
      <span className="sr-only">Enquiry for {providerName}</span>
    </form>
  );
}
