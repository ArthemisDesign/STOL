import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";

/* ─── Static params ───────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Mikhaylov Carpenter`,
    description: product.description,
  };
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
