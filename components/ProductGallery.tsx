"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  // Keep track of direction to correctly slide the crossfade
  const [prev, setPrev] = useState<number | null>(null);

  function select(i: number) {
    if (i === selected) return;
    setPrev(selected);
    setSelected(i);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* ── Main image ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#EDE8E3]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src={images[selected]}
              alt={`${name} — view ${selected + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={selected === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => select(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square flex-1 overflow-hidden bg-[#EDE8E3] transition-all duration-200
                ${selected === i
                  ? "ring-1 ring-text-primary ring-offset-1"
                  : "opacity-50 hover:opacity-75"
                }`}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
