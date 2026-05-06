"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import GetStarted from "./GetStarted";
import useInView from "@/src/hooks/useInView";
import HeroBackground from "@/src/components/common/HeroBackground";
import { benefits, brands, brandColors } from "@/src/data/partners-data";
import { iconMap } from "@/src/components/common/icons";

/* ─── Main Page ─── */
export default function Partners() {
  const router = useRouter();
  const [heroVisible, setHeroVisible] = useState(false);
  const [benefitsRef, benefitsVisible] = useInView();
  const [brandsRef, brandsVisible] = useInView();

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* ══ HERO ══ */}
      <HeroBackground className="flex items-center">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className={`${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-8">
              <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
              <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
                Partner With Us
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-5 leading-tight">
              Grow Your Business{" "}
              <span className="bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">
                With Ajunet
              </span>{" "}
              <br className="hidden lg:block" />
              India
            </h1>        

            <div className="space-y-6 mb-10">
              <p className="text-muted-foreground text-md leading-relaxed">
                Join hands with  <strong className="text-foreground">Ajunet India Pvt. Ltd.</strong> to expand your business with high-quality networking products and strong backend support.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                At Ajunet India, we believe in growing together. Whether you are a reseller, system integrator, or enterprise customer, we are here to support your networking needs with the right products, the right pricing, and the right support.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Become a Distributor
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 font-semibold tracking-wide transition-all duration-200 border-foreground text-foreground hover:bg-muted hover:text-foreground"
                onClick={() => router.push('/about-us')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </HeroBackground>

      {/* ══ BENEFITS ══ */}
      <section ref={benefitsRef} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-14 transition-all duration-700 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >

            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
              <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
                Why Partner With Us
              </span>
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Benefits Built for{" "}
              <span className="text-primary">Real Growth</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className={`group bg-card border border-border hover:border-primary/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center mb-5 transition-all duration-300">
                  {React.createElement(iconMap[b.icon])}
                </div>
                {/* Stat badge */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-black text-primary">
                    {b.stat}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {b.statLabel}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">
                  {b.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BRANDS ══ */}
      <section ref={brandsRef} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-14 transition-all duration-700 ${brandsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >

            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
              <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
                Our Brands
              </span>
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Portfolio You Can{" "}
              <span className="text-primary">Sell Confidently</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Access a curated lineup of globally trusted networking brands —
              all under one distribution roof.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((b, i) => (
              <div
                key={b.name}
                className={`group relative bg-card border border-border hover:border-primary/20 rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-md transition-all duration-400 hover:-translate-y-0.5 ${brandsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{
                  transitionDelay: `${i * 60}ms`,
                  transitionDuration: "500ms",
                }}
              >
                {/* Logo placeholder */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-base font-black mb-3 ${brandColors[i % brandColors.length]}`}
                >
                  {b.abbr}
                </div>
                <p className="font-bold text-foreground text-sm leading-snug mb-1">
                  {b.name}
                </p>
                <span className="text-xs text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-full">
                  {b.category}
                </span>
                {/* Hover arrow */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary">
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 11.707a1 1 0 010-1.414L8.586 6H3a1 1 0 110-2h8a1 1 0 011 1v8a1 1 0 11-2 0V7.414l-4.293 4.293a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll marquee strip */}
          <div className="mt-12 overflow-hidden border-y border-border py-4">
            <div className="flex gap-10 animate-[slide_20s_linear_infinite] whitespace-nowrap">
              {[...brands, ...brands].map((b, i) => (
                <span
                  key={i}
                  className="text-muted-foreground font-black text-sm tracking-widest uppercase flex-shrink-0"
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>

          <style>{`@keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>
      </section>

      {/* Get Started */}
      <GetStarted />
    </div>
  );
}
