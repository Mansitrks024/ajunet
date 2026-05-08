"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowUpRight,
  Filter,
  LayoutGrid,
  Layers,
} from "lucide-react";
import { Category, Product } from "../../../data/products-data";
import FilterSidebar from "./FilterSidebar";
import Pagination from "../../common/Pagination";

interface ProductsProps {
  categories?: Category[];
  products?: Product[];
}

function getSlug(product_url: string) {
  if (!product_url) return "#";
  const parts = product_url.split("/product/");
  return parts[1] ? `/products/${parts[1].replace(/\/$/, "")}` : "#";
}

const TAG_STYLES: Record<string, { bg: string; text: string; dot: string; stripe: string; specBg: string; specIcon: string }> = {
  Commercial: {
    bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-400", stripe: "bg-sky-500",
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
    bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", stripe: "bg-slate-500",
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
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[20px]"
    >
      <article className="relative h-full flex flex-col bg-white rounded-[20px] border border-slate-100 overflow-hidden transition-all duration-300 hover:border-slate-200 hover:-translate-y-1">

        {/* Colored top stripe — appears on hover */}
        <div
          className={`absolute top-0 left-0 right-0 h-[3px] ${tagStyle.stripe} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
        />

        {/* Image zone */}
        <div className="relative bg-slate-50 h-[200px] flex items-center justify-center overflow-hidden">
          {/* Tinted wash on hover */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${tagStyle.specBg}`}
          />

          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title || product.name}
              className="w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.08]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-slate-100 flex flex-col items-center justify-center gap-1 transition-transform duration-500 group-hover:scale-105">
              <LayoutGrid size={28} className="text-slate-300" />
              <span className="text-[9px] font-medium text-slate-300">No Image</span>
            </div>
          )}

          {product.badge && (
            <span className="absolute top-3 right-3 z-20 text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 bg-[#1a1a1a] text-white rounded-[6px]">
              {product.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-2.5">

          {/* Tag + Model */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-[5px] text-[10.5px] font-medium px-2.5 py-[3px] rounded-full ${tagStyle.bg} ${tagStyle.text}`}
            >
              <span className={`w-[6px] h-[6px] rounded-full ${tagStyle.dot}`} />
              {product.tag}
            </span>
            {product.model && (
              <span className="text-[9.5px] font-mono text-slate-400 bg-slate-50 border border-slate-100 px-[7px] py-[2px] rounded-[5px] truncate max-w-[110px]">
                Model:{product.model}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors duration-200 flex-1">
            {product.title || product.name}
          </h3>

          {/* Spec pill */}
          {ports && (
            <div className={`flex items-start gap-2 px-2.5 py-2 rounded-[10px] border border-slate-100 ${tagStyle.specBg}`}>
              <div className={`w-[26px] h-[26px] rounded-[7px] bg-white flex items-center justify-center shrink-0`}>
                <Layers size={12} className={tagStyle.specIcon} />
              </div>
              <span className="text-[11px] text-slate-500 leading-snug pt-[3px] truncate">
                {ports}
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-slate-50">
            <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
              View details
            </span>
            <div className="w-[30px] h-[30px] rounded-[9px] bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-200">
              <ArrowUpRight
                size={14}
                className="text-blue-400 group-hover:text-white transition-colors"
              />
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
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] =
      Array.from({ length: 38 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1.5,
      }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(33, 117, 196, ${0.18 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(33, 117, 196, 0.45)";
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCat) list = list.filter((p) => p.category === activeCat);
    if (activeSubCat) {
      list = list.filter((p) => {
        const subs = (p.sub_categories || p.sub || "")
          .split("|")
          .map((s) => s.trim());
        return subs.includes(activeSubCat);
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

  function resetAll() {
    setSearch("");
    setActiveCat(null);
    setActiveSubCat(null);
    setCurrentPage(1);
  }

  const activeLabel = activeCat
    ? categories.find((c) => c.id === activeCat)?.label
    : null;
  const hasFilters = !!(activeCat || activeSubCat || search);

  return (
    <div className="min-h-screen">
      {/* Hero Strip */}
      <section className="relative overflow-hidden bg-background px-6 py-24">
        {/* Animated Network Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-[0.85]"
        />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(var(--primary) / 0.22) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-8">
            <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
            <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
              Product Catalog
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground max-w-[820px] mb-6">
            Network Equipment
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mb-8">
            We offer a comprehensive range of networking products designed for
            performance, reliability, and scalability.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium">{products.length} Products Available</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl border border-border">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">{categories.length} Categories</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl border border-border">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        {/* ── DESKTOP SIDEBAR ────────────────────────────── */}
        <aside className="hidden lg:block w-72 shrink-0">
          <FilterSidebar
            categories={categories}
            products={products}
            activeCat={activeCat}
            activeSubCat={activeSubCat}
            search={search}
            onCatChange={setActiveCat}
            onSubCatChange={setActiveSubCat}
            onSearchChange={setSearch}
            onReset={resetAll}
          />
        </aside>

        {/* ── MOBILE DRAWER ──────────────────────────────── */}
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
                  search={search}
                  onCatChange={setActiveCat}
                  onSubCatChange={setActiveSubCat}
                  onSearchChange={setSearch}
                  onReset={() => {
                    resetAll();
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT ────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {activeLabel || "All Products"}
              </h1>
              <span className="text-sm text-slate-400 sm:hidden">
                {filtered.length} products
              </span>
              {activeSubCat && (
                <p className="text-sm text-slate-500 mt-0.5">{activeSubCat}</p>
              )}
            </div>

            <div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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
