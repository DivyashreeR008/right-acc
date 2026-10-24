"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { slideUp } from "@/lib/motion";
import { useLeadFormStore, useProviderProfileStore } from "@/lib/stores";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building,
  Check,
  HelpCircle,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    accountType: z.enum(["service_provider", "customer"], {
      required_error: "Please select an account type",
    }),
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    services: z.array(z.string()),
    profileDescription: z
      .string()
      .max(500, "Profile description must be 500 characters or fewer"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine(
    (data) =>
      data.accountType !== "service_provider" || data.services.length > 0,
    {
      message: "Choose at least one service you provide",
      path: ["services"],
    },
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const serviceOptions = [
  "GST filing",
  "Accounting & bookkeeping",
  "Income tax",
  "Company registration",
  "Compliance & payroll",
  "Audit & assurance",
];

export default function RegisterPage() {
  const [accountType, setAccountType] = React.useState<
    "service_provider" | "customer"
  >("service_provider");
  const [courseInterest, setCourseInterest] = React.useState<string | null>(
    null,
  );
  const [toastMessage, setToastMessage] = React.useState<{
    title: string;
    description: string;
    variant?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType,
      businessName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      services: [],
      profileDescription: "",
      terms: false,
    },
  });

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const requestedType = searchParams.get("type");
    if (requestedType === "customer" || requestedType === "service_provider") {
      setAccountType(requestedType);
      setValue("accountType", requestedType);
    }
    setCourseInterest(searchParams.get("course"));
  }, [setValue]);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { setDraft } = useLeadFormStore.getState();
      setDraft("businessName", values.businessName);
      setDraft("email", values.email);
      setDraft("phoneNumber", values.phoneNumber);
      setDraft(
        "serviceType",
        courseInterest ??
          (values.accountType === "service_provider"
            ? values.services.join(", ")
            : values.accountType),
      );
      if (values.profileDescription.trim()) {
        setDraft("message", values.profileDescription.trim());
      }
      if (courseInterest) {
        setDraft("message", `Course registration interest: ${courseInterest}`);
      }
      if (values.accountType === "service_provider") {
        useProviderProfileStore.getState().saveProfile({
          businessName: values.businessName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          description: values.profileDescription,
          status: "pending_review",
          services: values.services.map((name, index) => ({
            id: `${Date.now()}-${index}`,
            name,
            startingPrice: "Contact for pricing",
            description: "",
          })),
        });
      }

      setToastMessage({
        title: "Registration details saved",
        description:
          "Your details are saved in this browser. Account activation and provider review are not connected to a production backend yet.",
      });
    } catch {
      setToastMessage({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <ToastProvider>
      <div className="flex flex-col h-full">
        {toastMessage && (
          <div className="fixed right-4 top-16 z-50 w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-border bg-white p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Check className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {toastMessage.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {toastMessage.description}
                </p>
                {accountType === "service_provider" &&
                  toastMessage.variant !== "destructive" && (
                    <Link
                      href="/provider/dashboard"
                      className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline"
                    >
                      Manage your provider profile
                    </Link>
                  )}
              </div>
            </div>
          </div>
        )}
        <section className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:grid-cols-12">
              <div className="hidden min-h-[620px] lg:col-span-5 lg:flex lg:flex-col lg:justify-end">
                <div
                  className="relative flex h-full items-end bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85')",
                  }}
                >
                  <div className="absolute inset-0 bg-slate-950/65" />
                  <div className="relative z-10 p-9 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-5"
                    >
                      <h2 className="font-heading text-3xl font-bold">
                        Join as a{" "}
                        {accountType === "service_provider"
                          ? "Service Provider"
                          : "Customer"}
                      </h2>
                      <p className="text-primary-foreground/90">
                        {accountType === "service_provider"
                          ? "Showcase your expertise and connect with potential clients looking for your services."
                          : "Find and connect with verified service providers for your business needs."}
                      </p>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-3">
                          <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                            <Check className="size-4 text-white" />
                          </span>
                          <span>Get verified and build credibility</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                            <Building className="size-4 text-white" />
                          </span>
                          <span>Manage your services and availability</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                            <ArrowRight className="size-4 text-white" />
                          </span>
                          <span>Grow your business with us</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:col-span-7">
                <div className="p-5 sm:p-8">
                  <h1 className="font-heading text-xl font-bold text-foreground">
                    {courseInterest
                      ? "Register your interest"
                      : "Create your account"}
                  </h1>
                  <p className="mb-6 mt-1 text-sm text-muted-foreground">
                    {courseInterest
                      ? `Tell us how to reach you about ${courseInterest.replace(/-/g, " ")}.`
                      : "Choose an account type to get started."}
                  </p>

                  <div className="flex rounded-lg border border-border bg-slate-50 p-1">
                    <Button
                      variant={
                        accountType === "service_provider"
                          ? "default"
                          : "outline"
                      }
                      type="button"
                      onClick={() => {
                        setAccountType("service_provider");
                        setValue("accountType", "service_provider");
                      }}
                      className="flex-1"
                    >
                      Service Provider
                    </Button>
                    <Button
                      variant={
                        accountType === "customer" ? "default" : "outline"
                      }
                      type="button"
                      onClick={() => {
                        setAccountType("customer");
                        setValue("accountType", "customer");
                      }}
                      className="flex-1"
                    >
                      Customer
                    </Button>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>
                            {accountType === "customer"
                              ? "Your name or business"
                              : "Business Name"}
                          </Label>
                          <Input
                            {...register("businessName")}
                            placeholder={
                              accountType === "customer"
                                ? "Enter your name or business"
                                : "Enter business name"
                            }
                            className={cn(
                              "h-10",
                              errors.businessName && "border-destructive",
                            )}
                          />
                          {errors.businessName && (
                            <p className="text-xs text-destructive">
                              {errors.businessName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Email Address</Label>
                          <Input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email address"
                            className={cn(
                              "h-10",
                              errors.email && "border-destructive",
                            )}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="flex gap-2">
                          <Input
                            disabled
                            defaultValue="+91 "
                            className="w-20 h-10 bg-muted"
                          />
                          <Input
                            {...register("phoneNumber")}
                            placeholder="Enter phone number"
                            className={cn(
                              "h-10",
                              errors.phoneNumber && "border-destructive",
                            )}
                          />
                          {errors.phoneNumber && (
                            <p className="text-xs text-destructive">
                              {errors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          {...register("password")}
                          placeholder="Create a password"
                          className={cn(
                            "h-10",
                            errors.password && "border-destructive",
                          )}
                        />
                        {errors.password && (
                          <p className="text-xs text-destructive">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <Input
                          type="password"
                          {...register("confirmPassword")}
                          placeholder="Confirm your password"
                          className={cn(
                            "h-10",
                            errors.confirmPassword && "border-destructive",
                          )}
                        />
                        {errors.confirmPassword && (
                          <p className="text-xs text-destructive">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        id="terms"
                        type="checkbox"
                        {...register("terms")}
                        className="mt-1 h-4 w-4"
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                      {errors.terms && (
                        <p className="text-xs text-destructive">
                          {errors.terms.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11"
                    >
                      {isSubmitting ? "Creating account..." : "Register"}
                    </Button>
                  </form>

                  <Separator className="my-6" />
                  <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-primary hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                </div>

                <div className="bg-muted p-6 border-t border-border">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Why join Right Account?
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Connect with verified professionals and grow your
                        business.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2 text-xs">
                        <li className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>Verified professionals only</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>Direct communication with providers</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span>Transparent pricing upfront</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                          <span>Dedicated support team</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {accountType === "service_provider" && (
                <>
                  <fieldset className="space-y-3 rounded-xl border border-border p-4 sm:col-span-2">
                    <legend className="px-1 text-sm font-semibold text-foreground">
                      Services you provide
                    </legend>
                    <p className="text-xs text-muted-foreground">
                      Choose the services customers should find on your profile.
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {serviceOptions.map((service) => (
                        <label
                          key={service}
                          className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700"
                        >
                          <input
                            {...register("services")}
                            type="checkbox"
                            value={service}
                            className="size-4 accent-primary"
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                    {errors.services && (
                      <p className="text-xs text-destructive">
                        {errors.services.message}
                      </p>
                    )}
                  </fieldset>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="profileDescription">
                      Short profile introduction
                    </Label>
                    <textarea
                      id="profileDescription"
                      {...register("profileDescription")}
                      rows={3}
                      placeholder="Describe your experience and the kind of businesses you support."
                      className={cn(
                        "w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        errors.profileDescription && "border-destructive",
                      )}
                    />
                    {errors.profileDescription && (
                      <p className="text-xs text-destructive">
                        {errors.profileDescription.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}
