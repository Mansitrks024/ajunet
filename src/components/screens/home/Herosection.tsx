"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import HeroBackground from "@/src/components/common/HeroBackground";
const HeroSection = () => {
  const router = useRouter();
  return (
    <HeroBackground className="flex items-center" paddingTop="pt-32" paddingBottom="pb-32">

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center">
        {/* Badge */}

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-8">
          <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
          <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
            Exclusive National Distributor · eWind Technology Co. Ltd.
          </span>
        </div>


        {/* Headline */}
        <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-5 leading-tight mb-6">
          Empowering India with{" "}
          <span className="bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">
            Advanced Networking
          </span>{" "}
          Solutions
        </h1>

        {/* Sub-headline */}
        <p className="text-[clamp(1rem,2vw,1.2rem)] font-normal text-muted-foreground max-w-[600px] leading-[1.7] mb-4">
          Ajunet India Pvt. Ltd. – The Exclusive National Distributor of eWind
          Technology Co. Ltd. Delivering reliable, scalable, and
          high-performance networking products across India.
        </p>

        {/* Divider line */}
        <div
          className="w-12 h-0.5 rounded-[2px] mb-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
          }}
        />

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-18">
          {/* Primary CTA */}
          <Button 
            size="lg" 
            className="px-8"
            onClick={() => router.push('/products')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="1"
                y="4"
                width="5"
                height="5"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
              <rect
                x="10"
                y="4"
                width="5"
                height="5"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="1"
                y="10"
                width="5"
                height="5"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="10"
                y="10"
                width="5"
                height="5"
                rx="1"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
            Explore Products
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 font-semibold tracking-wide"
            onClick={() => router.push('/partners')}
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
            Become a Partner
          </Button>
        </div>
      </div>
    </HeroBackground>
  );
};

export default HeroSection;
