"use client";

import Image from "next/image";
import { Pencil, Hammer, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HERO_IMG = "/images/andrey-workshop.png";

const PROCESS_ICONS = [Pencil, Hammer, Truck];

export default function AboutPage() {
  const { T } = useLanguage();
  const about = T.about;

  return (
    <main className="bg-background relative">
      <div className="concrete-texture" />

      {/* 1. HERO */}
      <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src={HERO_IMG}
          alt="Mikhaylov Carpenter workshop — craftspeople at work"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Subtle overall darkening */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
        {/* Strong fade into background at the bottom */}
        <div className="absolute inset-x-0 bottom-0" style={{ height: "55%", background: "linear-gradient(to bottom, transparent 0%, #0F0F0F 100%)" }} />
        {/* Softer fade at the top */}
        <div className="absolute inset-x-0 top-0" style={{ height: "25%", background: "linear-gradient(to top, transparent 0%, #0F0F0F 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 text-center pb-24">
          <div className="w-8 h-px bg-white/40 mb-8" />
          <h1
            className="font-heading font-light text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(36px, 5.5vw, 76px)" }}
          >
            {about.heroLine1}
            <br />
            {about.heroLine2}
          </h1>
          <div className="w-8 h-px bg-white/40 mt-8" />
        </div>
      </section>

      {/* 2. STORY */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Label + title */}
        <div className="mb-14">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
            {about.studioLabel}
          </p>
          <h2
            className="font-heading font-light text-text-primary leading-tight"
            style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
          >
            {about.storyTitle}
          </h2>
        </div>

        {/* Photo + text side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Portrait */}
          <div className="relative w-full overflow-hidden md:sticky md:top-28" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/images/andrey.png"
              alt="Andrey Mikhaylov — founder of Mikhaylov Carpenter"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 72%, #0F0F0F 100%)" }} />
            <p className="absolute bottom-4 left-5 font-body text-text-secondary/50" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
              {about.studioCredit}
            </p>
          </div>

          {/* Story text */}
          <div className="flex flex-col gap-6 font-body text-[15px] leading-[1.8] text-text-secondary">
            {about.story.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section className="border-t border-accent/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent text-center mb-3">
            {about.processLabel}
          </p>
          <h2
            className="font-heading font-light text-text-primary text-center mb-16"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            {about.processTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {about.process.map((step, i) => {
              const Icon = PROCESS_ICONS[i];
              return (
                <div key={step.label} className="flex flex-col items-center text-center gap-5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border border-accent/40 flex items-center justify-center">
                      <Icon size={20} strokeWidth={1.25} className="text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 font-heading text-[11px] font-light text-accent/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-[22px] font-light text-text-primary">{step.label}</h3>
                  <div className="w-6 h-px bg-accent/50" />
                  <p className="font-body text-[13px] leading-[1.75] text-text-secondary max-w-xs">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MATERIALS */}
      <section className="border-t border-accent/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent text-center mb-3">
            {about.materialsLabel}
          </p>
          <h2
            className="font-heading font-light text-text-primary text-center mb-14"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            {about.materialsTitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {about.materials.map((mat) => (
              <div key={mat.name} className="flex flex-col gap-4">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={mat.image}
                    alt={mat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-[18px] font-light text-text-primary mb-1">{mat.name}</h3>
                  <p className="font-body text-[12px] text-text-secondary leading-relaxed">{mat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUOTE */}
      <section className="border-t border-accent/20">
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-24 md:py-36 flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
            <div className="w-1 h-1 rounded-full bg-accent" />
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
          </div>

          <blockquote>
            <p
              className="font-heading font-light text-text-primary leading-snug tracking-tight"
              style={{ fontSize: "clamp(24px, 3.5vw, 42px)" }}
            >
              &ldquo;{about.quote}&rdquo;
            </p>
          </blockquote>

          <div className="flex items-center gap-4 w-full justify-center">
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
            <div className="w-1 h-1 rounded-full bg-accent" />
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
          </div>

          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-text-secondary/60">
            {about.studioCredit}
          </p>
        </div>
      </section>

    </main>
  );
}
