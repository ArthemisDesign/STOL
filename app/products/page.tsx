"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";

type FilterValue = "all" | "sofas" | "chairs" | "closets" | "beds" | "tables" | "accessories";
type ViewMode = "grid" | "feed";

function Toolbar({
  filter, setFilter, view, setView, count, activeLabel,
}: {
  filter:      FilterValue;
  setFilter:   (f: FilterValue) => void;
  view:        ViewMode;
  setView:     (v: ViewMode) => void;
  count:       number;
  activeLabel: string;
}) {
  const { T } = useLanguage();
  const [open, setOpen] = useState(false);
  const sep = "rgba(255,240,210,0.08)";

  return (
    <>
      <div className="px-6 md:px-10 flex items-center justify-between" style={{ height: "44px", borderBottom: `1px solid ${sep}` }}>
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1 font-body transition-colors"
          style={{ fontSize: "11px", letterSpacing: "0.06em", color: open ? "#EDE8E0" : "rgba(160,150,140,0.7)" }}
        >
          <span style={{ textDecoration: open ? "underline" : "none" }}>{T.products.filter}</span>
          <span style={{ fontSize: "13px", lineHeight: 1 }}>{open ? "−" : "+"}</span>
        </button>

        <div className="flex items-center gap-3">
          {["(w.)", "(fr.)"].map(s => (
            <span key={s} className="font-body text-text-secondary/35 select-none" style={{ fontSize: "11px" }}>{s}</span>
          ))}
        </div>

        <div className="flex items-center font-body" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
          <button onClick={() => setView("feed")} className="transition-colors" style={{ color: view === "feed" ? "#EDE8E0" : "rgba(160,150,140,0.4)" }}>{T.products.feed}</button>
          <span className="mx-2" style={{ color: "rgba(160,150,140,0.25)" }}>|</span>
          <button onClick={() => setView("grid")} className="transition-colors" style={{ color: view === "grid" ? "#EDE8E0" : "rgba(160,150,140,0.4)" }}>{T.products.grid}</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.32s cubic-bezier(0.16,1,0.3,1)", borderBottom: open ? `1px solid ${sep}` : "none" }}>
        <div style={{ overflow: "hidden" }}>
          <div className="px-6 md:px-10 flex items-center gap-6" style={{ height: "40px" }}>
            {T.products.filters.map(({ label, value }) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  onClick={() => { setFilter(value as FilterValue); setOpen(false); }}
                  className="font-heading transition-all duration-200"
                  style={{ fontSize: active ? "14px" : "13px", color: active ? "#EDE8E0" : "rgba(160,150,140,0.45)", whiteSpace: "nowrap" }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 flex items-center justify-between" style={{ height: "36px", borderBottom: "1px solid rgba(255,240,210,0.06)" }}>
        <span className="font-body text-text-secondary/40" style={{ fontSize: "11px" }}>
          ({String(count).padStart(2, "0")})
        </span>
        <span className="font-heading text-text-secondary/60" style={{ fontSize: "12px" }}>
          {activeLabel}
        </span>
      </div>
    </>
  );
}

export default function ProductsPage() {
  const { T, locale } = useLanguage();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [view,   setView]   = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter(p => p.category === filter);
  }, [filter]);

  const activeLabel  = T.products.filters.find(f => f.value === filter)?.label ?? T.products.filters[0].label;
  const toolbarProps = { filter, setFilter, view, setView, count: filtered.length, activeLabel };

  if (view === "feed") {
    return (
      <div className="fixed inset-x-0 z-20 flex flex-col" style={{ top: "48px", bottom: 0, backgroundImage: "url('/wood-texture.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(10,8,6,0.82)", zIndex: 0 }} />
        <div className="relative flex-shrink-0" style={{ zIndex: 1 }}><Toolbar {...toolbarProps} /></div>
        <div className="relative flex-1 overflow-y-scroll" style={{ zIndex: 1, scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch", overscrollBehaviorY: "contain" }}>
          {filtered.map((product, i) => {
            const loc = product.translations[locale];
            return (
              <div key={product.id} className="relative flex items-center justify-center" style={{ height: "100%", scrollSnapAlign: "start", scrollSnapStop: "always" }}>
                <Link href={`/products/${product.slug}`} className="relative block" style={{ height: "70%", aspectRatio: "3/4" }}>
                  <Image src={product.images[0]} alt={loc.name} fill className="object-cover" sizes="(max-width: 768px) 75vw, 45vw" priority={i === 0} />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 md:px-10" style={{ paddingBottom: "22px" }}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-body text-text-secondary/40" style={{ fontSize: "10px", letterSpacing: "0.04em" }}>({String(i + 1).padStart(2, "0")})</span>
                    <span className="font-heading font-light text-text-primary" style={{ fontSize: "14px" }}>{loc.name}</span>
                  </div>
                  <span className="font-body text-text-secondary/35" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>{T.products.scroll}</span>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="font-body text-sm text-text-secondary">{T.products.noProducts}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-solid relative" style={{
      backgroundImage: "url('/wood-texture.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}>
      {/* dark overlay so text stays readable */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(10,8,6,0.82)", zIndex: 0 }} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Toolbar {...toolbarProps} />
        <div className="px-6 md:px-10 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-24 font-body text-sm text-text-secondary">{T.products.noProducts}</p>
          )}
        </div>
      </div>
    </div>
  );
}
