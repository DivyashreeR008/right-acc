import { describe, expect, it } from "vitest";
import { enquirySchema, registerSchema } from ".";

describe("registerSchema", () => {
  it("validates a complete service provider registration", () => {
    const result = registerSchema.safeParse({
      accountType: "service_provider",
      businessName: "BrightCompliance Solutions",
      email: "hello@brightcompliance.in",
      phoneNumber: "9876543210",
      password: "SecurePass123",
      confirmPassword: "SecurePass123",
      terms: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      accountType: "customer",
      businessName: "Acme Corp",
      email: "hello@acme.in",
      phoneNumber: "9876543210",
      password: "SecurePass123",
      confirmPassword: "DifferentPass123",
      terms: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes("confirmPassword")),
      ).toBe(true);
    }
  });

  it("rejects weak passwords", () => {
    const result = registerSchema.safeParse({
      accountType: "customer",
      businessName: "Acme Corp",
      email: "hello@acme.in",
      phoneNumber: "9876543210",
      password: "weak",
      confirmPassword: "weak",
      terms: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({
      accountType: "customer",
      businessName: "Acme Corp",
      email: "not-an-email",
      phoneNumber: "9876543210",
      password: "SecurePass123",
      confirmPassword: "SecurePass123",
      terms: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("enquirySchema", () => {
  it("validates a complete enquiry", () => {
    const result = enquirySchema.safeParse({
      name: "Ravi Kumar",
      email: "ravi@acme.in",
      phoneNumber: "9876543210",
      serviceType: "GST Filing",
      message: "I need help with GST registration for my business.",
      providerId: "bright-compliance",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short message", () => {
    const result = enquirySchema.safeParse({
      name: "Ravi Kumar",
      email: "ravi@acme.in",
      phoneNumber: "9876543210",
      serviceType: "GST Filing",
      message: "Hi",
      providerId: "bright-compliance",
    });
    expect(result.success).toBe(false);
  });
});
