"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

const AboutSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-background px-8 py-16 relative overflow-hidden"
    >      

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT — Text content */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
            }}
          >
            {/* Section label */}
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
              <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
                Who We Are
              </span>
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            </div>

            {/* Headline */}
            <h2 className="text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-5">
              India's Trusted Bridge to{" "}
              <span className="text-primary">Global Networking Technology</span>
            </h2>

            {/* Body */}
            <p className="text-base leading-[1.8] text-muted-foreground mb-4">
              Ajunet India Pvt. Ltd. is a leading technology distribution
              company specializing in networking solutions. As the{" "}
              <strong className="text-foreground font-semibold">
                the exclusive national distributor of eWind Technology Co. Ltd.
              </strong>
              , we bring world-class networking products to businesses, system
              integrators, and resellers across India.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground mb-9">
              With a strong distribution network, technical expertise, and
              customer-first approach, we ensure seamless connectivity solutions
              for enterprises of all sizes.
            </p>

            {/* CTA */}
            <Button
              size="lg"
              className="tracking-[0.01em] hover:-translate-y-0.5"
              onClick={() => router.push('/about-us')}
            >
              Learn More
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

          {/* RIGHT — Image */}
          <div
            className="relative w-full h-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <img
              src="/about-us.png"
              alt="About Ajunet India"
              className="w-full h-auto rounded-lg shadow-lg"
              style={{
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
