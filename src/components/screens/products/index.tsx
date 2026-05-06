// "use client";
// import { useState, useEffect, useRef } from "react";
// import {
//   Product,
//   Category,
//   categories,
//   products,
//   tagColors,
//   badgeColors,
// } from "../../../data/products-data";
// import ProductDetail from "./ProductDetail";
// import FilterSidebar from "./FilterSidebar";

// export default function Products() {
//   const [activeCategory, setActiveCategory] = useState<string>("all");
//   const [activeSub, setActiveSub] = useState<string | null>(null);
//   const [search, setSearch] = useState<string>("");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] =
//       Array.from({ length: 38 }, () => ({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.4,
//         vy: (Math.random() - 0.5) * 0.4,
//         r: Math.random() * 2.5 + 1.5,
//       }));

//     let animId: number;
//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const dx = nodes[i].x - nodes[j].x;
//           const dy = nodes[i].y - nodes[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 140) {
//             ctx.beginPath();
//             ctx.moveTo(nodes[i].x, nodes[i].y);
//             ctx.lineTo(nodes[j].x, nodes[j].y);
//             ctx.strokeStyle = `rgba(33, 117, 196, ${0.18 * (1 - dist / 140)})`;
//             ctx.lineWidth = 0.8;
//             ctx.stroke();
//           }
//         }
//       }

//       nodes.forEach((n) => {
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(33, 117, 196, 0.45)";
//         ctx.fill();

//         n.x += n.vx;
//         n.y += n.vy;
//         if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
//         if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
//       });

//       animId = requestAnimationFrame(draw);
//     };
//     draw();

//     const handleResize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const filtered = products.filter((p) => {
//     const catMatch = activeCategory === "all" || p.category === activeCategory;
//     const subMatch = !activeSub || p.sub === activeSub;
//     const searchMatch =
//       !search ||
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.sub.toLowerCase().includes(search.toLowerCase());
//     return catMatch && subMatch && searchMatch;
//   });

//   const handleCategory = (id: string) => {
//     if (activeCategory === id) {
//       setActiveCategory("all");
//       setActiveSub(null);
//       setExpandedCategory(null);
//     } else {
//       setActiveCategory(id);
//       setActiveSub(null);
//       setExpandedCategory(id);
//     }
//   };

//   if (selectedProduct) {
//     const cat = categories.find((c) => c.id === selectedProduct.category);
//     return (
//       <ProductDetail
//         product={selectedProduct}
//         category={cat}
//         onBack={() => setSelectedProduct(null)}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Strip */}
//       <section className="relative overflow-hidden bg-background px-6 py-24">
//         {/* Animated Network Canvas */}
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 w-full h-full opacity-[0.85]"
//         />

//         {/* Radial gradient overlay */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(var(--primary) / 0.22) 0%, transparent 70%)",
//           }}
//         />

//         <div className="relative z-10 max-w-7xl mx-auto">

//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-8">
//             <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
//             <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
//               Product Catalog
//             </span>
//           </div>

//           <h1 className="text-5xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground max-w-[820px] mb-6">
//             Network Equipment
//           </h1>
//           <p className="text-muted-foreground text-sm max-w-xl">
//             We offer a comprehensive range of networking products designed for
//             performance, reliability, and scalability.
//           </p>
//         </div>
//       </section>

//       <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">
//         <FilterSidebar
//           search={search}
//           onSearchChange={setSearch}
//           activeCategory={activeCategory}
//           activeSub={activeSub}
//           expandedCategory={expandedCategory}
//           onCategoryChange={handleCategory}
//           onSubCategoryChange={setActiveSub}
//         />

//         {/* Main Content */}
//         <main className="flex-1 min-w-0">
//           {/* Results Bar */}
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <p className="text-foreground font-semibold">
//                 {filtered.length} Products
//               </p>
//               {(activeCategory !== "all" || activeSub) && (
//                 <div className="flex items-center gap-2 mt-1">
//                   {activeCategory !== "all" && (
//                     <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
//                       {categories.find((c) => c.id === activeCategory)?.label}
//                     </span>
//                   )}
//                   {activeSub && (
//                     <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
//                       {activeSub}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Grid */}
//           {filtered.length === 0 ? (
//             <div className="bg-card rounded-2xl border border-border p-16 text-center">
//               <div className="text-4xl mb-3">🔍</div>
//               <p className="text-muted-foreground text-sm">
//                 No products found. Try adjusting your filters.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//               {filtered.map((p) => {
//                 const cat = categories.find((c) => c.id === p.category);
//                 const CatIcon = cat?.icon;
//                 const tagColor = tagColors[p.tag] || tagColors.default;
//                 const badgeColor = p.badge
//                   ? badgeColors[p.badge] || badgeColors.default
//                   : null;
//                 return (
//                   <div
//                     key={p.id}
//                     onClick={() => setSelectedProduct(p)}
//                     className="bg-card rounded-2xl border border-border hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer group overflow-hidden"
//                   >
//                     {/* Product Image Area */}
//                     <div className="bg-gradient-to-br from-muted to-primary/5 h-36 flex items-center justify-center relative">
//                       <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
//                         {CatIcon && <CatIcon className="w-12 h-12 text-primary/60" />}
//                       </span>
//                       {badgeColor && (
//                         <span
//                           className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-lg ${badgeColor}`}
//                         >
//                           {p.badge}
//                         </span>
//                       )}
//                     </div>

