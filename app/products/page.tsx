import { Suspense } from "react";
import Products from "@/src/components/screens/products";
import { categories, products } from "@/src/data/products-data";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Products categories={categories} products={products} />
    </Suspense>
  );
}
