import { Product } from "../../data/products-data";

export interface FeaturedProductSet {
  category: string;
  products: Product[];
  title: string;
  subtitle: string;
}

export function getFeaturedProducts(
  allProducts: Product[],
  activeCategory?: string | null,
  categories?: any[]
): FeaturedProductSet[] {
  // Only show sliders when a category is selected
  if (!activeCategory || !categories) {
    return [];
  }

  // Find the category label from the category ID
  const selectedCategory = categories.find((c) => c.id === activeCategory);
  const categoryLabel = selectedCategory?.label;
  
  if (!categoryLabel) {
    return [];
  }

  // Get featured products for selected category
  const categoryProducts = allProducts.filter(
    (p) => p.main_category === categoryLabel
  );
  
  if (categoryProducts.length === 0) return [];

  return [
    {
      category: categoryLabel,
      products: getTopProducts(categoryProducts, 8),
      title: `Featured ${categoryLabel}`,
      subtitle: `Discover our most popular ${categoryLabel.toLowerCase()} solutions`,
    },
  ];
}

function getTopProducts(products: Product[], limit: number): Product[] {
  // Sort products by a combination of factors to determine "featured" status
  // Priority: 1. Has badge, 2. Has image, 3. Has model, 4. Shorter title (more specific)
  const sorted = [...products].sort((a, b) => {
    // Priority 1: Products with badges
    const aHasBadge = a.badge ? 1 : 0;
    const bHasBadge = b.badge ? 1 : 0;
    if (aHasBadge !== bHasBadge) return bHasBadge - aHasBadge;

    // Priority 2: Products with images
    const aHasImage = a.image_url ? 1 : 0;
    const bHasImage = b.image_url ? 1 : 0;
    if (aHasImage !== bHasImage) return bHasImage - aHasImage;

    // Priority 3: Products with model numbers
    const aHasModel = a.model ? 1 : 0;
    const bHasModel = b.model ? 1 : 0;
    if (aHasModel !== bHasModel) return bHasModel - aHasModel;

    // Priority 4: Shorter titles (usually more specific product names)
    const aTitleLength = (a.title || a.name || "").length;
    const bTitleLength = (b.title || b.name || "").length;
    return aTitleLength - bTitleLength;
  });

  return sorted.slice(0, limit);
}

export function getRandomFeaturedProducts(
  allProducts: Product[],
  count: number = 8
): Product[] {
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
