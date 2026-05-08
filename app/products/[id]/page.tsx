import ProductDetail from "@/src/components/screens/products/ProductDetail";
import { products, Product } from "@/src/data/products-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function findProduct(slug: string): Product | null {
  return (
    products.find((p) => {
      if (!p.product_url) return false;
      const s = p.product_url.split("/product/")[1]?.replace(/\/$/, "");
      return s === slug;
    }) || null
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Try to find product by slug extracted from product_url
  const product = findProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
