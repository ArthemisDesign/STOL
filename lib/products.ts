export type Category = "tables" | "storage";

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

const IMGS: Record<string, string[]> = {
  "step":   ["/products/step/1.png",   "/products/step/2.png",   "/products/step/3.png",   "/products/step/4.png"],
  "gambit": ["/products/gambit/1.png", "/products/gambit/2.png", "/products/gambit/3.png", "/products/gambit/4.png"],
  "mayak":  ["/products/mayak/1.png",  "/products/mayak/2.png",  "/products/mayak/3.png",  "/products/mayak/4.png"],
  "arhiv":  ["/products/arhiv/1.png",  "/products/arhiv/2.png",  "/products/arhiv/3.png",  "/products/arhiv/4.png"],
};

export const products: Product[] = [
  {
    id: 1,
    slug: "step",
    name: "Степь",
    category: "tables",
    subcategory: "Журнальные столики",
    price: 45000,
    description:
      "Квадратный журнальный столик из массива дерева с вставкой из натуральной кожи. Тёплый, тактильный, честный — сделан руками и рассчитан на долгую жизнь. Хорошо стоит рядом с диваном и со временем только улучшается.",
    images: IMGS["step"],
    materials: ["Массив дерева", "Натуральная кожа", "Металлическое основание"],
    dimensions: { width: "80 см", depth: "80 см", height: "40 см" },
  },
  {
    id: 2,
    slug: "gambit",
    name: "Гамбит",
    category: "tables",
    subcategory: "Журнальные столики",
    price: 52000,
    description:
      "Квадратный журнальный столик со встроенной шахматной доской под стеклом. Для долгих вечеров, неторопливых разговоров и партий, которые могут затянуться до полуночи. Работает и как обычный столик.",
    images: IMGS["gambit"],
    materials: ["Массив дерева", "Закалённое стекло", "Шахматная инкрустация"],
    dimensions: { width: "70 см", depth: "70 см", height: "38 см" },
  },
  {
    id: 3,
    slug: "mayak",
    name: "Маяк",
    category: "tables",
    subcategory: "Журнальные столики",
    price: 38000,
    description:
      "Низкий круглый столик из массива дерева. Мягкие линии, устойчивое основание, никакой лишней детали. Легко вписывается в любой интерьер и со временем становится его тихой, незаменимой частью.",
    images: IMGS["mayak"],
    materials: ["Массив дерева", "Льняное масло"],
    dimensions: { width: "Ø 60 см", depth: "—", height: "40 см" },
  },
  {
    id: 4,
    slug: "arhiv",
    name: "Архив",
    category: "storage",
    subcategory: "Книжные шкафы",
    price: 65000,
    description:
      "Открытый книжный шкаф из массива дерева с чистыми пропорциями и прочными полками. Сделан для настоящих книг, пластинок, семейных вещей и ощущения дома, в котором всё на своём месте.",
    images: IMGS["arhiv"],
    materials: ["Массив дерева", "Металлические элементы"],
    dimensions: { width: "100 см", depth: "35 см", height: "180 см" },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}
