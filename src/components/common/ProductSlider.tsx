"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star, Shield, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "../../data/products-data";

interface ProductSliderProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  slidesPerView?: number;
  spaceBetween?: number;
}

function getSlug(product_url: string) {
  if (!product_url) return "#";
  const parts = product_url.split("/product/");
  return parts[1] ? `/products/${parts[1].replace(/\/$/, "")}` : "#";
}

const TAG_STYLES: Record<
  string,
  {
    bg: string;
    text: string;
    dot: string;
    stripe: string;
    specBg: string;
    specIcon: string;
    gradient: string;
  }
> = {
  Commercial: {
    bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    stripe: "bg-gradient-to-r from-blue-500 to-cyan-500",
    specBg: "bg-blue-50",
    specIcon: "text-blue-700",
    gradient: "from-blue-500 to-cyan-500",
  },
  Industrial: {
    bg: "bg-gradient-to-r from-amber-50 to-orange-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    stripe: "bg-gradient-to-r from-amber-500 to-orange-500",
    specBg: "bg-amber-50",
    specIcon: "text-amber-700",
    gradient: "from-amber-500 to-orange-500",
  },
  Enterprise: {
    bg: "bg-gradient-to-r from-violet-50 to-purple-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
    stripe: "bg-gradient-to-r from-violet-500 to-purple-500",
    specBg: "bg-violet-50",
    specIcon: "text-violet-700",
    gradient: "from-violet-500 to-purple-500",
  },
  Managed: {
    bg: "bg-gradient-to-r from-emerald-50 to-teal-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    stripe: "bg-gradient-to-r from-emerald-500 to-teal-500",
    specBg: "bg-emerald-50",
    specIcon: "text-emerald-700",
    gradient: "from-emerald-500 to-teal-500",
  },
  default: {
    bg: "bg-gradient-to-r from-slate-50 to-gray-50",
    text: "text-slate-700",
    dot: "bg-slate-500",
    stripe: "bg-gradient-to-r from-slate-500 to-gray-500",
    specBg: "bg-slate-50",
    specIcon: "text-slate-700",
    gradient: "from-slate-500 to-gray-500",
  },
};

function SliderProductCard({ product }: { product: Product }) {
  const slug = getSlug(product.product_url);
  const specs = product.specs || {};
  const ports =
    specs["Fixed Port"] || specs["PoE Port"] || product.ports || null;
  const tagStyle = TAG_STYLES[product.tag || "default"] || TAG_STYLES.default;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={slug}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="relative h-full flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-500 hover:border-slate-200 hover:shadow-lg hover:-translate-y-1">
        {/* Colored gradient stripe — appears on hover */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${tagStyle.stripe} opacity-0 group-hover:opacity-100 transition-all duration-500 z-10`}
        />

        {/* Image zone with gradient overlay */}
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 h-48 flex items-center justify-center overflow-hidden">
          {/* Animated gradient overlay on hover */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-700 bg-gradient-to-br ${tagStyle.gradient}`}
          />

          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title || product.name}
              className="w-auto w-full h-full object-contain relative z-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center gap-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <div className="w-8 h-8 bg-slate-300 rounded-lg" />
              <span className="text-[10px] font-medium text-slate-400">
                No Image
              </span>
            </div>
          )}

          {/* Badge with animation */}
          {product.badge && (
            <span className="absolute top-3 right-3 z-20 text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              {product.badge}
            </span>
          )}

          {/* Floating indicators */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {product.tag && (
              <div className={`inline-flex items-center gap-2 text-[10px] font-medium px-3 py-1.5 rounded-full ${tagStyle.bg} ${tagStyle.text} shadow-lg backdrop-blur-sm`}>
                <div className={`w-2 h-2 rounded-full ${tagStyle.dot} animate-pulse`} />
                {product.tag}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced body */}
        <div className="flex flex-col flex-1 p-5 gap-3 bg-gradient-to-b from-white to-slate-50">
          {/* Model and rating */}
          <div className="flex items-center justify-between gap-2">
            {product.model && (
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg truncate max-w-[120px]">
                {product.model}
              </span>
            )}

          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300 flex-1 truncate max-w-[220px]">
            {product.title || product.name}
          </h3>

          {/* Enhanced CTA */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100">
            <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
              View Details
            </span>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              <ArrowUpRight
                size={14}
                className="text-white transition-transform duration-300 group-hover:rotate-45"
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProductSlider({
  products,
  title = "Featured Products",
  subtitle = "Discover our most popular networking solutions",
  slidesPerView = 4,
  spaceBetween = 24,
}: ProductSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-16">
        <div className="animate-pulse">
          <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-80 mb-3"></div>
          <div className="h-5 bg-slate-200 rounded-xl w-96 mb-12"></div>
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-50 rounded-xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced header */}
        <div className="text-center mb-12">       
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/12 mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-primary inline-block shadow-[0_0_0_3px_hsl(var(--primary)_/_0.25)] animate-pulse" />
            <span className="text-[13px] font-medium tracking-[0.06em] text-primary/80 uppercase">
              {title}
            </span>
          </div>
          <p className="text-slate-600 text-md max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Enhanced Swiper container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={800}
            effect="slide"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: slidesPerView,
                spaceBetween: spaceBetween,
              },
            }}
            className="!pb-16 featured-slider"
          >
            {products.map((product) => (
              <SwiperSlide key={`${product.product_id}-${product.product_url}`}>
                <div className="h-full">
                  <SliderProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Enhanced navigation buttons */}
          <button className="swiper-button-prev-custom absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-white to-slate-50 rounded-full shadow-2xl border border-slate-200 flex items-center justify-center hover:shadow-3xl hover:scale-110 transition-all duration-300 group">
            <ChevronLeft size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
          </button>
          <button className="swiper-button-next-custom absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-white to-slate-50 rounded-full shadow-2xl border border-slate-200 flex items-center justify-center hover:shadow-3xl hover:scale-110 transition-all duration-300 group">
            <ChevronRight size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}
