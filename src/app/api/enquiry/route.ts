import { enquirySchema } from "@/lib/schemas";
import type { EnquiryInput } from "@/lib/schemas";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryInput = await req.json();

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, phoneNumber, serviceType, message, providerId } =
      parsed.data;

    // In a real app, this would:
    // 1. Save the enquiry to a database
    // 2. Send an email notification to the provider
    // 3. Send a confirmation email to the customer
    console.log("New enquiry:", {
      name,
      email,
      phoneNumber,
      serviceType,
      message,
      providerId,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your enquiry was received. This prototype does not yet send provider notifications; Right Account would coordinate the introduction.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
