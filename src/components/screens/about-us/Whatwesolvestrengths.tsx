"use client";

import { useState, useEffect, useRef } from "react";
import { problems, strengths } from "@/src/data/problems_strengths";
import useInView from "@/src/hooks/useInView";

export default function WhatWeSolveStrengths() {
  const [solveRef, solveVisible] = useInView({ threshold: 0.15 });
  const [strengthRef, strengthVisible] = useInView({ threshold: 0.15 });

  return (
    <>
      {/* ── WHAT WE SOLVE ── */}
      <section ref={solveRef} className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}

          <div
            className={`text-center mb-16 transition-all duration-700 ${
              solveVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
              <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
                What We Solve
              </span>
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            </div>

            <h2
              className="text-4xl font-bold tracking-tight text-foreground mb-4"
              style={{             
                letterSpacing: "-0.02em",
              }}
            >
              Real Challenges.{" "}
              <span className="text-primary">Real Solutions.</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
              Every business faces networking hurdles. We exist to eliminate
              them—faster and smarter.
            </p>
          </div>

          {/* Cards — 3 top row + 2 centered bottom */}
          <div className="flex flex-col gap-5">
            {/* Row 1 — 3 cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {problems.slice(0, 3).map((p, i) => (
                <ProblemCard key={p.id} p={p} i={i} visible={solveVisible} />
              ))}
            </div>
            {/* Row 2 — 2 cards centered */}
            <div className="grid sm:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto">
              {problems.slice(3).map((p, i) => (
                <ProblemCard
                  key={p.id}
                  p={p}
                  i={i + 3}
                  visible={solveVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STRENGTHS ── */}
      <section
        ref={strengthRef}
        className="bg-white py-16 relative overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Centered Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${strengthVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
              <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
                Our Strengths
              </span>
              <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              Built on a Foundation of{" "}
              <span className="text-primary">Trust & Scale</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
              Ajunet India's competitive edge comes from years of operational
              excellence, a wide-reaching network, and a deep commitment to our
              partners and customers.
            </p>
          </div>

          {/* Strength Cards */}
          <div className="flex flex-col gap-6">
            {/* Row 1 — 3 cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {strengths.slice(0, 3).map((s, i) => (
                <StrengthCard key={s.title} s={s} visible={strengthVisible} />
              ))}
            </div>
            {/* Row 2 — 2 cards centered */}
            <div className="grid sm:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto">
              {strengths.slice(3).map((s, i) => (
                <StrengthCard key={s.title} s={s} visible={strengthVisible} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StrengthCard({ s, visible }: { s: any; visible: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 cursor-default transition-all duration-500 ${hovered ? "shadow-xl border-primary/40 -translate-y-2" : "shadow-sm"} ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      // style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
    >
      {/* Decorative corner element */}
      {/* <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
        <span className="text-xs font-bold text-primary/60 group-hover:text-primary/80">
          {i + 1}
        </span>
      </div> */}

      {/* Icon with unique styling */}
      <div className="mb-4">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}
        >
          <div className="text-primary">{s.icon}</div>
        </div>
      </div>

      {/* Content with different layout */}
      <div className="space-y-3">
        <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors duration-300">
          {s.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {s.desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className={`mt-4 h-1 bg-gradient-to-r from-primary/30 to-transparent rounded-full transition-all duration-300 ${hovered ? "w-full" : "w-1/3"}`}
      />
    </div>
  );
}

function ProblemCard({ p, i, visible }: { p: any; i: any; visible: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative bg-white border rounded-2xl p-6 overflow-hidden cursor-default transition-all duration-500 ${hovered ? "border-primary/50 shadow-lg shadow-primary/10 -translate-y-1" : "border-border"} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
    >
      {/* Subtle top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Number */}
      <span className="text-6xl font-black text-muted/30 select-none absolute top-3 right-4 leading-none group-hover:text-primary/20 transition-colors duration-300">
        {p.id}
      </span>

      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${hovered ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
      >
        {p.icon}
      </div>

      <h3 className="font-bold text-foreground text-base mb-2 leading-snug">
        {p.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
    </div>
  );
}
