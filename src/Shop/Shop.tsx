import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Shop = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto py-20">
        <h1 className="text-5xl font-semibold">Shop the Best Deals</h1>
        <p className="mt-4 text-lg">
          Find amazing deals on electronics, fashion, and more.
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

// Featured Products Component
const FeaturedProducts = () => {
  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Featured Products
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`https://via.placeholder.com/300?text=Product+${idx + 1}`}
                alt={`Product ${idx + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Product {idx + 1}
                </h3>
                <p className="text-gray-600 mt-2">
                  Price: ${((idx + 1) * 10).toFixed(2)}
                </p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
