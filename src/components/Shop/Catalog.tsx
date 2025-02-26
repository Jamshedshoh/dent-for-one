import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../../contexts/ShopContext";
import { Layout } from "./Layout";
import { ProductCard } from "./ProductCard";

export const Catalog = () => {
  const { category: paramCategory, subcategory: paramSubcategory } =
    useParams();

  const { products, categories, filters, setFilters, applyFilters, addToCart } =
    useShop();
  const [sortBy, setSortBy] = useState("price-asc");
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  useEffect(() => {
    const newFilters: any = { ...filters };
    newFilters.category = paramCategory;
    newFilters.subcategory = paramSubcategory;
    setFilters(newFilters);
  }, [paramCategory, paramSubcategory, setFilters]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
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
  };

  useEffect(() => {
    const sortedProducts = getSortedProducts();
    setFilteredProducts(applyFilters(sortedProducts));
  }, [filters, products, sortBy]);

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-20 min-h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {filteredProducts.length} Products
                </span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
