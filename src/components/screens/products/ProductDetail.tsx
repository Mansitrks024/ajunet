// import { Product, Category, badgeColors } from "../../../data/products-data";
// import { Button } from "../../ui/button";
// import { ChevronLeft, ChevronRight, Home } from "lucide-react";

// interface ProductDetailProps {
//   product: Product;
//   category: Category | undefined;
//   onBack: () => void;
// }

// export default function ProductDetail({ product, category, onBack }: ProductDetailProps) {
//   const p = product;
//   const cat = category;
//   const CatIcon = cat?.icon;

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Breadcrumb Navigation */}
//       <div className="bg-card border-b border-border">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center gap-2">
//             {/* Back Button */}
//             <Button
//               variant="ghost"
//               onClick={onBack}
//               className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-2"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Back
//             </Button>

//             {/* Breadcrumb Path */}
//             <nav className="flex items-center gap-2 text-sm">
//               <span className="text-muted-foreground/40">|</span>

//               {/* Home / Products */}
//               <button
//                 onClick={onBack}
//                 className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 <Home className="w-3.5 h-3.5" />
//                 <span>Products</span>
//               </button>

//               <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />

//               {/* Category */}
//               {cat && (
//                 <>
//                   <button
//                     onClick={onBack}
//                     className="text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {cat.label}
//                   </button>
//                   <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
//                 </>
//               )}

//               {/* Product Name */}
//               <span className="text-foreground font-medium truncate max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]">
//                 {p.name}
//               </span>
//             </nav>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div>
//             <div className="bg-card rounded-2xl border border-border flex items-center justify-center h-72 mb-4">
//               <div className="text-center">
//                 <div className="text-7xl mb-3">
//                   {CatIcon && <CatIcon className="w-20 h-20 text-primary/60 mx-auto" />}
//                 </div>
//                 <p className="text-muted-foreground text-sm">Product Image</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               {["Front", "Back", "Side"].map((v) => (
//                 <div key={v} className="bg-card rounded-xl border border-border h-20 flex items-center justify-center text-muted-foreground/50 text-xs">{v} View</div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <div className="flex items-start justify-between mb-2">
//               <span className={`text-xs font-semibold px-3 py-1 rounded-full ${p.badge && badgeColors[p.badge] ? badgeColors[p.badge] : badgeColors.default}`}>
//                 {p.badge || p.tag}
//               </span>
//             </div>
//             <h1 className="text-2xl font-bold text-foreground mt-3 mb-1 leading-tight">{p.name}</h1>
//             <p className="text-muted-foreground text-sm mb-6">{p.sub} · {cat?.label}</p>

//             <div className="space-y-3 mb-8">
//               {[
//                 { label: "Ports", value: p.ports },
//                 { label: "PoE Power", value: p.power },
//                 { label: "Standard", value: p.standard },
//                 { label: "Category", value: p.sub },
//                 { label: "Operating Temp", value: "-10°C to 55°C" },
//                 { label: "Dimensions", value: "220 × 140 × 44 mm" },
//                 { label: "Certification", value: "CE, FCC, RoHS" },
//               ].map(({ label, value }) => (
//                 <div key={label} className="flex justify-between py-3 border-b border-border text-sm">
//                   <span className="text-muted-foreground font-medium">{label}</span>
//                   <span className="text-foreground">{value}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex gap-3">
//               <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold py-3 rounded-xl transition-colors">
//                 Request Quote
//               </Button>
//               <Button variant="outline" className="flex-1 border-border hover:bg-muted text-foreground text-sm font-semibold py-3 rounded-xl transition-colors">
//                 Download Datasheet
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 bg-card rounded-2xl border border-border p-8">
//           <h2 className="text-lg font-bold text-foreground mb-4">Key Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               "Plug-and-play, no configuration required",
//               "Built-in surge protection up to 6kV",
//               "IEEE 802.3af/at/bt fully compliant",
//               "Fanless design for silent operation",
//               "Metal housing for extended durability",
//               "LED indicators for real-time monitoring",
//             ].map((f) => (
//               <div key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
//                 <div className="mt-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                   <div className="w-2 h-2 rounded-full bg-primary"></div>
//                 </div>
//                 {f}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { Product, badgeColors, Category } from "../../../data/products-data";
import { categories } from "../../../data/products-data";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight, Home, Download, Mail, Phone, MapPin, Shield, Zap, Package, Star, ArrowRight, Check, Info, Cpu, Thermometer, Ruler, Award, Rocket, VolumeX, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryData {
  id: string;
  label: string;
  subcategories: string[];
}

interface ProductDetailProps {
  product: Product;
  category: CategoryData | undefined;
}

