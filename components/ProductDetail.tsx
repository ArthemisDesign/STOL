"use client";

import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ProductGallery from "@/components/ProductGallery";
import type { Product } from "@/lib/products";

export default function ProductDetail({ product }: { product: Product }) {
  const { T } = useLanguage();

  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-text-secondary">
          <Link href="/products" className="hover:text-text-primary transition-colors">
            {categoryLabel}
          </Link>
          <ChevronRight size={10} strokeWidth={1.5} className="opacity-50" />
          <span className="text-text-secondary/60">{product.subcategory}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">

          {/* LEFT: Image gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* RIGHT: Product details */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">

            {/* Name + price */}
            <div>
              <h1
                className="font-heading font-light text-text-primary leading-tight mb-2"
                style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
              >
                {product.name}
              </h1>
              <p className="font-body text-[15px] text-text-secondary">
                {T.product.from} ${product.price.toLocaleString()}
              </p>
            </div>

            <div className="h-px w-full bg-accent/30" />

            {/* Description */}
            <p className="font-body text-[14px] leading-relaxed text-text-secondary">
              {product.description}
            </p>

            {/* Materials */}
            <div>
              <h2 className="font-body text-[10px] uppercase tracking-[0.2em] text-text-primary mb-3">
                {T.product.materials}
              </h2>
              <ul className="flex flex-col gap-2">
                {product.materials.map((m) => (
                  <li key={m} className="flex items-center gap-2.5 font-body text-[13px] text-text-secondary">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dimensions */}
            <div>
              <h2 className="font-body text-[10px] uppercase tracking-[0.2em] text-text-primary mb-3">
                {T.product.dimensions}
              </h2>
              <div className="grid grid-cols-3 divide-x divide-accent/20 border border-accent/20">
                {(
                  [
                    [T.product.width,  product.dimensions.width],
                    [T.product.depth,  product.dimensions.depth],
                    [T.product.height, product.dimensions.height],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="flex flex-col items-center py-4 gap-1">
                    <span className="font-heading text-[20px] font-light text-text-primary">{value}</span>
                    <span className="font-body text-[9px] uppercase tracking-[0.2em] text-text-secondary/60">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={`mailto:hello@mikhaylovcarpenter.com?subject=Inquiry: ${product.name}`}
                className="w-full bg-accent text-background font-body text-[11px] uppercase tracking-[0.2em] py-4 text-center transition-opacity duration-200 hover:opacity-80"
              >
                {T.product.inquire}
              </a>

              <p className="font-body text-[11px] text-text-secondary/70 text-center leading-relaxed">
                {T.product.customNote}
                <br />
                {T.product.leadTime}
              </p>

              <button className="flex items-center justify-center gap-2 font-body text-[11px] uppercase tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-200 py-1">
                <Heart size={13} strokeWidth={1.5} />
                {T.product.wishlist}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
