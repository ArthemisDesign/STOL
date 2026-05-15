"use client";

import { useState, useMemo } from "react";
import { products, type Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "All",   value: "all"   },
  { label: "Sleep", value: "sleep" },
  { label: "Live",  value: "live"  },
  { label: "Eat",   value: "eat"   },
  { label: "Work",  value: "work"  },
];

type ViewMode = "grid" | "feed";

export default function ProductsPage() {
  const [category,  setCategory]  = useState<Category | "all">("all");
  const [view,      setView]      = useState<ViewMode>("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(
    () => category === "all" ? products : products.filter(p => p.category === category),
    [category]
  );

  const activeLabel = CATEGORIES.find(c => c.value === category)?.label ?? "All";

  return (
    <div className="min-h-screen pt-14 bg-solid" style={{ color: "#1A1A1A" }}>

      {/* ── Toolbar ── */}
      <div
        className="px-6 md:px-10 flex items-center justify-between"
        style={{
          height: "44px",
          borderBottom: "1px solid rgba(166,141,116,0.18)",
          backgroundColor: "var(--background)",
        }}
      >
        {/* Left: Filter */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(v => !v)}
            className="flex items-center gap-1.5 font-body text-text-secondary hover:text-text-primary transition-colors"
            style={{ fontSize: "11px", letterSpacing: "0.06em" }}
          >
            <span>Filter</span>
            <span style={{ fontSize: "14px", lineHeight: 1 }}>+</span>
          </button>

          {/* Filter dropdown */}
          {filterOpen && (
            <div
              className="absolute top-full left-0 mt-2 flex flex-col gap-0.5 liquid-glass z-50"
              style={{ borderRadius: "10px", padding: "6px", minWidth: "120px" }}
            >
              {CATEGORIES.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => { setCategory(value); setFilterOpen(false); }}
                  className="text-left px-3 py-2 rounded-md font-heading italic transition-colors"
                  style={{
                    fontSize: "14px",
                    color: category === value ? "#1A1A1A" : "rgba(107,101,96,0.7)",
                    backgroundColor: category === value ? "rgba(166,141,116,0.12)" : "transparent",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: sort abbreviations */}
        <div className="flex items-center gap-3">
          <button
            className="font-body text-text-secondary/50 hover:text-text-secondary transition-colors"
            style={{ fontSize: "11px", letterSpacing: "0.04em" }}
          >
            (w.)
          </button>
          <button
            className="font-body text-text-secondary/50 hover:text-text-secondary transition-colors"
            style={{ fontSize: "11px", letterSpacing: "0.04em" }}
          >
            (fr.)
          </button>
        </div>

        {/* Right: Feed | Grid */}
        <div
          className="flex items-center font-body"
          style={{ fontSize: "11px", letterSpacing: "0.06em" }}
        >
          <button
            onClick={() => setView("feed")}
            className="transition-colors"
            style={{ color: view === "feed" ? "#1A1A1A" : "rgba(107,101,96,0.45)" }}
          >
            Feed
          </button>
          <span className="mx-2" style={{ color: "rgba(107,101,96,0.3)" }}>|</span>
          <button
            onClick={() => setView("grid")}
            className="transition-colors"
            style={{ color: view === "grid" ? "#1A1A1A" : "rgba(107,101,96,0.45)" }}
          >
            Grid
          </button>
        </div>
      </div>

      {/* ── Count row ── */}
      <div
        className="px-6 md:px-10 flex items-center justify-between"
        style={{
          height: "40px",
          borderBottom: "1px solid rgba(166,141,116,0.12)",
        }}
      >
        <span
          className="font-body text-text-secondary/50"
          style={{ fontSize: "11px", letterSpacing: "0.04em" }}
        >
          ({String(filtered.length).padStart(2, "0")})
        </span>
        <span
          className="font-heading italic text-text-secondary"
          style={{ fontSize: "12px" }}
        >
          {activeLabel} Products
        </span>
      </div>

      {/* ── Product grid / feed ── */}
      <div className="px-6 md:px-10 py-8">
        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-0 divide-y" style={{ borderColor: "rgba(166,141,116,0.14)" }}>
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} feed />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center py-24 font-body text-sm text-text-secondary">
            No products in this category.
          </p>
        )}
      </div>
    </div>
  );
}
