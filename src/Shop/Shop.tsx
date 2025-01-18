import { useState } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Shop = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <SubNavbar />
      <HeroSection />
      <Products products={products} />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

const products = [
  { id: 1, name: "Smartphone", category: "Electronics" },
  { id: 2, name: "Sofa", category: "Furniture" },
  { id: 3, name: "T-shirt", category: "Apparel" },
  { id: 4, name: "Book", category: "Books" },
];

export const Products = ({ products }: any) => {
  return (
    <div className="pt-20">
      <div className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="p-4 border rounded shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          ))}
          {products.length === 0 && (
            <p className="col-span-full text-gray-500">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from "react";

const categories = [
  {
    name: "Dental Hygiene",
    subcategories: [
      "Toothbrushes",
      "Toothpaste",
      "Mouthwash",
      "Floss",
      "Whitening Products",
    ],
  },
  {
    name: "Dental Devices",
    subcategories: [
      "Orthodontic Braces",
      "Retainers",
      "Aligners",
      "Mouthguards",
      "Night Guards",
    ],
  },
  {
    name: "Dental Equipment",
    subcategories: [
      "Dental Chairs",
      "X-Ray Machines",
      "Ultrasonic Scalers",
      "Dental Lasers",
      "Sterilization Equipment",
    ],
  },
  {
    name: "Dental Materials",
    subcategories: [
      "Fillings",
      "Cements",
      "Impression Materials",
      "Crowns & Bridges",
      "Bonding Agents",
    ],
  },
  {
    name: "Dental Instruments",
    subcategories: [
      "Scalers & Curettes",
      "Explorers",
      "Forceps",
      "Probes",
      "Mirrors",
    ],
  },
  {
    name: "Consumables",
    subcategories: [
      "Gloves",
      "Masks",
      "Syringes",
      "Cotton Rolls",
      "Saliva Ejectors",
    ],
  },
  {
    name: "Technology & Software",
    subcategories: [
      "Practice Management Software",
      "Digital Imaging Tools",
      "CAD/CAM Systems",
      "Patient Communication Tools",
      "Cloud Backup Solutions",
    ],
  },
];

export const SubNavbar = () => {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory((prev: any) => (prev === category ? null : category));
  };

  return (
    <div className="bg-white shadow-md mt-12 py-4 fixed top-0 left-0 right-0 z-40">
      <div className="sub-navbar bg-gray-100 py-2 shadow-md relative">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded ${
                  selectedCategory && selectedCategory.name === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Large Pane for Subcategories */}
      {selectedCategory && <LargePane category={selectedCategory} />}
    </div>
  );
};

const LargePane = ({ category }: any) => {
  return (
    <div className="absolute left-0 mt-2 w-full bg-white shadow-lg py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {category.subcategories.map((subcategory: any) => (
            <button
              key={subcategory}
              className="block w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-gray-800 text-left px-4 py-2 rounded transition"
            >
              {subcategory}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const trendingProducts = [
    {
      title: "Electric Toothbrush",
      image: "https://picsum.photos/id/237/1800/400",
      description:
        "Revolutionize your oral care routine with cutting-edge technology.",
    },
    {
      title: "Dental Chair",
      image: "https://picsum.photos/id/337/800/200",
      description: "Ergonomic and comfortable dental chairs for professionals.",
    },
    {
      title: "Whitening Kit",
      image: "https://picsum.photos/id/137/800/200",
      description: "Achieve a brighter smile with our premium whitening kits.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? trendingProducts.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative pt-32">
      <div className="relative w-full mx-auto overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {trendingProducts.map((product, index) => (
            <div
              key={index}
              className="relative w-full mx-auto flex-shrink-0 text-center bg-transparent text-white h-72"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover", // Ensures the image covers the container
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
                backgroundPosition: "center", // Centers the image in the container
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

              <div className="flex items-center justify-center h-full relative z-20">
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                  <p className="mt-2">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-blue-600 transition"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-blue-600 transition"
        >
          &#8250;
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
                src={`https://picsum.photos/id/${idx + 50}/300`}
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
