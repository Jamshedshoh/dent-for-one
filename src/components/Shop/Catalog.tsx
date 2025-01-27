import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../contexts/ShopContext";
import { Layout } from "../Layout";

export const Catalog = () => {
  const { products, categories, filters, setFilters, applyFilters, addToCart } = useShop();
  const [sortBy, setSortBy] = useState("featured");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setFilters({ ...filters, category });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters({ ...filters, priceRange: [min, max] });
  };

  const getSortedProducts = () => {
    let sortedProducts = [...products];
    switch (sortBy) {
      case "price-asc":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedProducts;
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    // Optional: Add a toast notification here
  };

  const filteredProducts = applyFilters(getSortedProducts());

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Sorting Bar */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{filteredProducts.length} Products</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <Link to={`/shop/products/${product.id}`}>
                    <img
                      src={product.image_url || `https://picsum.photos/300/200?random=${product.id}`}
                      alt={product.name}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/shop/products/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-blue-600 font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
