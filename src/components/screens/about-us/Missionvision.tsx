"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useInView from "@/src/hooks/useInView";

const missionPoints = [
  "Seamless product availability",
  "Reliable performance",
  "Unmatched after-sales support",
];
const visionPoints = [
  "Trusted distribution partner",
  "Value at every step",
  "Innovation-driven growth",
];

export default function MissionVision() {
  const router = useRouter();
  const [ref, visible] = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative bg-white py-16 overflow-hidden">
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-blue-100 opacity-40 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
              Purpose & Direction
            </span>
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
          </div>

          <h2
            className="text-4xl font-bold tracking-tight text-foreground mb-4"
            style={{            
              letterSpacing: "-0.02em",
            }}
          >
            What Drives <span className="text-primary">Ajunet India</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Mission Card */}
          <div
            className={`relative group bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "100ms" }}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-7 h-7"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </div>

            {/* Label */}
            <p className="text-primary/80 text-xs font-bold uppercase tracking-widest mb-2">
              Our Mission
            </p>

            {/* Heading */}
            <h3 className="text-foreground text-2xl font-bold leading-snug mb-4">
              Simplify Networking
              <br />
              Across India
            </h3>

            {/* Divider */}
            <div className="h-px w-12 bg-primary/30 mb-6" />

            {/* Body */}
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              To simplify networking for our partners and customers by ensuring seamless product availability, reliable performance, and unmatched after-sales support.
            </p>

            {/* Pillars */}
            <ul className="flex flex-col gap-3">
              {missionPoints.map((pt, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path
                        d="M2 6l2.5 2.5L10 3.5"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision Card */}
          <div
            className={`relative group bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "250ms" }}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 text-blue-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-7 h-7"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {/* Label */}
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">
              Our Vision
            </p>

            {/* Heading */}
            <h3 className="text-gray-900 text-2xl font-bold leading-snug mb-4">
              India's Most Trusted
              <br />
              Distribution Partner
            </h3>

            {/* Divider */}
            <div className="h-px w-12 bg-blue-200 mb-6" />

            {/* Body */}
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              To become one of India’s most trusted and preferred networking distribution partners by delivering value, reliability, and innovation at every step.
            </p>

            {/* Pillars */}
            <ul className="flex flex-col gap-3">
              {visionPoints.map((pt, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path
                        d="M2 6l2.5 2.5L10 3.5"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-sm font-medium">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom unified strip */}
        <div
          className={`mt-10 rounded-2xl border border-blue-100 bg-blue-50 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-blue-900 text-sm font-medium">
              Driven by purpose. Powered by eWind. Trusted across India.
            </p>
          </div>
          <button 
            onClick={() => router.push('/products')}
            className="flex-shrink-0 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200"
          >
            Learn About Our Products
          </button>
        </div>
      </div>
    </section>
  );
}
