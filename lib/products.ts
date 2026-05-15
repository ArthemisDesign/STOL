export type Category = "sleep" | "live" | "eat" | "work";

export interface Dimensions {
  width: string;
  depth: string;
  height: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: Category;
  subcategory: string;
  price: number;
  description: string;
  images: string[];
  materials: string[];
  dimensions: Dimensions;
}

const CDN = "https://cdn.sanity.io/images/ld3h3xvm/production";

// Each product has its own distinct real photograph
const IMGS: Record<string, string> = {
  "grant-bed":           `${CDN}/cdb2bd24d9e9c46988842a6e8a156a2f63ee2569-2962x2962.jpg`,
  "pierpont-bed":        `${CDN}/6eb48f4eb6a1ce45989263822019bcdb4db07f2e-2962x2962.jpg`,
  "grant-bedside-table": `${CDN}/08c5b2f0c55459cccfd20a364b4c2e31c490ef2e-2962x2962.jpg`,
  "grant-lounge-chair":  `${CDN}/4f51f4e7620236091b0b3e8e07d68c134dca2b7b-2962x2962.jpg`,
  "lulu-lounge-chair":   `${CDN}/98e7ab196b46e155a18600f377d851e16591cd95-2962x2962.jpg`,
  "grant-armless-chaise":`${CDN}/7402c3e0ef2e22d4382fb2308e138119aa8d7f94-2960x2960.jpg`,
  "grant-bench":         `${CDN}/3940ad212f29cb023bae440369b0c70e0ecc34aa-2962x2962.jpg`,
  "grant-bookshelf":     `${CDN}/ac638e016dc45c0843a5f4262ef2bad13da0ca3c-2960x2962.jpg`,
  "harlow-coffee-table": `${CDN}/96d296fa01a5456731231b774582c8f2323a80b8-2962x2962.jpg`,
  "rumi-cocktail-tables":`${CDN}/b9ea11458f644b148abae59e2a986e126c361c42-2962x2962.jpg`,
  "grant-mirror":        `${CDN}/b630b39116dbaf91ae004e0104c40f3578c91321-2960x2962.jpg`,
  "marmont-dining-table":`${CDN}/76b2aad7306e2a24a2462cd892f518a5f14ae97e-2962x2962.jpg`,
  "marmont-dining-chair":`${CDN}/4bec5f387ebc9658f945a0f8f0edb5178ce37eaf-2962x2962.jpg`,
  "grant-counter-stool": `${CDN}/a68bc2edbb359b9489bad0acdf1e76e575f7c8c7-2960x2962.jpg`,
  "grant-desk":          `${CDN}/b50091124f4d10b92ae92ae0d7f148bc5629b30b-2964x2964.jpg`,
};

function img(slug: string): string[] {
  return [IMGS[slug] ?? IMGS["grant-bed"], IMGS[slug] ?? IMGS["grant-bed"]];
}

