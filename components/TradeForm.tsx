"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  website: string;
  businessType: string;
  message: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  website: "",
  businessType: "",
  message: "",
};

const BUSINESS_TYPES = [
  "Interior Designer",
  "Architect",
  "Hospitality Professional",
  "Retail / Showroom",
  "Developer / Real Estate",
  "Other",
];

/* ─── Shared input class ──────────────────────────────────────────────────── */
const inputCls =
  "w-full bg-white border border-[#D4CFC9] px-4 py-3 font-body text-[13px] text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-text-primary transition-colors duration-150";

export default function TradeForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
        <div className="w-14 h-14 rounded-full border border-accent/40 flex items-center justify-center">
          <CheckCircle size={24} strokeWidth={1.25} className="text-accent" />
        </div>
        <h3 className="font-heading text-[28px] font-light text-text-primary">
          Application Received
        </h3>
        <p className="font-body text-[14px] text-text-secondary max-w-sm leading-relaxed">
          Thank you for applying to the Lusano Trade Program. A member of our
          team will review your application and be in touch within 2–3 business
          days.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm(EMPTY); }}
          className="mt-2 font-body text-[11px] uppercase tracking-[0.15em] text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors"
        >
          Submit another application
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* First / Last name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <input
            id="firstName"
            type="text"
            required
            placeholder="Jane"
            className={inputCls}
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <input
            id="lastName"
            type="text"
            required
            placeholder="Smith"
            className={inputCls}
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
          />
        </div>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Company</Label>
        <input
          id="company"
          type="text"
          required
          placeholder="Studio Name"
          className={inputCls}
          value={form.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          required
          placeholder="jane@studio.com"
          className={inputCls}
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </div>

      {/* Website */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="website">Website</Label>
        <input
          id="website"
          type="url"
          placeholder="https://yourstudio.com"
          className={inputCls}
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {/* Business type */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="businessType">Type of Business</Label>
        <div className="relative">
          <select
            id="businessType"
            required
            className={`${inputCls} appearance-none pr-10 cursor-pointer`}
            value={form.businessType}
            onChange={(e) => set("businessType", e.target.value)}
          >
            <option value="" disabled>
              Select one…
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className="text-text-secondary"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">
          Message{" "}
          <span className="text-text-secondary/50 normal-case tracking-normal">
            (optional)
          </span>
        </Label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us a bit about your practice and the types of projects you work on…"
          className={`${inputCls} resize-none`}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-text-primary text-white font-body text-[11px] uppercase tracking-[0.2em] py-4 transition-opacity duration-200 hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Submit Application"}
        </button>
        <p className="font-body text-[11px] text-text-secondary/60 text-center">
          We review all applications within 2–3 business days.
        </p>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-body text-[10px] uppercase tracking-[0.2em] text-text-primary"
    >
      {children}
    </label>
  );
}
