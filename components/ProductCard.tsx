"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index:   number;
  feed?:   boolean;
}

export default function ProductCard({ product, index, feed = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [img1, img2] = product.images;
  const num = `(${String(index + 1).padStart(2, "0")})`;

  /* ── Feed row layout ── */
  if (feed) {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group flex items-center gap-6 py-5 hover:bg-[rgba(255,240,210,0.04)] transition-colors px-0"
      >
        <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 72, height: 72, backgroundColor: "#C8C4BE" }}>
          <Image src={img1} alt={product.name} fill className="object-contain" sizes="72px" />
        </div>
        <div className="flex-1 min-w-0 flex items-baseline gap-3">
          <span className="font-body text-text-secondary/40 flex-shrink-0" style={{ fontSize: "10px", letterSpacing: "0.05em" }}>
            {num}
          </span>
          <span className="font-heading text-text-primary truncate" style={{ fontSize: "15px" }}>
            {product.name}
          </span>
        </div>
        <span className="font-body text-text-secondary/50 flex-shrink-0" style={{ fontSize: "11px" }}>
          From ${product.price.toLocaleString()}
        </span>
      </Link>
    );
  }

  /* ── Grid card layout ── */
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "1/1", backgroundColor: "#C8C4BE" }}
      >
        <Image
          src={img1}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain transition-opacity duration-500"
          style={{ opacity: hovered && img2 !== img1 ? 0 : 1 }}
          priority={index < 5}
        />
        {img2 && img2 !== img1 && (
          <Image
            src={img2}
            alt={`${product.name} — alternate`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        )}

        {/* Crosshair on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <span
            className="font-body select-none"
            style={{ fontSize: "18px", color: "rgba(237,232,224,0.25)", lineHeight: 1 }}
          >
            +
          </span>
        </div>
      </div>

      {/* Label: (01) Name */}
      <div className="mt-2.5 flex items-baseline gap-2">
        <span
          className="font-body text-text-secondary/40 flex-shrink-0"
          style={{ fontSize: "10px", letterSpacing: "0.04em" }}
        >
          {num}
        </span>
        <span
          className="font-heading font-light text-text-primary leading-snug truncate"
          style={{ fontSize: "13px" }}
        >
          {product.name}
        </span>
      </div>
    </Link>
  );
}
