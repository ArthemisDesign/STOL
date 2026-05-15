"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Product images ──────────────────────────────────────────────────────── */
// Replace these with real product shots once available in /public/images/
const BASE =
  "https://cdn.sanity.io/images/ld3h3xvm/production/08c5b2f0c55459cccfd20a364b4c2e31c490ef2e-2962x2962.jpg";

const COL_A = [
  { id: 1, src: BASE, alt: "Heirloom armchair" },
  { id: 2, src: BASE, alt: "Linen bed frame" },
  { id: 3, src: BASE, alt: "Oak dining table" },
  { id: 4, src: BASE, alt: "Marble side table" },
];

const COL_B = [
  { id: 5, src: BASE, alt: "Woven floor lamp" },
  { id: 6, src: BASE, alt: "Ceramic planter" },
  { id: 7, src: BASE, alt: "Rattan lounge chair" },
  { id: 8, src: BASE, alt: "Teak bench" },
];

/* ─── Category pills ──────────────────────────────────────────────────────── */
const CATEGORIES = ["All", "Sleep", "Live", "Eat", "Work"] as const;
type Category = (typeof CATEGORIES)[number];

/* ─── Scroll track ────────────────────────────────────────────────────────── */
interface ScrollTrackProps {
  images: typeof COL_A;
  animationClass: string;
  /** Negative delay to offset the phase between columns */
  delayMs: number;
}

function ScrollTrack({ images, animationClass, delayMs }: ScrollTrackProps) {
  // Render twice: original + clone — animation moves -50% so the clone
  // takes over exactly when the original exits, creating a seamless loop.
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden flex-1 min-w-0">
      <div
        className={`flex flex-col gap-2 ${animationClass}`}
        style={{ animationDelay: `${delayMs}ms` }}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.id}-${i}`}
            className="relative w-full aspect-square flex-shrink-0 overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 50vw"
              className="object-cover"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
export default function HeroCarousel() {
  const [active, setActive] = useState<Category>("All");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* ── Scrolling columns ── */}
      <div className="absolute inset-0 flex gap-2">
        <ScrollTrack
          images={COL_A}
          animationClass="animate-scroll-up"
          delayMs={0}
        />
        <ScrollTrack
          images={COL_B}
          animationClass="animate-scroll-up-slow"
          delayMs={-12000}
        />
      </div>

      {/* ── Gradient overlays — top, bottom, and centre vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />

      {/* ── Centre overlay text ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/70 mb-4">
          Designed in Los Angeles
        </p>
        <h1
          className="font-heading font-light text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        >
          Heirloom-Quality
          <br />
          Furniture
        </h1>
        <div className="mt-6 w-10 h-px bg-accent" />
      </div>

      {/* ── Category filter pills ── */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6">
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 py-2">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const href = cat === "All" ? "#products" : `/${cat.toLowerCase()}`;
            return (
              <Link
                key={cat}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(cat);
                  if (cat === "All") {
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-body font-medium uppercase tracking-[0.15em] transition-all duration-200
                  ${
                    isActive
                      ? "bg-white text-text-primary shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
