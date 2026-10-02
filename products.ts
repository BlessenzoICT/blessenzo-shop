import catalog from "./catalog.json";

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  tarsusCategory?: string;
  subcategory?: string;
  brand: string;
  distributor: string;
  price: number;
  stock: number;
  stockLabel?: string;
  image?: string | null;
  featured?: boolean;
  specs?: Record<string, string>;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = catalog.categories as Category[];
export const products: Product[] = catalog.products as Product[];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string) {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
  );
}

export const catalogMeta = catalog.meta;
