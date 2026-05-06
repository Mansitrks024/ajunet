"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

const PartnerSection = () => {
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
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
              Partner With Us
            </span>
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
          </div>

          {/* Main message */}
          <h2 className="text-md md:text-lg text-foreground mb-6 leading-tight">
            Join hands with{" "}
            <span className="text-primary">Ajunet India Pvt. Ltd.</span> to
            expand your business with high-quality networking products and
            strong backend support.
          </h2>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Primary CTA */}
          <Button
            size="lg"
            className="px-8 py-4 font-semibold tracking-wide shadow-lg shadow-primary/30"
            onClick={() => router.push('/partners')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2L14 5v4c0 3.5-2.5 6.5-6 7.5C4.5 15.5 2 12.5 2 9V5L8 2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 8l2 2 3-3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Become a Distributor
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 font-semibold tracking-wide"
            onClick={() => router.push('/contact')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 4l6 5 6-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Contact Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
