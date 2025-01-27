
import { useState } from "react";
import { useShop } from "../../contexts/ShopContext";

export const SubNavbar = () => {
  const { categories } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-white shadow-md mt-14 py-2 fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory((prev) => (prev === category ? null : category))}
              className={`px-4 py-2 rounded ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
