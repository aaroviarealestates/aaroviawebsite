import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CRM_API = process.env.CRM_LEADS_API_URL || "https://aarovia-api.vercel.app/api/public/leads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, source, consent } = body;

    if (
      typeof name !== "string" || !name.trim()
      || typeof phone !== "string" || !phone.trim()
      || typeof email !== "string" || !email.trim()
    ) {
      return NextResponse.json({ error: "Name, email, and mobile number are required." }, { status: 400 });
    }

    if (consent !== true) {
      return NextResponse.json({ error: "Consent is required before submitting the enquiry." }, { status: 400 });
    }

    const crmResponse = await fetch(CRM_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: name.trim(),
        phoneNumber: phone.trim(),
        emailAddress: email.trim(),
      }),
    });

    const crmResult: { success?: boolean; message?: string } | null = await crmResponse.json().catch(() => null);
    if (!crmResponse.ok || crmResult?.success !== true) {
      return NextResponse.json(
        { error: crmResult?.message || "Unable to submit enquiry to CRM." },
        { status: 502 },
      );
    }

    let localLeadStored = true;
    try {
      await prisma.lead.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: typeof message === "string" ? message.trim() : "",
          source: typeof source === "string" && source.trim() ? source.trim() : "contact-page",
        },
      });
    } catch (error) {
      localLeadStored = false;
      console.error("CRM accepted the enquiry, but local lead storage failed.", error);
    }

    return NextResponse.json({ ok: true, localLeadStored });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
