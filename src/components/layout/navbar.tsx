"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
              <Link
                href="/products"
                className={`${pathname === "/products" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group`}
              >
                Products
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform ${pathname === "/products" ? "scale-x-100" : "scale-x-0"} group-hover:scale-x-100 transition-transform duration-300`}></span>
              </Link>
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
            <Link
              href="/products"
              className={`${pathname === "/products" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"} block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300`}
            >
              Products
            </Link>
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