//                     {/* Card Body */}
//                     <div className="p-4">
//                       <div className="flex items-center gap-2 mb-2">
//                         <span
//                           className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColor}`}
//                         >
//                           {p.tag}
//                         </span>
//                       </div>
//                       <h3 className="text-sm font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
//                         {p.name}
//                       </h3>
//                       <div className="space-y-1.5">
//                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                           <svg
//                             className="w-3 h-3 flex-shrink-0 text-muted-foreground/60"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M4 6h16M4 10h16M4 14h16M4 18h16"
//                             />
//                           </svg>
//                           {p.ports}
//                         </div>
//                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                           <svg
//                             className="w-3 h-3 flex-shrink-0 text-muted-foreground/60"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M13 10V3L4 14h7v7l9-11h-7z"
//                             />
//                           </svg>
//                           {p.power}
//                         </div>
//                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                           <svg
//                             className="w-3 h-3 flex-shrink-0 text-muted-foreground/60"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           {p.standard}
//                         </div>
//                       </div>
//                       <div className="mt-4 flex items-center justify-between">
//                         <span className="text-xs text-muted-foreground">
//                           {p.sub}
//                         </span>
//                         <span className="text-xs font-semibold text-primary group-hover:underline">
//                           View Details →
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Star, ArrowRight, Cpu, Zap, Shield } from "lucide-react";
import {
  Product,
  Category,
  categories,
  products,
  tagColors,
  badgeColors,
} from "../../../data/products-data";
import FilterSidebar from "./FilterSidebar";

export default function Products() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
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

  const filtered = products.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const subMatch = !activeSub || p.sub === activeSub;
    const searchMatch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sub.toLowerCase().includes(search.toLowerCase());
    return catMatch && subMatch && searchMatch;
  });

  const handleCategory = (id: string) => {
    if (activeCategory === id) {
      setActiveCategory("all");
      setActiveSub(null);
      setExpandedCategory(null);
    } else {
      setActiveCategory(id);
      setActiveSub(null);
      setExpandedCategory(id);
    }
  };

  
  return (
    <div className="min-h-screen bg-background">
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

      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">
        <FilterSidebar
          search={search}
          onSearchChange={setSearch}
          activeCategory={activeCategory}
          activeSub={activeSub}
          expandedCategory={expandedCategory}
          onCategoryChange={handleCategory}
          onSubCategoryChange={setActiveSub}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Results Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-foreground font-semibold text-lg">
                {filtered.length} Products
              </p>
              {(activeCategory !== "all" || activeSub) && (
                <div className="flex items-center gap-2 mt-2">
                  {activeCategory !== "all" && (
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium border border-primary/20">
                      {categories.find((c) => c.id === activeCategory)?.label}
                    </span>
                  )}
                  {activeSub && (
                    <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">
                      {activeSub}
                    </span>
                  )}
                </div>
              )}
            </div>           
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Try adjusting your filters or search terms.
              </p>
              <Button 
                onClick={() => { setActiveCategory("all"); setActiveSub(null); setSearch(""); }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => {
                const cat = categories.find((c) => c.id === p.category);
                const CatIcon = cat?.icon;
                const tagColor = tagColors[p.tag] || tagColors.default;
                const badgeColor = p.badge
                  ? badgeColors[p.badge] || badgeColors.default
                  : null;
                return (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/products/${p.id}`)}
                    className="bg-card rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden hover:-translate-y-1"
                  >
                    {/* Product Image Area */}
                    <div className="bg-gradient-to-br from-muted via-primary/5 to-primary/10 h-40 flex items-center justify-center relative">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {CatIcon && <CatIcon className="w-16 h-16 text-primary/60" />}
                      </span>
                      {badgeColor && (
                        <span
                          className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg ${badgeColor} shadow-sm`}
                        >
                          {p.badge}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor}`}
                        >
                          {p.tag}
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Cpu className="w-3 h-3 text-primary" />
                          </div>
                          {p.ports}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Zap className="w-3 h-3 text-primary" />
                          </div>
                          {p.power}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="w-3 h-3 text-primary" />
                          </div>
                          {p.standard}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <span className="text-xs text-muted-foreground font-medium">
                          {p.sub}
                        </span>
                        <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                          View Details
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
