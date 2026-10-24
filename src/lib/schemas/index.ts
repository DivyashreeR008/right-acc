import { z } from "zod";

export const registerSchema = z
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceType: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  providerId: z.string().min(1, "Please select a provider"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
