"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products, type Category } from "@/lib/products";

/* ─── Filter config ───────────────────────────────────────────────────────── */
const CATS = ["All", "Sleep", "Live", "Eat", "Work"] as const;
type Filter = (typeof CATS)[number];

/* ─── Canvas layout ───────────────────────────────────────────────────────── */
const CANVAS = 4200;          // canvas px (square)
const C      = CANVAS / 2;   // center = 2100

/**
 * Product card positions and sizes within the 4200×4200 canvas.
 * Cluster 3-4 around the center (visible on load) then scatter the rest.
 */
const CARDS: Record<number, { x: number; y: number; w: number }> = {
  1:  { x: 1340, y: 1780, w: 310 }, // grant-bed            — visible
  2:  { x: 2080, y: 1620, w: 330 }, // pierpont-bed         — visible
  3:  { x: 2580, y: 1820, w: 270 }, // grant-bedside-table  — visible (right)
  4:  { x: 1680, y: 2260, w: 300 }, // grant-lounge-chair   — lower visible
  5:  { x: 2700, y: 2340, w: 285 }, // lulu-lounge-chair    — lower-right partial
  6:  { x:  840, y: 1900, w: 280 }, // grant-armless-chaise — off left
  7:  { x: 3080, y: 1780, w: 285 }, // grant-bench          — off right
  8:  { x: 1520, y:  980, w: 265 }, // grant-bookshelf      — off top
  9:  { x: 2380, y:  900, w: 305 }, // harlow-coffee-table  — off top-right
  10: { x:  740, y: 2560, w: 265 }, // rumi-cocktail-tables — off bottom-left
  11: { x: 2880, y: 2740, w: 285 }, // grant-mirror         — off bottom-right
  12: { x: 3480, y: 2120, w: 305 }, // marmont-dining-table — far right
  13: { x: 1220, y: 2980, w: 280 }, // marmont-dining-chair — far bottom
  14: { x:  460, y: 1420, w: 265 }, // grant-counter-stool  — far top-left
  15: { x: 2060, y: 3280, w: 305 }, // grant-desk           — far bottom-center
};

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function HomeCanvas() {
  const [active, setActive]   = useState<Filter>("All");
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(50);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ref to detect drag vs click reliably
  const dragMoved = useRef(false);

  useEffect(() => {
    // Center the canvas cluster in the viewport on mount
    x.set(-(C - window.innerWidth  / 2));
    y.set(-(C - window.innerHeight / 2));
    setMounted(true);

    // Track horizontal pan as a percentage for the bottom-left indicator
    const unsub = x.on("change", (val) => {
      const max = CANVAS - window.innerWidth;
      if (max > 0) {
        const pct = Math.round(((-val) / max) * 100);
        setProgress(Math.max(0, Math.min(100, pct)));
      }
    });

    return unsub;
  }, [x, y]);

  const filteredIds = new Set(
    active === "All"
      ? products.map((p) => p.id)
      : products
          .filter((p) => p.category === (active.toLowerCase() as Category))
          .map((p) => p.id)
  );

  return (
    <>
      {/* ── Draggable canvas ── */}
      <div
        className={`fixed inset-0 z-0 overflow-hidden transition-opacity duration-500 select-none
          ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ cursor: "crosshair" }}
      >
        <motion.div
          drag
          style={{ x, y, width: CANVAS, height: CANVAS, position: "absolute" }}
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => { dragMoved.current = true; }}
          onDragEnd={()   => { setTimeout(() => { dragMoved.current = false; }, 80); }}
        >
          {products.map((product) => {
            const card = CARDS[product.id];
            if (!card) return null;
            const visible = filteredIds.has(product.id);

            return (
              <motion.div
                key={product.id}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.97 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  left: card.x,
                  top:  card.y,
                  width: card.w,
                  height: card.w,
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  onClick={(e) => { if (dragMoved.current) e.preventDefault(); }}
                  draggable={false}
                  className="block w-full h-full overflow-hidden bg-[#EDE8E3]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      draggable={false}
                      sizes={`${card.w}px`}
                      className="object-cover pointer-events-none"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Fixed crosshair in the center of the viewport */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-body font-light text-text-primary/15 select-none"
            style={{ fontSize: "22px", lineHeight: 1 }}
          >
            +
          </span>
        </div>
      </div>

      {/* ── Bottom bar (above canvas, below header) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-5 pb-5 pointer-events-none">
        <div className="relative flex items-end justify-between">

          {/* Left: horizontal pan percentage */}
          <span
            className="font-body tabular-nums select-none pointer-events-none"
            style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(107,101,96,0.55)" }}
          >
            {String(progress).padStart(2, "0")}%
          </span>

          {/* Center: category filter */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center pointer-events-auto">
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
                        : "text-[14px] text-text-secondary/45 hover:text-text-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                </span>
              );
            })}
          </div>

          {/* Right: empty (balanced layout) */}
          <span className="opacity-0 pointer-events-none text-[11px]">00%</span>
        </div>
      </div>
    </>
  );
}
