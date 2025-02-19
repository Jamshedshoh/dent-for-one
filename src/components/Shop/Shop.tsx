import { Outlet } from "react-router-dom";
import { HeroSection } from "./HeroSection";
import { FeaturedProducts } from "./FeaturedProducts";
import { NewArrivals } from "./NewArrivals";
import { SpecialOffers } from "./SpecialOffers";
import { Layout } from "./Layout";

export const Shop = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts limit={4} />
      <NewArrivals limit={4} />
      <SpecialOffers />
      <Outlet />
    </Layout>
  );
};
