"use client";

import React, { useEffect, useRef, useState } from "react";
import { reasons, type Reason } from "@/src/data/reasons";

const WhyChooseUs = () => {
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
    <section ref={sectionRef} className="relative overflow-hidden py-16 px-6">
      {/* <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(210,76%,40%) 30%, hsl(210,76%,60%) 50%, hsl(210,76%,40%) 70%, transparent 100%)",
        }}
      /> */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
            <span className="text-md font-bold tracking-[0.1em] uppercase text-primary">
              Why Choose Us
            </span>
            <div className="w-10 h-0.5 bg-primary rounded-[2px]" />
          </div>

          <h2
            className="text-4xl font-bold tracking-tight text-foreground mb-4"
            style={{             
              letterSpacing: "-0.02em",
            }}
          >
            The Ajunet <span className="text-primary">Advantage</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
            Five reasons why India's top ISPs, system integrators, and resellers
            choose Ajunet as their preferred networking partner.
          </p>
        </div>

        {/* Cards — first row: 3, second row: 2 centred */}
        <div className="flex flex-col gap-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.slice(0, 3).map((item, i) => (
              <Card key={i} item={item} index={i} visible={visible} />
            ))}
          </div>

          {/* Row 2 — centred */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
            {reasons.slice(3).map((item, i) => (
              <Card key={i + 3} item={item} index={i + 3} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({
  item,
  index,
  visible,
}: {
  item: (typeof reasons)[0];
  index: number;
  visible: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative rounded-xl border border-border
        p-7 cursor-default overflow-hidden
        hover:border-primary/40
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
        transitionProperty: "opacity, transform, border-color",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Large faded number */}
      <span
        className="absolute top-4 right-5 text-6xl font-black select-none pointer-events-none
          transition-all duration-300 text-muted-foreground/20 group-hover:text-primary/30"
      >
        {item.number}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5
          bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground
          transition-all duration-300"
      >
        {item.icon}
      </div>

      {/* Title */}
      <h3
        className="text-base font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-200"        
      >
        {item.title}
      </h3>

      {/* Desc */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.desc}
      </p>

      {/* Bottom sweep line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-primary origin-left transition-transform duration-500"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
      />
    </div>
  );
};

export default WhyChooseUs;