export const products: Product[] = [
  // ── Sleep ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "grant-bed",
    name: "Grant Bed",
    category: "sleep",
    subcategory: "Beds",
    price: 4800,
    description:
      "A stately platform bed with a low-profile headboard crafted in solid white oak. Clean lines and heirloom joinery make it a lifetime piece. Available in Queen and King.",
    images: img("grant-bed"),
    materials: ["Solid White Oak", "Mortise & Tenon Joinery", "Hardwax Oil Finish"],
    dimensions: { width: '67"', depth: '88"', height: '42"' },
  },
  {
    id: 2,
    slug: "pierpont-bed",
    name: "Pierpont Bed",
    category: "sleep",
    subcategory: "Beds",
    price: 5600,
    description:
      "An architectural upholstered bed with a tall channeled headboard in bouclé. A quiet, commanding centerpiece for the bedroom. Down-wrapped cushioning for exceptional comfort.",
    images: img("pierpont-bed"),
    materials: ["Kiln-Dried Hardwood Frame", "Belgian Bouclé", "Down Fill"],
    dimensions: { width: '67"', depth: '88"', height: '58"' },
  },
  {
    id: 3,
    slug: "grant-bedside-table",
    name: "Grant Bedside Table",
    category: "sleep",
    subcategory: "Bedside Tables",
    price: 1200,
    description:
      "A minimal nightstand with a single dovetailed drawer and open lower shelf. Designed to companion the Grant Bed perfectly. Brass hardware included.",
    images: img("grant-bedside-table"),
    materials: ["Solid White Oak", "Brass Hardware", "Hardwax Oil Finish"],
    dimensions: { width: '22"', depth: '18"', height: '24"' },
  },

  // ── Live ───────────────────────────────────────────────────────────────────
  {
    id: 4,
    slug: "grant-lounge-chair",
    name: "Grant Lounge Chair",
    category: "live",
    subcategory: "Lounge Chairs",
    price: 3200,
    description:
      "A generously proportioned lounge chair with solid white oak legs and a hand-welted cushion. Designed for decades of evening reading. Available in leather and bouclé.",
    images: img("grant-lounge-chair"),
    materials: ["Solid White Oak", "Top-Grain Leather", "Down Blend Fill"],
    dimensions: { width: '34"', depth: '36"', height: '32"' },
  },
  {
    id: 5,
    slug: "lulu-lounge-chair",
    name: "Lulu Lounge Chair",
    category: "live",
    subcategory: "Lounge Chairs",
    price: 2800,
    description:
      "A sculptural accent chair with a curved wraparound back and tapered beech legs. Available in natural linen and terracotta bouclé. Ships in 12–16 weeks.",
    images: img("lulu-lounge-chair"),
    materials: ["Beech Wood Frame", "Natural Linen", "Foam & Fiber Fill"],
    dimensions: { width: '30"', depth: '32"', height: '34"' },
  },
  {
    id: 6,
    slug: "grant-armless-chaise",
    name: "Grant Armless Chaise",
    category: "live",
    subcategory: "Chaises",
    price: 3800,
    description:
      "A long-lined armless chaise with a continuous profile and solid white oak base. Made for reading, resting, or simply being. Available in linen and bouclé.",
    images: img("grant-armless-chaise"),
    materials: ["Solid White Oak", "Natural Linen", "Down & Feather Fill"],
    dimensions: { width: '62"', depth: '32"', height: '30"' },
  },
  {
    id: 7,
    slug: "grant-bench",
    name: "Grant Bench",
    category: "live",
    subcategory: "Benches",
    price: 1800,
    description:
      "A versatile upholstered bench with a solid white oak base and webbed seat support. Works at the foot of a bed, in an entry, or anchoring a sofa grouping.",
    images: img("grant-bench"),
    materials: ["Solid White Oak", "Wool Bouclé", "8-Way Hand-Tied Webbing"],
    dimensions: { width: '60"', depth: '18"', height: '18"' },
  },
  {
    id: 8,
    slug: "grant-bookshelf",
    name: "Grant Bookshelf",
    category: "live",
    subcategory: "Shelving",
    price: 2600,
    description:
      "A five-shelf open bookcase with adjustable shelf positions and a slender profile. Built to hold a real library and look like it was always there.",
    images: img("grant-bookshelf"),
    materials: ["Solid White Oak", "Steel Back Panel", "Adjustable Shelf Pins"],
    dimensions: { width: '42"', depth: '14"', height: '78"' },
  },
  {
    id: 9,
    slug: "harlow-coffee-table",
    name: "Harlow Coffee Table",
    category: "live",
    subcategory: "Coffee Tables",
    price: 2200,
    description:
      "A low-slung coffee table with a honed Calacatta marble top and hand-cast solid brass legs. Effortlessly the room's focal point. Each marble slab is unique.",
    images: img("harlow-coffee-table"),
    materials: ["Honed Calacatta Marble", "Solid Brass Legs", "Felt Floor Glides"],
    dimensions: { width: '48"', depth: '24"', height: '16"' },
  },
  {
    id: 10,
    slug: "rumi-cocktail-tables",
    name: "Rumi Cocktail Tables",
    category: "live",
    subcategory: "Side Tables",
    price: 1600,
    description:
      "A set of two nesting side tables at varying heights, each with a hand-turned walnut base and smoked glass top. Sold as a pair.",
    images: img("rumi-cocktail-tables"),
    materials: ["Smoked Tempered Glass", "Hand-Turned Black Walnut Base"],
    dimensions: { width: '20"', depth: '20"', height: '22"' },
  },
  {
    id: 11,
    slug: "grant-mirror",
    name: "Grant Mirror",
    category: "live",
    subcategory: "Mirrors",
    price: 950,
    description:
      "A full-length leaning mirror in a solid white oak frame with a matte natural finish. Simple, functional, and beautifully made. Wall-mount hardware included.",
    images: img("grant-mirror"),
    materials: ["Solid White Oak", "Low-Iron Mirror Glass", "Wall-Mount Hardware"],
    dimensions: { width: '24"', depth: '2"', height: '72"' },
  },

  // ── Eat ────────────────────────────────────────────────────────────────────
  {
    id: 12,
    slug: "marmont-dining-table",
    name: "Marmont Dining Table",
    category: "eat",
    subcategory: "Dining Tables",
    price: 6400,
    description:
      "A grand dining table with a book-matched live-edge walnut top and a sculpted trestle base in blackened steel. Seats eight comfortably. Each top is one of a kind.",
    images: img("marmont-dining-table"),
    materials: ["Live-Edge Black Walnut", "Blackened Steel Base", "Hardwax Oil Finish"],
    dimensions: { width: '96"', depth: '40"', height: '30"' },
  },
  {
    id: 13,
    slug: "marmont-dining-chair",
    name: "Marmont Dining Chair",
    category: "eat",
    subcategory: "Dining Chairs",
    price: 1100,
    description:
      "A woven seagrass dining chair with a solid walnut frame and gently curved back. Lightweight, stackable, and hand-finished by craftspeople in North Carolina.",
    images: img("marmont-dining-chair"),
    materials: ["Solid Black Walnut", "Hand-Woven Natural Seagrass Seat"],
    dimensions: { width: '20"', depth: '22"', height: '34"' },
  },
  {
    id: 14,
    slug: "grant-counter-stool",
    name: "Grant Counter Stool",
    category: "eat",
    subcategory: "Counter Stools",
    price: 780,
    description:
      "A counter-height stool with a subtly contoured seat, solid white oak frame, and a brass footrest rail. Designed for hours of comfortable conversation.",
    images: img("grant-counter-stool"),
    materials: ["Solid White Oak", "Natural Linen Cushion", "Brass Footrest Rail"],
    dimensions: { width: '16"', depth: '16"', height: '26"' },
  },

  // ── Work ───────────────────────────────────────────────────────────────────
  {
    id: 15,
    slug: "grant-desk",
    name: "Grant Desk",
    category: "work",
    subcategory: "Desks",
    price: 3400,
    description:
      "A minimal writing desk with a broad work surface, single fluted-face drawer, and tapered solid white oak legs. No cable grommets, no distractions — just beauty.",
    images: img("grant-desk"),
    materials: ["Solid White Oak", "Fluted Drawer Face", "Brass Pull"],
    dimensions: { width: '60"', depth: '28"', height: '30"' },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}
