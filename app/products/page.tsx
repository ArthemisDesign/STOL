"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, type Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

/* ─── Filter config ───────────────────────────────────────────────────────── */
const TABS: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Sleep", value: "sleep" },
  { label: "Live", value: "live" },
  { label: "Eat", value: "eat" },
  { label: "Work", value: "work" },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Category | "all">("all");

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? products
        : products.filter((p) => p.category === activeTab),
    [activeTab]
  );

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-10 max-w-screen-xl mx-auto">

      {/* ── Page heading ── */}
      <div className="mb-12 text-center">
        <h1 className="font-heading text-[clamp(36px,5vw,64px)] font-light text-text-primary tracking-tight leading-none mb-3">
          The Collection
        </h1>
        <p className="font-body text-sm text-text-secondary">
          Heirloom-quality furniture, designed in Los Angeles.
        </p>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex justify-center mb-14">
        <div className="flex items-center gap-8 relative">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="relative pb-2 font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-200"
                style={{
                  color: isActive ? "#1A1A1A" : "#6B6560",
                }}
              >
                {tab.label}

                {/* Animated underline using layoutId for smooth slide */}
                {isActive && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Product grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.25, 0, 0.35, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="font-body text-sm text-text-secondary">
            No products in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
