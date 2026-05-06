"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { industries, type Industry } from "@/src/data/industries";
import useInView from "@/src/hooks/useInView";

interface IndustryDetailProps {
  industryId: string;
}

export default function IndustryDetail({ industryId }: IndustryDetailProps) {
  const [heroVisible, setHeroVisible] = useState(false);
  const [overviewRef, overviewVisible] = useInView<HTMLDivElement>();
  const [challengesRef, challengesVisible] = useInView<HTMLDivElement>();
  const [solutionsRef, solutionsVisible] = useInView<HTMLDivElement>();
  const [productsRef, productsVisible] = useInView<HTMLDivElement>();
  const [ctaRef, ctaVisible] = useInView<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

  const industry = industries.find((i) => i.id === industryId) || industries[0];
  const currentIndex = industries.findIndex((i) => i.id === industryId);
  const prev = industries[currentIndex - 1];
  const next = industries[currentIndex + 1];

 useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] =
      Array.from({ length: 35 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1.5,
      }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(33, 117, 196, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(33, 117, 196, 0.4)";
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* ══ HERO ══ */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/3 overflow-hidden">
        {/* Animated Network Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[0.7]" />;
        
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 text-xs mb-10 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <span className="text-muted-foreground/50">/</span>
            <Link href="/industries" className="text-muted-foreground hover:text-foreground transition-colors">Industries</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground font-medium">{industry.title}</span>
          </nav>

          {/* Hero Content */}
          <div className={`transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-12">
              {/* Left: Title & Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <div className="w-8 h-8 text-primary">{industry.icon}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">                   
                    <span className="text-xs font-bold text-primary tracking-wide">{industry.number} / 06</span>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-tight mb-4">
                  {industry.title}
                </h1>
                <p className="text-md text-muted-foreground font-medium max-w-2xl">
                  {industry.tagline}
                </p>
              </div>

              {/* Right: Stats */}
              <div className="flex gap-3">
                {[
                  { 
                    val: industry.stat, 
                    lbl: industry.statLabel, 
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )
                  },
                  { 
                    val: industry.products.length, 
                    lbl: "Products", 
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    )
                  },
                  { 
                    val: industry.solutions.length, 
                    lbl: "Solutions", 
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                ].map(({ val, lbl, icon }) => (
                  <div key={lbl} className="group relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border rounded-2xl px-5 py-4 text-center min-w-[110px] hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    <div className="relative">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors duration-300">
                        <div className="text-primary">{icon}</div>
                      </div>
                      <p className="text-xl font-black text-primary group-hover:scale-105 transition-transform duration-300">{val}</p>
                      <p className="text-xs text-muted-foreground font-medium mt-2 uppercase tracking-wide">{lbl}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry Navigation */}
          <div className={`flex gap-1 overflow-x-auto pb-0 scrollbar-hide transition-all duration-700 delay-200 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
            {industries.map((ind: Industry) => (
              <Link
                key={ind.id}
                href={`/industries/${ind.id}`}
                className={`flex-shrink-0 px-5 py-3 rounded-t-lg text-sm font-semibold transition-all duration-200 border-t border-l border-r
                  ${industryId === ind.id
                    ? "bg-muted text-foreground border-border"
                    : "bg-background/50 text-muted-foreground border-border/50 hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                <span className="opacity-50 mr-2">{ind.number}</span>
                {ind.title.split(" & ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ══ */}
      <section className="bg-muted/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Content - 8 cols */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Overview Card */}
              <div
                ref={overviewRef}
                className={`bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 border border-border shadow-md hover:shadow-lg transition-all duration-700 ${overviewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/10 border border-primary/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Overview</h2>
                    <p className="text-sm text-muted-foreground font-medium">Industry insights</p>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                  <p className="text-foreground/90 text-base leading-relaxed">
                    {industry.overview}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground uppercase tracking-wide">Focus Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.tags.map((t) => (
                      <span key={t} className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges */}
              <div ref={challengesRef} className={`transition-all duration-700 delay-100 ${challengesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive/15 to-destructive/10 border border-destructive/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-destructive">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Industry Challenges</h2>
                    <p className="text-sm text-muted-foreground font-medium">Key obstacles</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {industry.challenges.map((c, i) => (
                    <div key={i} className="flex items-start gap-4 bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl p-5 shadow-md hover:shadow-lg hover:border-destructive/30 transition-all duration-300">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-destructive">{String(i + 1).padStart(2, "0")}</span>
                      </span>
                      <p className="text-foreground/90 text-sm leading-relaxed pt-1 font-medium">{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div ref={solutionsRef} className={`transition-all duration-700 delay-150 ${solutionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/10 border border-primary/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Our Solutions</h2>
                    <p className="text-sm text-muted-foreground font-medium">Tailored approaches</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {industry.solutions.map((s, i) => (
                    <div key={i} className="flex items-start gap-4 bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl p-5 shadow-md group hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-sm font-bold text-primary-foreground">{String(i + 1).padStart(2, "0")}</span>
                      </span>
                      <p className="text-foreground/95 text-sm leading-relaxed pt-1 font-medium group-hover:text-foreground transition-colors">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 pt-4">
                {prev && (
                  <Link href={`/industries/${prev.id}`} className="flex-1 group">
                    <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-muted-foreground group-hover:text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Previous Industry</p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{prev.title}</p>
                      </div>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link href={`/industries/${next.id}`} className="flex-1 group">
                    <div className="flex items-center justify-end gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Next Industry</p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{next.title}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-muted-foreground group-hover:text-primary">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Sidebar - 4 cols */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Products Card */}
              <div ref={productsRef} className={`bg-card rounded-3xl border border-border shadow-sm overflow-hidden transition-all duration-700 ${productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="bg-primary px-6 py-5">
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-primary-foreground/70">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <h3 className="text-sm font-bold text-primary-foreground/90 uppercase tracking-wide">Products</h3>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {industry.products.map((p, i) => (
                    <div key={i} className="p-5 hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{p.name}</h4>
                          <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
                        </div>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 transition-colors">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div ref={ctaRef} className={`bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 relative overflow-hidden transition-all duration-700 delay-200 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6 backdrop-blur-sm border border-primary-foreground/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8 text-primary-foreground">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.081.852l1.91 7.629a2.25 2.25 0 01-.658 2.16l-2.506 2.085a12.75 12.75 0 006.655 6.655l2.085-2.506a2.25 2.25 0 012.16-.658l7.629 1.91c.501.115.852.565.852 1.081V19.5a2.25 2.25 0 01-2.25 2.25h-2.25" />
                    </svg>
                  </div>
                  
                  <h3 className="text-primary-foreground font-black text-2xl leading-tight mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-primary-foreground/90 text-base leading-relaxed mb-6">
                    Get expert consultation and discover the perfect networking solution for your {industry.title.toLowerCase()} needs.
                  </p>
                  
                  <Button
                    size="lg"
                    className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-bold py-4 rounded-xl transition-all duration-300 text-base tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    Connect with Our Experts
                  </Button>
                  
                  <p className="text-center text-xs text-primary-foreground/70 mt-4 font-medium">
                    No commitment • Free assessment • Response within 24 hours
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
