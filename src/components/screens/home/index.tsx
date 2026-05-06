import React from "react";
import HeroSection from "./Herosection";
import AboutSection from "./AboutSection";
import ProductPortfolio from "./Productportfolio";
import WhyChooseUs from "./Whychooseus";
import IndustriesWeServe from "./Industriesweserve";
import PartnerSection from "./Partnersection";
import FeaturedBrand from "./Featuredbrand";

const HomePage = () => {
  return (
    <>
      <HeroSection />

      <AboutSection />

      <ProductPortfolio />

      <WhyChooseUs />

      <IndustriesWeServe />

      <PartnerSection/>

      <FeaturedBrand />

    </>
  );
};

export default HomePage;
