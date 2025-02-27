import { useShop } from "../../contexts";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Importing chevron icons
import { Link } from "react-router-dom";

// Categories Component
export const Categories = () => {
  const { categories } = useShop();
  const [openCategory, setOpenCategory] = useState<string | undefined>(
    undefined
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | undefined>(
    undefined
  );

  const toggleDropdown = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? undefined : categoryName);
  };

  return (
    <div className="container mx-auto fixed top-16 left-0 right-0 z-10">
      <nav className="bg-white w-full px-2 pt-2">
        <ul className="flex">

          {categories
            // .slice(0, showAllCategories ? categories.length : 6)
            .map((category) => (
              <li key={category.slug} className="relative group">
                <button
                  className="py-2 px-4 text-gray-700 hover:text-blue-600 text-lg flex items-center justify-between"
                  onClick={() => toggleDropdown(category.name)}
                  onMouseEnter={() => setHoveredCategory(category.name)} // Set hovered category on mouse enter
                  // onMouseLeave={() => setHoveredCategory(undefined)} // Clear hovered category on mouse leave
                >
                  {category.displayName}
                  {openCategory === category.name ? (
                    <ChevronUp className="ml-2 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-2 w-4 h-4" />
                  )}
                </button>
              </li>
            ))}
        </ul>
      </nav>
      {/* Large pane to show hovered or selected category */}
      <div className="absolute flex flex-col w-full z-20">
        <div className="container mx-auto">
          {hoveredCategory && (
            <div
              className="bg-gray-100 p-2 rounded shadow"
              onMouseLeave={() => setHoveredCategory(undefined)}
            >
              {categories.find((c) => c.name === hoveredCategory)
                ?.categories && (
                <ul>
                  {categories
                    .find((c) => c.name === hoveredCategory)
                    ?.categories.map((category) => (
                      <li
                        key={category.slug}
                        className="py-2 px-4 hover:bg-gray-100"
                      >
                        <Link to={`/shop/catalog/${category.slug}`}>
                          {" "}
                          <span className="text-lg font-bold">
                            {category.displayName}
                          </span>
                        </Link>
                        <ul className="flex">
                          {category.subcategories.map((sub) => (
                            <li
                              key={sub.slug}
                              className="py-2 px-4 hover:bg-gray-100"
                            >
                              <Link
                                to={`/shop/catalog/${category.slug}/${sub.slug}`}
                                className="hover:text-blue-600"
                              >
                                {sub.displayName}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
