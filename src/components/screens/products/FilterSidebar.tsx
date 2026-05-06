// import { ChevronRight, LayoutGrid, Search } from "lucide-react";
// import { categories, Category, Product, products } from "../../../data/products-data";

// interface FilterSidebarProps {
//   search: string;
//   onSearchChange: (value: string) => void;
//   activeCategory: string;
//   activeSub: string | null;
//   expandedCategory: string | null;
//   onCategoryChange: (id: string) => void;
//   onSubCategoryChange: (sub: string | null) => void;
// }

// export default function FilterSidebar({
//   search,
//   onSearchChange,
//   activeCategory,
//   activeSub,
//   expandedCategory,
//   onCategoryChange,
//   onSubCategoryChange,
// }: FilterSidebarProps) {  

//   const handleCategory = (id: string) => {
//     if (activeCategory === id) {
//       onCategoryChange("all");
//       onSubCategoryChange(null);
//     } else {
//       onCategoryChange(id);
//       onSubCategoryChange(null);
//     }
//   };

//   return (
//     <aside className="w-64 flex-shrink-0">
//       {/* Search */}
//       <div className="relative mb-5">
//         <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
//         />
//       </div>

//       {/* Category Filter */}
//       <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4 shadow-sm">
//         <div className="px-4 py-3 border-b border-border bg-muted/30">
//           <p className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
//             <LayoutGrid className="w-3.5 h-3.5" />
//             Categories
//           </p>
//         </div>
//         <div className="p-2 space-y-1">
//           <button
//             onClick={() => { onCategoryChange("all"); onSubCategoryChange(null); }}
//             className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeCategory === "all" ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "text-muted-foreground hover:bg-muted"}`}
//           >
//             <LayoutGrid className="w-4 h-4" />
//             <span>All Products</span>
//             <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${activeCategory === "all" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
//               {products.length}
//             </span>
//           </button>

//           {categories.map((cat) => {
//             const Icon = cat.icon;
//             const count = products.filter((p) => p.category === cat.id).length;
//             const isActive = activeCategory === cat.id;
//             const isExpanded = expandedCategory === cat.id;
//             return (
//               <div key={cat.id}>
//                 <button
//                   onClick={() => handleCategory(cat.id)}
//                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted"}`}
//                 >
//                   <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-primary/20" : "bg-muted"}`}>
//                     <Icon className="w-4 h-4" />
//                   </div>
//                   <span className="flex-1 text-left leading-tight">{cat.label}</span>
//                   <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
//                     {count}
//                   </span>
//                   <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
//                 </button>

//                 {isExpanded && (
//                   <div className="ml-4 mt-1 mb-2 border-l-2 border-primary/20 pl-3 space-y-1">
//                     {cat.subcategories.map((sub) => (
//                       <button
//                         key={sub}
//                         onClick={() => onSubCategoryChange(activeSub === sub ? null : sub)}
//                         className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${activeSub === sub ? "text-primary bg-primary/10 font-semibold border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
//                       >
//                         {sub}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//     </aside>
//   );
// }


import { ChevronRight, LayoutGrid, Search } from "lucide-react";
import { categories, Category, Product, products } from "../../../data/products-data";

interface FilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  activeSub: string | null;
  expandedCategory: string | null;
  onCategoryChange: (id: string) => void;
  onSubCategoryChange: (sub: string | null) => void;
}

export default function FilterSidebar({
  search,
  onSearchChange,
  activeCategory,
  activeSub,
  expandedCategory,
  onCategoryChange,
  onSubCategoryChange,
}: FilterSidebarProps) {  

  const handleCategory = (id: string) => {
    if (activeCategory === id) {
      onCategoryChange("all");
      onSubCategoryChange(null);
    } else {
      onCategoryChange(id);
      onSubCategoryChange(null);
    }
  };

  return (
    <aside className="w-64 flex-shrink-0">
      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
        />
      </div>

      {/* Category Filter */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4 shadow-sm">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <p className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <LayoutGrid className="w-3.5 h-3.5" />
            Categories
          </p>
        </div>
        <div className="p-2 space-y-1">
          <button
            onClick={() => { onCategoryChange("all"); onSubCategoryChange(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeCategory === "all" ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "text-muted-foreground hover:bg-muted"}`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>All Products</span>
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${activeCategory === "all" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {products.length}
            </span>
          </button>

          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = products.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            const isExpanded = expandedCategory === cat.id;
            return (
              <div key={cat.id}>
                <button
                  onClick={() => handleCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted"}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-primary/20" : "bg-muted"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left leading-tight">{cat.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {count}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 mb-2 border-l-2 border-primary/20 pl-3 space-y-1">
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => onSubCategoryChange(activeSub === sub ? null : sub)}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${activeSub === sub ? "text-primary bg-primary/10 font-semibold border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
    </aside>
  );
}
