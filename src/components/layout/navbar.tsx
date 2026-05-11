"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { ChevronDown, Layers, Factory, Globe, Zap, Wrench, Wifi } from "lucide-react";
import { categories } from "@/src/data/products-data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get current active category from URL
  const activeCategory = searchParams.get("category");

  const iconMap: Record<string, any> = {
    Layers,
    Factory,
    Globe,
    Zap,
    Wrench,
    Wifi,
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className="fixed top-0 w-full bg-card shadow-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <span className="text-primary-foreground font-bold text-xl">AJ</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                AJUNet
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className={`${pathname === "/" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group`}
              >
                Home
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${pathname === "/" ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100 transition-transform duration-300`}></span>
              </Link>
              <Link
                href="/about-us"
                className={`${pathname === "/about-us" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group`}
              >
                About Us
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${pathname === "/about-us" ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100 transition-transform duration-300`}></span>
              </Link>
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`${pathname.startsWith("/products") ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group flex items-center gap-1`}
                >
                  Products
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isProductsDropdownOpen ? "rotate-180" : ""}`}
                  />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${pathname.startsWith("/products") ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100 transition-transform duration-300`}></span>
                </button>

                {/* Dropdown Menu */}
                {isProductsDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-72 bg-card border-2 border-border rounded-2xl shadow-xl shadow-primary/5 overflow-hidden z-[60] pt-2">
                    <div className="p-3 space-y-1">
                      <Link
                        href="/products"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          !activeCategory && pathname === "/products"
                            ? "bg-gradient-to-r from-primary/5 to-primary/10 text-primary"
                            : "hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary"
                        }`}
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          !activeCategory && pathname === "/products"
                            ? "bg-primary/10"
                            : "bg-muted group-hover:bg-primary/10"
                        }`}>
                          <Layers size={16} className={`transition-colors duration-200 ${
                            !activeCategory && pathname === "/products"
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          }`} />
                        </div>
                        <span>All Products</span>
                      </Link>
                      {categories.map((category) => {
                        const Icon = iconMap[category.icon] || Layers;
                        return (
                          <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                              activeCategory === category.id
                                ? "bg-gradient-to-r from-primary/5 to-primary/10 text-primary"
                                : "hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary"
                            }`}
                            onClick={() => setIsProductsDropdownOpen(false)}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                              activeCategory === category.id
                                ? "bg-primary/10"
                                : "bg-muted group-hover:bg-primary/10"
                            }`}>
                              <Icon size={16} className={`transition-colors duration-200 ${
                                activeCategory === category.id
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-primary"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <span className="block">{category.label}</span>
                              <span className={`block text-xs ${
                                activeCategory === category.id
                                  ? "text-primary/70"
                                  : "text-muted-foreground group-hover:text-primary/70"
                              }`}>
                                {category.subcategories.length} subcategories
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/industries"
                className={`${pathname === "/industries" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group`}
              >
                Industries
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${pathname === "/industries" ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100 transition-transform duration-300`}></span>
              </Link>
              <Link
                href="/partners"
                className={`${pathname === "/partners" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group`}
              >
                Partners
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${pathname === "/partners" ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100 transition-transform duration-300`}></span>
              </Link>
              <Link
                href="/contact"
                className={`${pathname === "/contact" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group`}
              >
                Contact
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${pathname === "/contact" ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100 transition-transform duration-300`}></span>
              </Link>
            </div>
          </div>
          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/partners">
                Become a Partner
              </Link>
            </Button>
          </div>
          {/* CTA Button & Mobile menu button */}
          <div className="flex items-center space-x-4">


            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`${pathname === "/about-us" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
            >
              About Us
            </Link>
            <div>
              <button
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                className={`${pathname.startsWith("/products") ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
              >
                <span>Products</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isProductsDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isProductsDropdownOpen && (
                <div className="mt-2 ml-4 space-y-1">
                  <Link
                    href="/products"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      !activeCategory && pathname === "/products"
                        ? "bg-gradient-to-r from-primary/5 to-primary/10 text-primary"
                        : "hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary"
                    }`}
                    onClick={() => {
                      setIsProductsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      !activeCategory && pathname === "/products"
                        ? "bg-primary/10"
                        : "bg-muted group-hover:bg-primary/10"
                    }`}>
                      <Layers size={16} className={`transition-colors duration-200 ${
                        !activeCategory && pathname === "/products"
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      }`} />
                    </div>
                    <span>All Products</span>
                  </Link>
                  {categories.map((category) => {
                    const Icon = iconMap[category.icon] || Layers;
                    return (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          activeCategory === category.id
                            ? "bg-gradient-to-r from-primary/5 to-primary/10 text-primary"
                            : "hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary"
                        }`}
                        onClick={() => {
                          setIsProductsDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          activeCategory === category.id
                            ? "bg-primary/10"
                            : "bg-muted group-hover:bg-primary/10"
                        }`}>
                          <Icon size={16} className={`transition-colors duration-200 ${
                            activeCategory === category.id
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <span className="block">{category.label}</span>
                          <span className={`block text-xs ${
                            activeCategory === category.id
                              ? "text-primary/70"
                              : "text-muted-foreground group-hover:text-primary/70"
                          }`}>
                            {category.subcategories.length} subcategories
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <Link
              href="/industries"
              className={`${pathname === "/industries" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
            >
              Industries
            </Link>
            <Link
              href="/partners"
              className={`${pathname === "/partners" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
            >
              Partners
            </Link>
            <Link
              href="/contact"
              className={`${pathname === "/contact" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
            >
              Contact
            </Link>

            {/* Mobile CTA Button */}
            <div className="pt-4 border-t">
              <Button asChild size="lg" className="w-full font-semibold">
                <Link href="/partners">
                  Become a Partner
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
