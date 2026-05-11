"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import * as SwiperModules from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Banner data for hero section
const BANNER_DATA = [
  {
    id: 1,
    type: 'image',
    src: '/img-1.jpg',
    title: 'Advanced Network Solutions',
    subtitle: 'Professional-grade PoE switches and networking equipment',
    cta: 'Contact Us'
  },
  {
    id: 2,
    type: 'video',
    src: '/img-6.mp4',
    title: 'Industrial Strength',
    subtitle: 'Built to withstand harsh environments',
    cta: 'Contact Us'
  },
  {
    id: 3,
    type: 'image',
    src: '/img-2.jpg',
    title: 'Enterprise Connectivity',
    subtitle: 'Scalable solutions for growing businesses',
    cta: 'Contact Us'
  },
  {
    id: 4,
    type: 'video',
    src: '/img-7.mp4',
    title: 'Next-Generation Technology',
    subtitle: 'Cutting-edge networking innovations',
    cta: 'Contact Us'
  },
  {
    id: 5,
    type: 'image',
    src: '/img-3.jpg',
    title: 'Reliable Performance',
    subtitle: '24/7 uptime and exceptional support',
    cta: 'Contact Us'
  }
];

// Banner Slide Component
function BannerSlide({ banner }: { banner: typeof BANNER_DATA[0] }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      {banner.type === 'image' ? (
        <img
          src={banner.src}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={banner.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* <button
            onClick={togglePlayPause}
            className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
          >
            {isPlaying ? (
              <Pause size={20} className="text-slate-700" />
            ) : (
              <Play size={20} className="text-slate-700" />
            )}
          </button> */}
        </div>
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {banner.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {banner.subtitle}
            </p>
            <button 
              onClick={() => router.push('/contact')}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-xl"
            >
              {banner.cta}
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BannerSliderProps {
  className?: string;
}

export default function BannerSlider({ className = "" }: BannerSliderProps) {
  // Inject custom styles for Swiper pagination
  useEffect(() => {
    const styleId = 'swiper-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .hero-swiper .swiper-pagination {
          bottom: 20px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.7) !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 4px !important;
          transition: all 0.3s ease !important;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.2) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section className={`relative ${className}`}>
      <Swiper
        modules={[SwiperModules.Autoplay, SwiperModules.Pagination, SwiperModules.Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        className="hero-swiper"
      >
        {BANNER_DATA.map((banner) => (
          <SwiperSlide key={banner.id}>
            <BannerSlide banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-white to-slate-50 rounded-full shadow-2xl border border-slate-200 flex items-center justify-center hover:shadow-3xl hover:scale-110 transition-all duration-300 group">
        <ChevronLeft size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
      </button>
      <button className="swiper-button-next absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-white to-slate-50 rounded-full shadow-2xl border border-slate-200 flex items-center justify-center hover:shadow-3xl hover:scale-110 transition-all duration-300 group">
        <ChevronRight size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
      </button>
    </section>
  );
}
