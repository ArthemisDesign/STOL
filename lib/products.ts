import type { Locale } from "@/lib/i18n";

export type Category = "tables" | "storage";

export interface Dimensions {
  width: string;
  depth: string;
  height: string;
}

export interface LocalizedContent {
  name:        string;
  description: string;
  subcategory: string;
  materials:   string[];
  dimensions:  Dimensions;
}

export interface Product {
  id:           number;
  slug:         string;
  category:     Category;
  price:        number;
  images:       string[];
  translations: Record<Locale, LocalizedContent>;
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
    category: "tables",
    price: 45000,
    images: IMGS["step"],
    translations: {
      ru: {
        name:        "Степь",
        subcategory: "Журнальные столики",
        description: "Квадратный журнальный столик из массива дерева с вставкой из натуральной кожи. Тёплый, тактильный, честный — сделан руками и рассчитан на долгую жизнь. Хорошо стоит рядом с диваном и со временем только улучшается.",
        materials:   ["Массив дерева", "Натуральная кожа", "Металлическое основание"],
        dimensions:  { width: "80 см", depth: "80 см", height: "40 см" },
      },
      en: {
        name:        "Steppe",
        subcategory: "Coffee Tables",
        description: "A square coffee table in solid wood with a natural leather insert. Warm, tactile, honest — made by hand and built for the long haul. Sits well next to a sofa and only gets better with time.",
        materials:   ["Solid wood", "Natural leather", "Metal base"],
        dimensions:  { width: "80 cm", depth: "80 cm", height: "40 cm" },
      },
      zh: {
        name:        "草原",
        subcategory: "茶几",
        description: "实木正方形茶几，带天然皮革嵌入面。温暖、触感真实、朴实无华——纯手工制作，经久耐用。与沙发相配，随时间只会越变越好。",
        materials:   ["实木", "天然皮革", "金属底座"],
        dimensions:  { width: "80 厘米", depth: "80 厘米", height: "40 厘米" },
      },
    },
  },
  {
    id: 2,
    slug: "gambit",
    category: "tables",
    price: 52000,
    images: IMGS["gambit"],
    translations: {
      ru: {
        name:        "Гамбит",
        subcategory: "Журнальные столики",
        description: "Квадратный журнальный столик со встроенной шахматной доской под стеклом. Для долгих вечеров, неторопливых разговоров и партий, которые могут затянуться до полуночи. Работает и как обычный столик.",
        materials:   ["Массив дерева", "Закалённое стекло", "Шахматная инкрустация"],
        dimensions:  { width: "70 см", depth: "70 см", height: "38 см" },
      },
      en: {
        name:        "Gambit",
        subcategory: "Coffee Tables",
        description: "A square coffee table with a built-in chessboard under glass. For long evenings, unhurried conversations, and games that might stretch to midnight. Works just as well as a regular table.",
        materials:   ["Solid wood", "Tempered glass", "Chess inlay"],
        dimensions:  { width: "70 cm", depth: "70 cm", height: "38 cm" },
      },
      zh: {
        name:        "棋局",
        subcategory: "茶几",
        description: "带玻璃下内嵌棋盘的方形茶几。适合漫长的夜晚、悠闲的交谈，以及可能延续至午夜的棋局。同样可作普通茶几使用。",
        materials:   ["实木", "钢化玻璃", "国际象棋镶嵌"],
        dimensions:  { width: "70 厘米", depth: "70 厘米", height: "38 厘米" },
      },
    },
  },
  {
    id: 3,
    slug: "mayak",
    category: "tables",
    price: 38000,
    images: IMGS["mayak"],
    translations: {
      ru: {
        name:        "Маяк",
        subcategory: "Журнальные столики",
        description: "Низкий круглый столик из массива дерева. Мягкие линии, устойчивое основание, никакой лишней детали. Легко вписывается в любой интерьер и со временем становится его тихой, незаменимой частью.",
        materials:   ["Массив дерева", "Льняное масло"],
        dimensions:  { width: "Ø 60 см", depth: "—", height: "40 см" },
      },
      en: {
        name:        "Mayak",
        subcategory: "Coffee Tables",
        description: "A low round table in solid wood. Soft lines, a steady base, nothing superfluous. Fits into any interior easily and becomes its quiet, indispensable part over time.",
        materials:   ["Solid wood", "Linseed oil"],
        dimensions:  { width: "Ø 60 cm", depth: "—", height: "40 cm" },
      },
      zh: {
        name:        "灯塔",
        subcategory: "茶几",
        description: "实木低矮圆形茶几。线条柔和，底座稳固，无任何多余细节。轻松融入任何室内环境，随时间成为其中安静而不可或缺的一部分。",
        materials:   ["实木", "亚麻籽油"],
        dimensions:  { width: "Ø 60 厘米", depth: "—", height: "40 厘米" },
      },
    },
  },
  {
    id: 4,
    slug: "arhiv",
    category: "storage",
    price: 65000,
    images: IMGS["arhiv"],
    translations: {
      ru: {
        name:        "Архив",
        subcategory: "Книжные шкафы",
        description: "Открытый книжный шкаф из массива дерева с чистыми пропорциями и прочными полками. Сделан для настоящих книг, пластинок, семейных вещей и ощущения дома, в котором всё на своём месте.",
        materials:   ["Массив дерева", "Металлические элементы"],
        dimensions:  { width: "100 см", depth: "35 см", height: "180 см" },
      },
      en: {
        name:        "Arhiv",
        subcategory: "Bookshelves",
        description: "An open bookcase in solid wood with clean proportions and sturdy shelves. Made for real books, records, family objects, and the feeling of a home where everything has its place.",
        materials:   ["Solid wood", "Metal elements"],
        dimensions:  { width: "100 cm", depth: "35 cm", height: "180 cm" },
      },
      zh: {
        name:        "书档",
        subcategory: "书架",
        description: "比例简洁、隔板坚固的实木开放式书柜。专为真正的书籍、唱片、家庭物品而造，带来一种家中万物各归其位的安心感。",
        materials:   ["实木", "金属元素"],
        dimensions:  { width: "100 厘米", depth: "35 厘米", height: "180 厘米" },
      },
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}
