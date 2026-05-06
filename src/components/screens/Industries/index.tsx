"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import IndustryCard from "./IndustryCard";
import { industries } from "@/src/data/industries";
import useInView from "@/src/hooks/useInView";
import HeroBackground from "@/src/components/common/HeroBackground";


/* ── Main ── */
export default function Industries() {
  const router = useRouter();
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsRef, statsVisible] = useInView<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* ══ HERO ══ */}
      <HeroBackground className="flex items-center" paddingTop="pt-16" paddingBottom="pb-16">
        <div className="relative max-w-6xl mx-auto px-6 text-center py-16">
          <div
            className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >           

             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-8">
            <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
            <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
               Industries We Serve
            </span>
          </div>
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-5 leading-tight">
              Networking Solutions for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Every Sector
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From telecom towers to factory floors, smart cities to energy
              grids — Ajunet India delivers eWind's enterprise networking to
              every industry that powers India's growth.
            </p>

            <Button
              size="lg"
              className="mt-8"
              onClick={() => router.push('/industries/telecom')}
            >
              Explore Industries
            </Button>
          </div>

          {/* Stat strip */}
          <div
            ref={statsRef}
            className={`mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto transition-all duration-700 delay-300 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {[
              { val: "6", lbl: "Industries", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
              { val: "50+", lbl: "Use Cases", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
              { val: "Pan-India", lbl: "Coverage", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
            ].map((stat, i) => (
              <div
                key={stat.lbl}
                className="group shadow-md relative bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    {/* Value */}
                    <p className="text-xl font-black text-foreground group-hover:text-primary transition-colors duration-300">
                      {stat.val}
                    </p>
                    
                    {/* Label */}
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.lbl}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HeroBackground>

      {/* ══ INDUSTRY GRID ══ */}
      <section className="bg-background pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <IndustryCard
                key={ind.id}
                industry={ind}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
