"use client";
import { useState } from "react";
export default function ContactForm({ name }: { name: string }) {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <p className="mt-6">
        Thank you. An advisor will contact you shortly about {name}.
      </p>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-6 space-y-5"
    >
      {["Name", "Email", "Phone"].map((l) => (
        <label key={l} className="block text-sm">
          {l}
          <input
            required={l !== "Phone"}
            type={l === "Email" ? "email" : "text"}
            className="field"
          />
        </label>
      ))}
      <label className="block text-sm">
        Message
        <textarea
          rows={3}
          defaultValue={`I'd like to arrange a viewing of ${name}.`}
          className="field"
        />
      </label>
      <button className="btn btn-solid w-full">Request a Viewing</button>
    </form>
  );
}
