"use client";

import { useEffect, useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "warning" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status !== "sent") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 5000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      source: "contact-page",
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
      consentText: "By submitting this form, I consent to receive communications from Aarovia Group through WhatsApp, SMS, email, phone calls, and other channels, even if my number is registered on DND/NDNC.",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { error?: string; localLeadStored?: boolean } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Unable to submit enquiry");
      setStatus(result.localLeadStored === false ? "warning" : "sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form id="contactForm" onSubmit={handleSubmit} className="wow fadeInUp" data-wow-delay="0.4s">
      <div className="row">
        <div className="form-group col-md-6 mb-4">
          <input type="text" name="name" className="form-control" id="name" placeholder="Full Name*" required />
        </div>

        <div className="form-group col-md-6 mb-4">
          <input type="email" name="email" className="form-control" id="email" placeholder="Email Address*" required />
        </div>

        <div className="form-group col-md-12 mb-4">
          <input type="text" name="phone" className="form-control" id="phone" placeholder="Phone Number*" required />
        </div>

        <div className="form-group col-md-12 mb-5">
          <textarea name="message" className="form-control" id="message" rows={4} placeholder="Tell us about your property requirement"></textarea>
        </div>

        <div className="form-group col-md-12 mb-4">
          <div className="consent-wrapper" style={{ display: "flex", alignItems: "flex-start", gap: "10px", width: "100%" }}>
            <input type="checkbox" name="consent" id="contact-consent" value="yes" required style={{ width: "18px", height: "18px", minWidth: "18px", marginTop: "3px", cursor: "pointer", accentColor: "#000" }} />
            <label htmlFor="contact-consent" style={{ margin: 0, padding: 0, fontSize: "13px", lineHeight: 1.6, color: "#666", cursor: "pointer" }}>
              By submitting this form, I consent to receive communications from <strong style={{ fontWeight: 600 }}>Aarovia Group</strong> through WhatsApp, SMS, email, phone calls, and other channels, even if my number is registered on DND/NDNC.
            </label>
          </div>
        </div>

        <div className="col-md-12">
          <button type="submit" className="btn-default" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "send enquiry"}
          </button>
          <div
            id="msgSubmit"
            className="crm-msg"
            role="status"
            aria-live="polite"
            style={{
              display: status === "idle" || status === "sending" ? "none" : "block",
              padding: "14px 18px",
              borderRadius: "8px",
              marginTop: "16px",
              fontSize: "14px",
              fontWeight: 500,
              color: status === "sent" ? "#155724" : status === "warning" ? "#8a6d3b" : "#721c24",
              background: status === "sent" ? "#d4edda" : status === "warning" ? "#fff3cd" : "#f8d7da",
              border: `1px solid ${status === "sent" ? "#c3e6cb" : status === "warning" ? "#ffeeba" : "#f5c6cb"}`,
            }}
          >
            {status === "sent" && "Thank you! Your enquiry was received. Our team will contact you shortly."}
            {status === "warning" && "Your enquiry reached our team, but could not be copied to the website dashboard."}
            {status === "error" && errorMsg}
          </div>
        </div>
      </div>
    </form>
  );
}
