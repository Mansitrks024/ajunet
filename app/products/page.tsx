import Products from "@/src/components/screens/products";
import { categories, products } from "@/src/data/products-data";

export default function ProductsPage() {
  return <Products categories={categories} products={products} />;
}
