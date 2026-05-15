import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [img1, img2] = product.images;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* ── Image area ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#EDE8E3]">
        {/* Primary image */}
        <Image
          src={img1}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-[400ms] ease-in-out group-hover:opacity-0"
          priority={false}
        />
        {/* Secondary image — crossfades in on hover */}
        <Image
          src={img2 ?? img1}
          alt={`${product.name} — alternate view`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100"
          priority={false}
        />
      </div>

      {/* ── Product info ── */}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-[17px] font-light text-text-primary leading-snug">
          {product.name}
        </h3>
        <p className="font-body text-[13px] text-text-secondary whitespace-nowrap shrink-0">
          From ${product.price.toLocaleString()}
        </p>
      </div>

      <p className="mt-0.5 font-body text-[11px] uppercase tracking-[0.1em] text-text-secondary/70">
        {product.category}
      </p>
    </Link>
  );
}
