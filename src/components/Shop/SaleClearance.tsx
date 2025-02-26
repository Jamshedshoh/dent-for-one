import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useShop } from "../../contexts/ShopContext";
import { ProductCard } from "./ProductCard";

interface SaleClearanceProps {
  limit?: number;
}

export const SaleClearance = ({ limit }: SaleClearanceProps) => {
  const { saleClearance: products, addToCart } = useShop(); // Assuming Sale Clearance uses featured products
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Sale Clearance
          </h2>
          <Link
            to="/shop/catalog/sale"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Sale Clearance
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} badge="Sale" />
          ))}
          {displayProducts.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No sale clearance products available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
