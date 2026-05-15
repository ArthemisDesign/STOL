"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products, type Product, type Category } from "@/lib/products";

/* ─── Config ──────────────────────────────────────────────────────────────── */
const CATS = ["All", "Sleep", "Live", "Eat", "Work"] as const;
type Filter = (typeof CATS)[number];

// Primary loop duration (ms) — drives the progress counter
const DURATION_A = 60_000;
const DURATION_B = 80_000;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

/**
 * Triple the product list so the CSS translateY(-33.33%) animation is seamless.
 * If fewer than 5 products exist, pad first so the loop looks dense enough.
 */
function buildTrack(items: Product[]): Product[] {
  if (items.length === 0) return [];
  const base =
    items.length < 5
      ? Array.from({ length: Math.ceil(5 / items.length) }, () => items).flat()
      : items;
  return [...base, ...base, ...base];
}

function filterProducts(f: Filter): Product[] {
  return f === "All"
    ? products
    : products.filter((p) => p.category === (f.toLowerCase() as Category));
}

/* ─── Canvas card — pure image link, no visible text ─────────────────────── */
function CanvasImage({
  product,
  sizes,
  showLabel,
}: {
  product: Product;
  sizes: string;
  showLabel: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block flex-shrink-0 aspect-square overflow-hidden bg-[#EDE8E3]"
      tabIndex={-1}
    >
      <Image
        src={product.images[0]}
        alt={product.name}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
      {/* Label overlay — only visible in expanded (+) mode */}
      {showLabel && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 via-transparent p-5 sm:p-7">
          <div>
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-white/55 mb-1">
              {product.subcategory}
            </p>
            <h3 className="font-heading italic font-light text-white leading-none"
              style={{ fontSize: "clamp(18px, 2.5vw, 30px)" }}>
              {product.name}
            </h3>
          </div>
        </div>
      )}
    </Link>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function HomeCanvas() {
  const [active, setActive]       = useState<Filter>("All");
  const [expanded, setExpanded]   = useState(false);
  const [progress, setProgress]   = useState(0);
  const startRef                  = useRef(Date.now());

  /* Reset + start loop-progress counter whenever filter or mode changes */
  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);
    const id = setInterval(() => {
      const pct = Math.floor(((Date.now() - startRef.current) % DURATION_A) / DURATION_A * 100);
      setProgress(pct);
    }, 250);
    return () => clearInterval(id);
  }, [active, expanded]);

  const filtered = useMemo(() => filterProducts(active), [active]);

  /* Split into two phase-offset column tracks */
  const colA = useMemo(
    () => buildTrack(filtered.filter((_, i) => i % 2 === 0)),
    [filtered]
  );
  const colB = useMemo(
    () => buildTrack(filtered.filter((_, i) => i % 2 !== 0).length
      ? filtered.filter((_, i) => i % 2 !== 0)
      : filtered                   // fallback if category has 1 product
    ),
    [filtered]
  );

  /* Restart CSS animation when content changes */
  const animKey = `${active}-${expanded}`;

  return (
    <div className="pt-12">

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-12 z-40 border-b border-accent/20 bg-background/90 backdrop-blur-sm">
        <div className="h-10 flex items-center justify-center">
          {CATS.map((cat, i) => {
            const isActive = cat === active;
            return (
              <span key={cat} className="flex items-center">
                {i > 0 && (
                  <span className="font-heading text-[14px] text-text-secondary/25 mx-2 select-none">
                    /
                  </span>
                )}
                <button
                  onClick={() => setActive(cat)}
                  className={`font-heading italic leading-none transition-all duration-200 ${
                    isActive
                      ? "text-[15px] text-text-primary"
                      : "text-[14px] text-text-secondary/50 hover:text-text-secondary"
                  }`}
                >
                  {cat}
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Infinite marquee canvas ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`flex overflow-hidden ${
            expanded ? "" : "gap-px bg-accent/15"
          }`}
          style={{ height: "calc(100vh - 88px)" }}
        >
          {expanded ? (
            /* ── Expanded (+): single full-width column with name labels ── */
            <div className="flex-1 overflow-hidden">
              <div
                key={`exp-${animKey}`}
                className="flex flex-col"
                style={{ animation: `scrollUpTriple ${DURATION_A / 1000}s linear infinite` }}
              >
                {buildTrack(filtered).map((product, i) => (
                  <CanvasImage
                    key={`${product.id}-exp-${i}`}
                    product={product}
                    sizes="100vw"
                    showLabel
                  />
                ))}
              </div>
            </div>
          ) : (
            /* ── Default (–): two-column marquee, pure images ── */
            <>
              {/* Column A */}
              <div className="flex-1 overflow-hidden bg-background">
                <div
                  key={`a-${animKey}`}
                  className="flex flex-col"
                  style={{ animation: `scrollUpTriple ${DURATION_A / 1000}s linear infinite` }}
                >
                  {colA.map((product, i) => (
                    <CanvasImage
                      key={`${product.id}-a-${i}`}
                      product={product}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      showLabel={false}
                    />
                  ))}
                </div>
              </div>

              {/* Column B — hidden on mobile, phase-offset on desktop */}
              <div className="hidden sm:block flex-1 overflow-hidden bg-background">
                <div
                  key={`b-${animKey}`}
                  className="flex flex-col"
                  style={{
                    animation: `scrollUpTriple ${DURATION_B / 1000}s linear infinite`,
                    animationDelay: `-${(DURATION_B / 1000) * 0.35}s`,
                  }}
                >
                  {colB.map((product, i) => (
                    <CanvasImage
                      key={`${product.id}-b-${i}`}
                      product={product}
                      sizes="50vw"
                      showLabel={false}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom fixed bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-5 py-4 flex items-end justify-between pointer-events-none">

        {/* [+|-] toggle */}
        <div className="flex items-baseline gap-px font-body text-[11px] tracking-[0.05em] pointer-events-auto select-none">
          <span className="text-text-secondary/35">[</span>
          <button
            onClick={() => setExpanded(true)}
            className={`px-[3px] transition-colors duration-150 ${
              expanded ? "text-text-primary" : "text-text-secondary/35 hover:text-text-secondary"
            }`}
            aria-label="Expanded view"
          >
            +
          </button>
          <span className="text-text-secondary/25 px-[1px]">|</span>
          <button
            onClick={() => setExpanded(false)}
            className={`px-[3px] transition-colors duration-150 ${
              !expanded ? "text-text-primary" : "text-text-secondary/35 hover:text-text-secondary"
            }`}
            aria-label="Grid view"
          >
            −
          </button>
          <span className="text-text-secondary/35">]</span>
        </div>

        {/* Progress counter + bar */}
        <div className="flex flex-col items-end gap-[5px] pointer-events-none">
          <span
            className="font-body tabular-nums select-none"
            style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(107,101,96,0.55)" }}
          >
            {String(progress).padStart(2, "0")}%
          </span>
          {/* Progress line */}
          <div className="relative w-20 h-px bg-accent/20 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-text-secondary/30"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