export default function ProductDetail({ product, category }: ProductDetailProps) {
  const router = useRouter();
  const p = product;
  const cat = category;
  const categoryData = categories.find((c: Category) => c.id === cat?.id);
  const CatIcon = categoryData?.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.push('/products')}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {/* Breadcrumb Path */}
            <nav className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground/40">|</span>

              {/* Home / Products */}
              <button
                onClick={() => router.push('/products')}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Products</span>
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />

              {/* Category */}
              {cat && (
                <>
                  <button
                    onClick={() => router.push('/products')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.label}
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                </>
              )}

              {/* Product Name */}
              <span className="text-foreground font-medium truncate max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]">
                {p.name}
              </span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl border border-border shadow-xl overflow-hidden">
              <div className="h-72 flex items-center justify-center relative bg-gradient-to-br from-muted/50 via-primary/5 to-primary/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]"></div>
                <div className="relative text-center">
                  <div className="w-28 h-28 mx-auto mb-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center shadow-lg border border-primary/20">
                    {CatIcon && <CatIcon className="w-14 h-14 text-primary" />}
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Product Preview</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-border">
                    <span className="text-xs font-semibold text-foreground">HD Image</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-card border-t border-border">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((v) => (
                    <div key={v} className="aspect-video bg-muted/50 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer flex items-center justify-center">
                      {CatIcon && <CatIcon className="w-6 h-6 text-primary/40" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${p.badge && badgeColors[p.badge] ? badgeColors[p.badge] : badgeColors.default} shadow-sm`}>
                    {p.badge || p.tag}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-700">4.8</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground border-border hover:bg-muted h-8">
                  <Info className="w-3.5 h-3.5 mr-1.5" />
                  Compare
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2 leading-tight tracking-tight">{p.name}</h1>
              <p className="text-muted-foreground text-base mb-6">{p.sub} · {cat?.label}</p>

              <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl p-6 mb-6 shadow-lg text-primary-foreground">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">{p.ports.split('x')[0] || '8'}</div>
                    <div className="text-xs font-medium opacity-80">Total Ports</div>
                  </div>
                  <div className="w-px bg-white/20"></div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">{p.power.split('W')[0] || '120'}W</div>
                    <div className="text-xs font-medium opacity-80">Power Budget</div>
                  </div>
                  <div className="w-px bg-white/20"></div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">{p.standard.split(' ')[1] || '802.3at'}</div>
                    <div className="text-xs font-medium opacity-80">Standard</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Request Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/50 text-foreground text-sm font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Datasheet
                  </Button>
                  <Button variant="outline" className="border-border hover:bg-muted hover:border-primary/50 text-foreground text-sm font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Technical Specifications
            </h3>
            <div className="space-y-2">
              {[
                { label: "Ports", value: p.ports, icon: Cpu },
                { label: "PoE Power", value: p.power, icon: Zap },
                { label: "Standard", value: p.standard, icon: Shield },
                { label: "Category", value: p.sub, icon: Package },
                { label: "Operating Temp", value: "-10°C to 55°C", icon: Thermometer },
                { label: "Dimensions", value: "220 × 140 × 44 mm", icon: Ruler },
                { label: "Certification", value: "CE, FCC, RoHS", icon: Award },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex justify-between py-2 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {label}
                  </span>
                  <span className="text-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Key Benefits
            </h3>
            <div className="space-y-2">
              {[
                "Enterprise-grade reliability",
                "24/7 technical support included",
                "3-year manufacturer warranty",
                "Free firmware updates",
                "Energy-efficient design",
                "Plug-and-play installation",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm py-1">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-8 py-5 border-b border-border">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Key Features
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { feature: "Plug-and-play, no configuration required", icon: Rocket },
                  { feature: "Built-in surge protection up to 6kV", icon: Zap },
                  { feature: "IEEE 802.3af/at/bt fully compliant", icon: Shield },
                  { feature: "Fanless design for silent operation", icon: VolumeX },
                  { feature: "Metal housing for extended durability", icon: Shield },
                  { feature: "LED indicators for real-time monitoring", icon: Lightbulb },
                ].map(({ feature, icon: Icon }) => (
                  <div key={feature} className="flex items-start gap-4 text-sm bg-muted/30 rounded-2xl p-5 hover:bg-muted/50 transition-all duration-200 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground leading-relaxed font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-primary via-primary/95 to-primary rounded-3xl shadow-xl p-8 text-primary-foreground">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Need help choosing?</h3>
              <p className="text-sm opacity-90">Our experts are ready to assist you in finding the perfect solution for your needs.</p>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
