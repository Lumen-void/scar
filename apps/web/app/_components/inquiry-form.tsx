"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function PublicInquiryForm({
  tripSlug,
  regionSlug,
  defaultMessage = "I want help planning a Himachal journey with SCAR."
}: {
  tripSlug?: string;
  regionSlug?: string;
  defaultMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submitInquiry(formData: FormData) {
    setStatus("sending");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        tripSlug,
        regionSlug
      })
    });

    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <form className="public-inquiry-form" action={submitInquiry}>
      <div>
        <span>Plan request</span>
        <h2>Send this to SCAR operations</h2>
      </div>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone / WhatsApp" />
      <textarea name="message" defaultValue={defaultMessage} required />
      <button className="action-button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send request"} <ArrowRight size={16} />
      </button>
      {status === "sent" ? <p>Your request is now in the admin inquiry pipeline.</p> : null}
      {status === "error" ? <p>Request could not be sent. Check the fields and try again.</p> : null}
    </form>
  );
}
