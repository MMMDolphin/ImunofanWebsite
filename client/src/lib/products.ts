export interface Product {
  id: number;
  slug: string; // SEO-friendly Bulgarian URL
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  benefits?: string[];
  type: 'injection' | 'nasal' | 'suppository' | 'tablets' | 'gel' | 'drops' | 'kit';
  seoTitle: string;
  seoDescription: string;
}

export const products: Product[] = [
  {
    id: 6,
    slug: "imunofan-supozitorii-rektalni",
    name: "Имунофан СУППОЗИТОРИИ 50 мкг",
    category: "Суппозитории",
    price: "150.00",
    originalPrice: "180.00",
    image: "/Имунофан-суппозитори-1.webp",
    images: [
      "/Имунофан-суппозитори-1.webp",
      "/Имунофан-суппозитори-2.webp", 
      "/Имунофан-суппозитори-3.webp"
    ],
    description: "Ректални суппозитории - най-ефективната форма за максимално усвояване и системно действие без странични ефекти",
    rating: 4.9,
    reviews: 142,
    inStock: true,
    features: [
      "98% биодостъпност - директно в кръвта",
      "Заобикаля стомашно-чревния тракт", 
      "Идеални при стомашни проблеми",
      "Бързо и продължително действие",
      "Подходящи за деца над 3 години",
      "Без натоварване на черния дроб"
    ],
    benefits: [
      "🎯 МАКСИМАЛНА ЕФЕКТИВНОСТ: Директно попадане в системното кръвообращение",
      "⚡ БЪРЗ ЕФЕКТ: Действие започва за 15-30 минути",
      "🛡️ ЩАДЯЩИ ЗА СТОМАХА: Идеални при гастрит, язва или чувствителен стомах",
      "👶 ЗА ЦЯЛОТО СЕМЕЙСТВО: Подходящи за деца, възрастни и възрастни хора", 
      "💊 БЕЗ СТРАНИЧНИ ЕФЕКТИ: Не натоварват храносмилателната система",
      "🔄 ПРОДЪЛЖИТЕЛНО ДЕЙСТВИЕ: Постепенно освобождаване до 8 часа"
    ],
    type: 'suppository',
    seoTitle: "Имунофан Суппозитории - Най-Ефективната Форма за Максимално Усвояване | Поръчай Онлайн",
    seoDescription: "Имунофан ректални суппозитории 50 мкг с 98% биодостъпност. Директно попадане в кръвта, заобикаляйки стомаха. Идеални за деца и възрастни."
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
} 