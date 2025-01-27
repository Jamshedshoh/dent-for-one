import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { HeroSection } from "./HeroSection";
import { FeaturedProducts } from "./FeaturedProducts";
import { NewArrivals } from "./NewArrivals";
import { SpecialOffers } from "./SpecialOffers";
import { Footer } from "../Footer";

export const Shop = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <HeroSection />
      <FeaturedProducts limit={4} />
      <NewArrivals limit={4} />
      <SpecialOffers />
      <Outlet />
      <Footer />
    </div>
  );
};
