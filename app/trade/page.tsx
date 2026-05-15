"use client";

import { BadgePercent, UserRound, Package } from "lucide-react";
import TradeForm from "@/components/TradeForm";
import { useLanguage } from "@/context/LanguageContext";

const BENEFIT_ICONS = [BadgePercent, UserRound, Package];

export default function TradePage() {
  const { T } = useLanguage();
  const trade = T.trade;

  return (
    <main className="bg-background min-h-screen">

      {/* 1. HERO */}
      <section className="pt-40 pb-24 px-6 md:px-10 text-center max-w-screen-md mx-auto">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
          {trade.studioLabel}
        </p>
        <h1
          className="font-heading font-light text-text-primary leading-tight mb-6"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          {trade.title}
        </h1>
        <p className="font-body text-[15px] text-text-secondary leading-relaxed max-w-lg mx-auto">
          {trade.subtitle}
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="h-px w-16 bg-accent/40" />
          <div className="w-1 h-1 rounded-full bg-accent" />
          <div className="h-px w-16 bg-accent/40" />
        </div>
      </section>

      {/* 2. BENEFITS */}
      <section className="border-t border-accent/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-accent/20">
            {trade.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <div key={b.title} className="flex flex-col gap-5 px-0 py-10 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
                  <div className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center">
                    <Icon size={17} strokeWidth={1.25} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-[21px] font-light text-text-primary mb-2">{b.title}</h3>
                    <p className="font-body text-[13px] leading-[1.75] text-text-secondary">{b.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. APPLICATION FORM */}
      <section className="border-t border-accent/20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">

            <div className="lg:sticky lg:top-28">
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
                {trade.formLabel}
              </p>
              <h2
                className="font-heading font-light text-text-primary leading-tight mb-5"
                style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
              >
                {trade.formTitle1}
                <br />
                {trade.formTitle2}
              </h2>
              <p className="font-body text-[13px] text-text-secondary leading-relaxed mb-8">
                {trade.formSubtitle}
              </p>

              <ul className="flex flex-col gap-3">
                {trade.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-[12px] text-text-secondary">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#D4CFC9] p-8 md:p-12">
              <TradeForm />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
