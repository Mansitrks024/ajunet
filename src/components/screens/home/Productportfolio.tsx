"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { products } from "@/src/data/products-data";
import { Layers, Factory, Globe, Zap, Wrench, Wifi } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Helper function to get Lucide icon based on category
const getCategoryIcon = (category: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    "poe-switch": Layers,
    "industrial-poe": Factory,
    "ethernet": Globe,
    "poe-injector": Zap,
    "accessories": Wrench,
    "wifi": Wifi,
  };
  return iconMap[category] || Layers;
};

// Helper function to render Lucide icon
const renderIcon = (IconComponent: LucideIcon) => {
  return <IconComponent size={28} />;
};

const ProductPortfolio = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 px-6 overflow-hidden">
      {/* Decorative top border accent */}
      {/* <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(210,76%,40%) 30%, hsl(210,76%,60%) 50%, hsl(210,76%,40%) 70%, transparent 100%)",
        }}
      /> */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
              Product Portfolio
            </span>
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
          </div>
          <h2
            className="text-4xl font-bold tracking-tight text-foreground mb-4"
            style={{          
              letterSpacing: "-0.02em",
            }}
          >
            Built for Every Network,{" "}
            <span className="text-primary">Every Scale</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            We offer a comprehensive range of networking products designed for
            performance, reliability, and scalability.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {products.slice(0, 6).map((product, i) => {
            const IconComponent = getCategoryIcon(product.category);
            return (
              <div
                key={product.id}
                className={`group relative bg-card border border-border rounded-xl p-6 cursor-pointer
                    hover:border-primary/40 hover:shadow-lg transition-all duration-300
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  transitionProperty:
                    "opacity, transform, box-shadow, border-color",
                }}
              >
                {/* Featured badge */}
                {product.badge && (
                  <div className="absolute -top-3 left-5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground tracking-wide">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Top row: icon + tag */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-primary
                        bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground
                        transition-all duration-300"
                  >
                    {renderIcon(IconComponent)}
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground border border-border px-2.5 py-1 rounded-full">
                    {product.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-200"               
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {product.ports} • {product.power}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`flex justify-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="hover:-translate-y-0.5"
            onClick={() => router.push('/products')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect
                x="1"
                y="1"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <rect
                x="11"
                y="1"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <rect
                x="1"
                y="11"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <rect
                x="11"
                y="11"
                width="6"
                height="6"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            View Full Product Range
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductPortfolio;
