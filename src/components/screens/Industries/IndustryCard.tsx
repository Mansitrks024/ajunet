"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useInView from "@/src/hooks/useInView";

interface IndustryCardProps {
  industry: {
    id: string;
    number: string;
    title: string;
    tagline: string;
    short: string;
    tags: string[];
    icon: React.ReactNode;
    stat: string;
    statLabel: string;
  };
  index: number;
}

export default function IndustryCard({ industry, index }: IndustryCardProps) {
  const router = useRouter();
  const [ref, visible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/industries/${industry.id}`)}
      className={`relative cursor-pointer group overflow-hidden rounded-2xl transition-all duration-400 bg-card border border-border
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${hovered ? "shadow-2xl -translate-y-2 border-primary/40" : "shadow-sm hover:shadow-lg"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-400 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Top accent bar with gradient */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/40" />

      {/* Content */}
      <div className="p-6 flex flex-col h-full min-h-64 relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              hovered
                ? "bg-primary text-primary-foreground shadow-lg scale-110"
                : "bg-muted text-foreground border border-border"
            }`}
          >
            <div className="w-6 h-6">{industry.icon}</div>
          </div>
          <span
            className={`font-black text-3xl leading-none select-none transition-all duration-300 ${
              hovered ? "text-primary/40 scale-110" : "text-muted-foreground/20"
            }`}
          >
            {industry.number}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p
            className={`text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${
              hovered ? "text-primary" : "text-primary/80"
            }`}
          >
            {industry.tagline}
          </p>
          <h3
            className={`font-bold text-xl leading-snug mb-3 transition-all duration-300 ${
              hovered ? "text-foreground translate-x-1" : "text-foreground"
            }`}
          >
            {industry.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {industry.short}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {industry.tags.slice(0, 3).map((t: string) => (
            <span
              key={t}
              className={`text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-300 ${
                hovered
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-secondary text-muted-foreground border border-border"
              }`}
            >
              {t}
            </span>
          ))}
          {industry.tags.length > 3 && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded-lg transition-colors duration-300 ${
                hovered ? "text-primary" : "text-muted-foreground/60"
              }`}
            >
              +{industry.tags.length - 3}
            </span>
          )}
        </div>

        {/* Bottom CTA */}
        <div
          className={`flex items-center justify-between mt-5 pt-4 border-t transition-all duration-300 ${
            hovered ? "border-primary/20" : "border-border"
          }`}
        >
          <div>
            <p className="text-foreground font-bold text-base">{industry.stat}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {industry.statLabel}
            </p>
          </div>
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
              hovered
                ? "bg-primary text-primary-foreground shadow-lg scale-110"
                : "bg-secondary text-foreground border border-border"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
