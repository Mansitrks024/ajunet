"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { industries, type Industry } from "@/src/data/industries";

const IndustriesWeServe = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleIndustryClick = (industryId: string) => {
    router.push(`/industries/${industryId}`);
  };

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
    <section
      ref={sectionRef}
      className="relative bg-background py-16 px-6 overflow-hidden"
    >
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
              Industries We Serve
            </span>
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
          </div>

          <h2
            className="text-4xl font-bold tracking-tight text-foreground mb-4"
            style={{          
              letterSpacing: "-0.02em",
            }}
          >
            Connecting Every{" "}
            <span className="text-primary">Sector of India</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
            Our networking solutions cater to a wide range of industries.
          </p>
        </div>

        {/* Grid - Compact bullet style */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {industries.map((item, i) => (
              <div
                key={i}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer
                  ${
                    activeIndex === i
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-border bg-card hover:border-primary/30 hover:bg-secondary/50"
                  }
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{
                  transitionDelay: `${i * 60}ms`,
                  transitionProperty:
                    "opacity, transform, border-color, background, box-shadow",
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => handleIndustryClick(item.id)}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${
                      activeIndex === i
                        ? "bg-primary text-white scale-110"
                        : "bg-secondary text-primary group-hover:bg-primary/10"
                    }`}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base font-bold leading-tight transition-colors duration-200 mb-1
                      ${activeIndex === i ? "text-primary" : "text-foreground"}`}                   
                  >
                    {item.title}
                  </h3>
                  <span
                    className={`text-sm transition-colors duration-200 block
                      ${activeIndex === i ? "text-primary/80" : "text-muted-foreground"}`}
                  >
                    {item.stat}
                  </span>
                </div>

                {/* Bullet indicator */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0
                    ${
                      activeIndex === i
                        ? "bg-primary scale-125"
                        : "bg-border group-hover:bg-primary/50"
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
