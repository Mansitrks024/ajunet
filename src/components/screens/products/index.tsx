"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Filter,
  LayoutGrid,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Category, Product } from "../../../data/products-data";
import FilterSidebar from "./FilterSidebar";
import Pagination from "../../common/Pagination";
import ProductSlider from "../../common/ProductSlider";
import BannerSlider from "../../common/BannerSlider";
import { getFeaturedProducts } from "../../../lib/utils/featuredProducts";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "commercial-poe-switch":
    "Professional-grade PoE switches designed for business networks with reliable power delivery and advanced management features.",
  "industrial-poe-switch":
    "Rugged industrial PoE switches built to withstand harsh environments with extended temperature ranges and robust construction.",
  "ethernet-switch":
    "High-performance Ethernet switches providing fast and reliable network connectivity for various applications and network sizes.",
};

interface ProductsProps {
  categories?: Category[];
  products?: Product[];
}

function getSlug(product_url: string) {
  if (!product_url) return "#";
  const parts = product_url.split("/product/");
  return parts[1] ? `/products/${parts[1].replace(/\/$/, "")}` : "#";
}

const TAG_STYLES: Record<
  string,
  {
    bg: string;
    text: string;
    dot: string;
    stripe: string;
    specBg: string;
    specIcon: string;
  }
> = {
  Commercial: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    dot: "bg-sky-400",
    stripe: "bg-sky-500",
    specBg: "bg-sky-100",
    specIcon: "text-sky-700",
  },
  Industrial: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
    stripe: "bg-amber-500",
    specBg: "bg-amber-100",
    specIcon: "text-amber-700",
  },
  Enterprise: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-400",

    stripe: "bg-violet-500",
    specBg: "bg-violet-100",
    specIcon: "text-violet-700",
  },
  Managed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
    stripe: "bg-emerald-500",
    specBg: "bg-emerald-100",
    specIcon: "text-emerald-700",
  },
  default: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
    stripe: "bg-slate-500",
    specBg: "bg-slate-100",
    specIcon: "text-slate-700",
  },
};

