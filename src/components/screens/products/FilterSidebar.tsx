import {
  X,
  ChevronDown,
  LayoutGrid,
  Layers,
  Factory,
  Globe,
  Zap,
  Wrench,
  Wifi,
} from "lucide-react";
import { Category, Product } from "../../../data/products-data";

interface FilterSidebarProps {
  categories: Category[];
  products: Product[];
  activeCat: string | null;
  activeSubCat: string | null;
  onCatChange: (id: string | null) => void;
  onSubCatChange: (sub: string | null) => void;
  onReset: () => void;
}

const iconMap = { Layers, Factory, Globe, Zap, Wrench, Wifi, LayoutGrid };
const getIcon = (name: string) =>
  iconMap[name as keyof typeof iconMap] || LayoutGrid;

// ── CATEGORY ITEM COMPONENT ─────────────────────────────────────────
function CategoryItem({
  category,
  activeCat,
  activeSubCat,
  onSelectCat,
  onSelectSub,
  productCount,
}: {
  category: Category;
  activeCat: string | null;
  activeSubCat: string | null;
  onSelectCat: (id: string) => void;
  onSelectSub: (sub: string | null) => void;
  productCount: number;
}) {
  const isOpen = activeCat === category.id;
  const Icon = getIcon(category.icon);

  return (
    <div className="px-1 mb-2">
      <button
        onClick={() => onSelectCat(category.id)}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 group ${
          isOpen
            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg transform hover:scale-[1.01]"
            : "bg-card/50 text-muted-foreground hover:bg-gradient-to-r hover:from-muted hover:to-muted/50 hover:text-foreground border border-transparent hover:border-border/50"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
            isOpen
              ? "bg-primary-foreground/20 shadow-inner"
              : "bg-muted group-hover:bg-primary/10"
          }`}
        >
          <Icon
            size={15}
            className={
              isOpen
                ? "text-primary-foreground"
                : "text-muted-foreground group-hover:text-primary transition-colors duration-200"
            }
          />
        </div>
        <span className="flex-1 text-left font-semibold leading-tight">
          {category.label}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all duration-200 ${
              isOpen
                ? "bg-primary-foreground/20 text-primary-foreground shadow-inner"
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            }`}
          >
            {productCount}
          </span>
          <ChevronDown
            size={13}
            className={`transition-all duration-300 shrink-0 ${isOpen ? "rotate-180 text-primary-foreground/60" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
          />
        </div>
      </button>

      {isOpen && category.subcategories?.length > 0 && (
        <div className="mt-2 ml-6 space-y-1">
          {/* All items button */}
          <button
            onClick={() => onSelectSub(null)}
            className={`group relative w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
              !activeSubCat
                ? "bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm"
                : "hover:bg-muted/50"
            }`}
          >
            <span className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-200 ${!activeSubCat ? "bg-primary shadow-sm shadow-primary/30" : "bg-muted-foreground/30 group-hover:bg-primary/50"}`}
              />
              <span
                className={`text-xs font-medium transition-colors ${!activeSubCat ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
              >
                All Items
              </span>
            </span>
            {!activeSubCat && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>
            )}
          </button>

          {/* Individual subcategories */}
          <div className="space-y-0.5">
            {category.subcategories.map((sub: string, index: number) => (
              <button
                key={sub}
                onClick={() => onSelectSub(sub)}
                className={`group relative w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSubCat === sub
                    ? "bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm"
                    : "hover:bg-muted/30"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${activeSubCat === sub ? "bg-primary shadow-sm shadow-primary/30" : "bg-muted-foreground/20 group-hover:bg-primary/40"}`}
                  />
                  <span
                    className={`text-xs font-medium transition-colors ${activeSubCat === sub ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {sub}
                  </span>
                </span>
                {activeSubCat === sub && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN FILTER SIDEBAR COMPONENT ───────────────────────────────────
export default function FilterSidebar({
  categories,
  products,
  activeCat,
  activeSubCat,
  onCatChange,
  onSubCatChange,
  onReset,
}: FilterSidebarProps) {
  const hasFilters = !!activeSubCat;

  const handleSelectCat = (id: string) => {
    onCatChange(activeCat === id ? null : id);
    onSubCatChange(null);
  };

  return (
    <div className="sticky top-24 space-y-6">    
      {/* Categories Card - Only show when not on "All Products" */}
      {activeCat && (
        <div className="bg-card border-2 border-border rounded-2xl p-5 duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/70" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Categories
              </p>
            </div>
            {hasFilters && (
              <button
                onClick={onReset}
                className="text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/10 px-2 py-1 rounded-lg transition-all duration-200"
              >
                Clear all
              </button>
            )}
          </div>

        {/* Active Filters - Only show when subcategory is selected */}
        {hasFilters && (
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Active Filters
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeSubCat && (
                <div className="group inline-flex items-center gap-2 text-xs font-medium bg-background/80 text-foreground border-2 border-border px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    {activeSubCat}
                  </span>
                  <button
                    onClick={() => onSubCatChange(null)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full p-0.5 transition-all duration-200"
                  >
                    <X
                      size={10}
                      className="group-hover:rotate-90 transition-transform duration-200"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Navigation - Show subcategories only when main category is selected from navbar */}
        <nav className="space-y-3">
          {/* Show only the selected category with its subcategories */}
          {activeCat && (() => {
            const selectedCategory = categories.find((cat) => cat.id === activeCat);
            if (!selectedCategory) return null;
            
            return (
              <div className="space-y-3">
                {/* Selected Category Header */}
                <div className="px-1">
                  <div className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-primary-foreground/20">
                      {(() => {
                        const Icon = getIcon(selectedCategory.icon);
                        return <Icon size={15} className="text-primary-foreground" />;
                      })()}
                    </div>
                    <span className="flex-1 text-left font-semibold">
                      {selectedCategory.label}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground">
                      {products.filter((p) => p.category === activeCat).length}
                    </span>
                  </div>
                </div>

                {/* Subcategories */}
                {selectedCategory.subcategories?.length > 0 && (
                  <div className="ml-6 space-y-1">
                    {/* All items button */}
                    <button
                      onClick={() => onSubCatChange(null)}
                      className={`group relative w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        !activeSubCat
                          ? "bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${!activeSubCat ? "bg-primary shadow-sm shadow-primary/30" : "bg-muted-foreground/30 group-hover:bg-primary/50"}`}
                        />
                        <span
                          className={`text-xs font-medium transition-colors ${!activeSubCat ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                        >
                          All Items
                        </span>
                      </span>
                      {!activeSubCat && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        </div>
                      )}
                    </button>

                    {/* Individual subcategories */}
                    <div className="space-y-0.5">
                      {selectedCategory.subcategories.map((sub: string, index: number) => (
                        <button
                          key={sub}
                          onClick={() => onSubCatChange(sub)}
                          className={`group relative w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                            activeSubCat === sub
                              ? "bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm"
                              : "hover:bg-muted/30"
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${activeSubCat === sub ? "bg-primary shadow-sm shadow-primary/30" : "bg-muted-foreground/20 group-hover:bg-primary/40"}`}
                            />
                            <span
                              className={`text-xs font-medium transition-colors ${activeSubCat === sub ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                            >
                              {sub}
                            </span>
                          </span>
                          {activeSubCat === sub && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </nav>
        </div>
      )}
    </div>
  );
}
