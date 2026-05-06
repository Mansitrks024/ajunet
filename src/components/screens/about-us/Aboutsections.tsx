"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import HeroBackground from "@/src/components/common/HeroBackground";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "500+", label: "Channel Partners" },
  { value: "20+", label: "States Covered" },
  { value: "5000+", label: "Products Delivered" },
];

function CountUp({
  target,
  duration,
}: {
  target: any;
  duration?: number | undefined;
}) {
  const isNumber = !isNaN(parseInt(target));
  const num = parseInt(target);
  const suffix = target.replace(/[0-9]/g, "");
  const [display, setDisplay] = useState(isNumber ? "0" : target);

  useEffect(() => {
    if (!isNumber) return;
    let start: any = null;
    const step = (timestamp: any) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration || 2000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <span>{display}</span>;
}

export default function AboutSections() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);  

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* ── INTRODUCTION SECTION ── */}
      <HeroBackground className="flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div
              className={`text-white ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-8">
                <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
                <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
                  Exclusive National Distributor
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-5 leading-tight">
                Connecting India to{" "}
                <span className="bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">
                  World-Class
                </span>{" "}
                <br className="hidden lg:block" />
                Networking
              </h1>

              <div className="space-y-6 mb-10">
                <p className="text-muted-foreground text-md leading-relaxed">
                  <strong className="text-foreground">
                    Ajunet India Pvt. Ltd.
                  </strong>{" "}
                  is the exclusive National Distributor for{" "}
                  <span className="text-foreground font-semibold bg-primary/20 px-2 py-1 rounded">
                    eWind Technology Co. Ltd.
                  </span>
                  , delivering a complete range of advanced networking products
                  across India.
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  With a strong focus on reliability, performance, and customer
                  satisfaction, we are committed to empowering businesses,
                  system integrators, and channel partners with world-class
                  networking solutions.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="px-8 shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => router.push('/products')}
                >
                  Explore Products
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 font-semibold tracking-wide transition-all duration-200 border-foreground text-foreground hover:bg-muted hover:text-forground"
                  onClick={() => router.push('/contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div
              className={`text-foreground ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700 delay-200`}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-slate-50/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-md border border-primary/20 rounded-2xl p-5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >                   
                    
                    <div className="relative z-10">
                      {/* Number with enhanced styling */}
                      <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent mb-2 group-hover:from-primary group-hover:to-primary/90 transition-all duration-500 transform group-hover:scale-105">
                        <CountUp target={stat.value} duration={2500} />
                      </div>
                      
                      {/* Label with better typography */}
                      <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider leading-tight group-hover:text-foreground/80 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </HeroBackground>

      {/* ── WHO WE ARE SECTION ── */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div
            className={`text-center mb-20 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700 delay-300`}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
              <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
                Who We Are
              </span>
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 max-w-4xl mx-auto leading-tight">
              We Are More Than Just a{" "}
              <span className="text-primary">Distribution Company</span> — We
              Are a <span className="text-primary">Technology Enabler</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-muted-foreground text-md leading-relaxed">
                At Ajunet India, we are more than just a distribution company—we
                are a technology enabler. Our goal is to bridge the gap between
                global innovation and the evolving needs of the Indian market.
              </p>
              <p className="text-muted-foreground text-md leading-relaxed">
                Backed by the cutting-edge portfolio of eWind, we bring
                enterprise-grade networking solutions tailored for industries of
                all sizes, ensuring reliability, performance, and customer
                satisfaction across every corner of India.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
