"use client";

import React, { useEffect, useRef, useState } from "react";

const FeaturedBrand = () => {
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

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section header */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-0.5 bg-primary rounded-sm" />
            <span className="text-sm font-bold tracking-widest uppercase text-primary">
              Featured Brand
            </span>
            <div className="w-10 h-0.5 bg-primary rounded-sm" />
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            eWind Technology Co. Ltd. – A global leader in innovative networking
            solutions.
          </p>
        </div>

        {/* Brand features */}
        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-600"
              >
                <path
                  d="M12 2L2 7v10c0 5.5 3.8 10.5 10 12 6.2-1.5 10-6.5 10-12V7L12 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2 font-sora">
              Premium Quality
            </h3>
            <p className="text-sm text-muted-foreground">
              Industry-leading networking equipment with rigorous quality
              standards
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-green-600"
              >
                <path
                  d="M22 12h-4l-3 9L9 3l-3 9H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2 font-sora">
              Innovation First
            </h3>
            <p className="text-sm text-muted-foreground">
              Cutting-edge technology designed for tomorrow's connectivity needs
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-purple-600"
              >
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2 font-sora">
              Trusted Partner
            </h3>
            <p className="text-sm text-muted-foreground">
              Exclusive distribution partnership ensuring reliable supply chain
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrand;