function ProductCard({ product }: { product: Product }) {
  const slug = getSlug(product.product_url);
  const specs = product.specs || {};
  const ports =
    specs["Fixed Port"] || specs["PoE Port"] || product.ports || null;
  const tagStyle = TAG_STYLES[product.tag] || TAG_STYLES.default;

  return (
    <Link
      href={slug}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <article className="relative h-full bg-gradient-to-br from-white to-slate-50/30 rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-slate-300/80">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${tagStyle.specBg}/20 z-0`}
        />

        {/* Badge - top left corner */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="relative inline-flex items-center">
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 blur-sm opacity-75"></span>
              <span className="relative text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg shadow-lg">
                {product.badge}
              </span>
            </span>
          </div>
        )}

        {/* Side accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${tagStyle.stripe} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-10`}
        />

        <div className="relative z-10 h-full flex flex-col">
          {/* Header with tag and model */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${tagStyle.dot} shadow-sm`}
              />
              <span
                className={`text-xs font-bold cpitalize tracking-wider px-2.5 py-1 rounded-md ${tagStyle.bg} ${tagStyle.text} border border-current/20`}
              >
                {product.tag}
              </span>
            </div>
            {product.model && (
              <span className="text-xs font-mono text-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200 px-2 py-1 rounded-md shadow-sm truncate max-w-[100px]">
                {product.model}
              </span>
            )}
          </div>

          {/* Image section with new design */}
          <div className="relative px-4 pb-4">
            <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100/60 h-48 flex items-center justify-center overflow-hidden group-hover:border-slate-200 transition-colors duration-300">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.1'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title || product.name}
                  className="w-40 h-40 object-contain relative z-10 transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center gap-2 transition-transform duration-500 group-hover:scale-105">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                    <LayoutGrid size={20} className="text-slate-400" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    No Image
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 flex flex-col px-4 pb-4 gap-3">
            {/* Title */}
            <h3 className="text-sm font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
              {product.title || product.name}
            </h3>

            {/* Specs section */}
            {ports && (
              <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-100/80">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tagStyle.specBg} flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <Layers size={14} className={tagStyle.specIcon} />
                </div>
                <span className="text-xs text-slate-600 font-medium leading-tight truncate max-w-[180px]">
                  {ports}
                </span>
              </div>
            )}

            {/* Footer with CTA */}
            <div className="mt-auto pt-3 border-t border-slate-100/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                  Explore Product
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors duration-200"></div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 group-hover:from-blue-600 group-hover:to-blue-700 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-lg">
                    <ArrowUpRight
                      size={16}
                      className="text-blue-600 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
        <Search size={28} className="text-slate-300" />
      </div>
      <p className="text-lg font-semibold text-slate-700 mb-1">
        No products found
      </p>
      <p className="text-sm text-slate-400 mb-6 max-w-xs">
        Try adjusting your search terms or clearing the category filter.
      </p>
      <button
        onClick={onReset}
        className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}

// ── MAIN PAGE ──────
export default function Products({
  categories = [],
  products = [],
}: ProductsProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Read category from URL query parameter on mount and clear filters when category changes
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCat(categoryParam);
      // Clear subcategory when switching to a different category
      setActiveSubCat(null);
      // Reset filter sidebar to hidden when switching categories
      setShowFilter(false);
    } else {
      // When no category parameter (All Products selected), clear all filters
      setActiveCat(null);
      setActiveSubCat(null);
      setShowFilter(false);
    }
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    let list = products;
    if (activeCat) list = list.filter((p) => p.category === activeCat);
    if (activeSubCat) {
      list = list.filter((p) => {
        // This ensures shared subcategories only show products from the correct main category
        const subs = (p.sub_categories || p.sub || "")
          .split("|")
          .map((s) => s.trim());
        return (
          subs.includes(activeSubCat) &&
          (!activeCat || p.category === activeCat)
        );
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || p.name || "").toLowerCase().includes(q) ||
          (p.model || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [products, activeCat, activeSubCat, search]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeCat, activeSubCat, search]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  // Get featured products for slider
  const featuredProductSets = getFeaturedProducts(
    products,
    activeCat,
    categories,
  );

  function resetAll() {
    setSearch("");
    setActiveSubCat(null);
    setCurrentPage(1);
  }

  const activeLabel = activeCat
    ? categories.find((c) => c.id === activeCat)?.label
    : null;
  const hasFilters = !!(activeCat || activeSubCat || search);

  return (
    <div className="min-h-screen">
      {/* Hero Banner with BannerSlider */}
      <BannerSlider />

      {featuredProductSets.length > 0 && (
        <div className="py-12">
          {featuredProductSets.map((featuredSet, index) => (
            <ProductSlider
              key={`${featuredSet.category}-${index}`}
              products={featuredSet.products}
              title={featuredSet.title}
              subtitle={featuredSet.subtitle}
              slidesPerView={4}
              spaceBetween={20}
            />
          ))}
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        {/* ── DESKTOP SIDEBAR ──*/}
        {showFilter && (
          <aside className="hidden lg:block w-72 shrink-0">
            <FilterSidebar
              categories={categories}
              products={products}
              activeCat={activeCat}
              activeSubCat={activeSubCat}
              onCatChange={setActiveCat}
              onSubCatChange={setActiveSubCat}
              onReset={resetAll}
            />
          </aside>
        )}

        {/* ── MOBILE DRAWER ────*/}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative ml-auto w-80 bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  Filter Products
                </p>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:rotate-90"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterSidebar
                  categories={categories}
                  products={products}
                  activeCat={activeCat}
                  activeSubCat={activeSubCat}
                  onCatChange={setActiveCat}
                  onSubCatChange={setActiveSubCat}
                  onReset={() => {
                    resetAll();
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT ──────*/}
        <main className="flex-1 min-w-0 mb-12">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-16">
            <div>
              <div className="inline-flex items-center gap-2">
                <div className="w-8 h-0.5 bg-primary rounded-[2px]" />
                <span className="text-lg font-bold tracking-[0.1em] uppercase text-primary">
                  {activeLabel || "All Products"}
                </span>
                <div className="w-8 h-0.5 bg-primary rounded-[2px]" />
              </div>

              <div className="flex items-center gap-2">
                {activeSubCat && (
                  <>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {activeSubCat}
                    </p>{" "}
                    {" | "}
                  </>
                )}

                <span className="text-sm text-slate-400 mt-0.5">
                  {filtered.length} products
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 lg:w-80 pl-10 pr-10 py-2.5 text-sm bg-background border-2 border-border rounded-xl focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg p-1 transition-all duration-200"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Desktop Filter Button - Only show when a category is selected */}
              {activeCat && (
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="hidden lg:flex items-center gap-2.5 text-sm font-medium text-foreground bg-gradient-to-r from-muted to-muted/80 hover:from-muted/90 hover:to-muted border border-border px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Filter
                    size={15}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="font-medium">Filters</span>
                  {hasFilters && (
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/70 shrink-0 animate-pulse" />
                  )}
                </button>
              )}

              {/* Mobile Filter Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2.5 text-sm font-medium text-foreground bg-gradient-to-r from-muted to-muted/80 hover:from-muted/90 hover:to-muted border border-border px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Filter
                  size={15}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="hidden sm:block font-medium">Filters</span>
                {hasFilters && (
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/70 shrink-0 animate-pulse" />
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Active filter chips — mobile */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
              {activeLabel && (
                <div className="group inline-flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {activeLabel}
                  </span>
                  <button
                    onClick={() => {
                      setActiveCat(null);
                      setActiveSubCat(null);
                    }}
                    className="text-blue-500 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-all duration-200"
                  >
                    <X
                      size={10}
                      className="group-hover:rotate-90 transition-transform duration-200"
                    />
                  </button>
                </div>
              )}
              {activeSubCat && (
                <div className="group inline-flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-2 border-slate-300 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    {activeSubCat}
                  </span>
                  <button
                    onClick={() => setActiveSubCat(null)}
                    className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-all duration-200"
                  >
                    <X
                      size={10}
                      className="group-hover:rotate-90 transition-transform duration-200"
                    />
                  </button>
                </div>
              )}
              {search && (
                <div className="group inline-flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-2 border-slate-300 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="flex items-center gap-1">
                    <Search size={10} className="text-slate-400" />"{search}"
                  </span>
                  <button
                    onClick={() => setSearch("")}
                    className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-all duration-200"
                  >
                    <X
                      size={10}
                      className="group-hover:rotate-90 transition-transform duration-200"
                    />
                  </button>
                </div>
              )}
              <button
                onClick={resetAll}
                className="text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-full border-2 border-red-200 transition-all duration-200"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product grid */}
          {filtered.length > 0 ? (
            <>
              <div
                className={`grid gap-5 ${
                  showFilter
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={`${product.product_id}-${product.product_url}`}
                    product={product}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filtered.length}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <EmptyState onReset={resetAll} />
          )}
        </main>
      </div>
    </div>
  );
}
