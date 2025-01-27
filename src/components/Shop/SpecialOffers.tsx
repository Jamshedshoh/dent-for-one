import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const SpecialOffers = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Special Offers
          </h2>
          <Link
            to="/shop/catalog?category=sale"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Offers
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <div className="bg-blue-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <p className="text-blue-600 font-medium mb-2">Limited Time Offer</p>
            <h3 className="text-2xl font-bold text-gray-900">
              Up to 50% Off Selected Items
            </h3>
          </div>
          <Link
            to="/shop/catalog?category=sale"
            className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};