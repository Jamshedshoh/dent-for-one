import { useState } from "react";

export const HeroSection = () => {
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
    <div className="relative pt-2">
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
              className="relative w-full mx-auto flex-shrink-0 text-center bg-transparent text-white h-96"
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