"use client";
import React, { useEffect, useRef, useState } from "react";
import SendMessage from "./SendMessage";
import { Button } from "@/src/components/ui/button";
import useInView from "@/src/hooks/useInView";
import { contactDetails, socialLinks } from "@/src/data/contact-data";
import { contactIconMap } from "@/src/components/common/icons";

/* ── Main Page ── */
export default function Contact() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [infoRef, infoVisible] = useInView({ threshold: 0.2 });
  const [mapRef, mapVisible] = useInView({ threshold: 0.2 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

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
    <div className="bg-background text-foreground">
      {/* ══ HERO ══ */}
      <section className="relative bg-background overflow-hidden py-32 flex items-center">
        {/* Animated Network Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[0.85]" />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(var(--primary) / 0.22) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-6">
              <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
              <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
                Contact Us
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-5 leading-tight">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Whether you're looking for product information, pricing, support,
              or partnership — our team is here to help.
            </p>
          </div>

          {/* Quick contact pills */}
          <div
            className={`flex flex-wrap justify-center gap-3 mt-8 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {contactDetails.filter(c => c.href && (c.icon === 'phone' || c.icon === 'email')).map((c, i) => (
              <Button
              variant="outline"
                key={c.icon}
                asChild
                className={`inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-200 ${c.icon === 'phone'
                  ? 'bg-card text-foreground hover:bg-muted hover:text-foreground border-border'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary'
                  }`}
              >
                <a href={c.href!}>
                  <div className="w-4 h-4 text-current">
                    {React.createElement(contactIconMap[c.icon])}
                  </div>
                  {c.value}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORM + INFO ══ */}
      <section ref={infoRef} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Form — spans 3 cols */}
            <div
              className={`lg:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all duration-700 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-8 h-0.5 bg-primary rounded-[2px]" />
                  <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-1">
                    Send a Message
                  </p>
                  <div className="w-8 h-0.5 bg-primary rounded-[2px]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  How Can We Help You?
                </h2>
              </div>


              {/* Send a Message Section */}
              <SendMessage />
            </div>

            {/* Contact details — spans 2 cols */}
            <div
              className={`lg:col-span-2 flex flex-col gap-4 transition-all duration-700 delay-200 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {contactDetails.map((c, i) => (
                <div
                  key={i}
                  className="group bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md rounded-2xl p-5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-700 text-blue-700 group-hover:text-white flex items-center justify-center transition-all duration-300">
                      {React.createElement(contactIconMap[c.icon])}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-0.5">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="text-gray-900 font-bold text-sm hover:text-blue-700 transition-colors duration-200"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-bold text-sm">
                          {c.value}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                        {c.sub}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <Button
                      key={s.label}
                      title={s.label}
                      className={`w-9 h-9 rounded-xl bg-gray-100 ${s.color} hover:text-white text-gray-600 text-xs font-bold flex items-center justify-center transition-all duration-200`}
                    >
                      {s.icon}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GOOGLE MAP ══ */}
      <section ref={mapRef} className="bg-muted/50 py-0">
        <div
          className={`transition-all duration-700 ${mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Map header bar */}
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-8 h-0.5 bg-primary rounded-[2px]" />
                  <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">
                    Our Location
                  </p>
                  <div className="w-8 h-0.5 bg-primary rounded-[2px]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Find Us on the Map
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  123, Business Hub, Andheri East, Mumbai – 400069
                </p>
              </div>
              
              <Button
                asChild
              >
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </div>

          {/* Map embed */}
          <div className="relative w-full h-80 lg:h-96 bg-gray-100 overflow-hidden border-y border-gray-200">
            <iframe
              title="Ajunet India Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9259768787236!2d72.84736!3d19.11711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b888ae67fd%3A0x83df71a1e54e9a85!2sAndheri%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map overlay pin card */}
            <div className="absolute bottom-5 left-5 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-xs">
                  Ajunet India Pvt. Ltd.
                </p>
                <p className="text-gray-400 text-xs">Andheri East, Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
