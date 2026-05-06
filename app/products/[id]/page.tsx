import ProductDetail from "@/src/components/screens/products/ProductDetail";
import { products, categories } from "@/src/data/products-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const allProductIds = products.map(p => p.id.toString());

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!allProductIds.includes(id)) {
    notFound();
  }

  const product = products.find(p => p.id.toString() === id);
  const category = product ? categories.find(c => c.id === product.category) : undefined;
  const categoryData = category ? {
    id: category.id,
    label: category.label,
    subcategories: category.subcategories
  } : undefined;

  return <ProductDetail product={product!} category={categoryData} />;
}
