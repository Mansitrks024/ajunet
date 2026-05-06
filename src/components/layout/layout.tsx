import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 bg-background pt-20 ${className}`}>
        <div className="mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
