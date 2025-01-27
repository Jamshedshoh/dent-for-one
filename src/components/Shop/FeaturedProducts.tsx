import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useShop } from "../../contexts/ShopContext";

interface FeaturedProductsProps {
  limit?: number;
}

export const FeaturedProducts = ({ limit }: FeaturedProductsProps) => {
  const { featuredProducts: products, addToCart } = useShop();
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Featured Products
          </h2>
          <Link
            to="/shop/catalog?category=featured"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Featured
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Link to={`/shop/products/${product.id}`}>
                <img
                  src={
                    product.image_url ||
                    `https://picsum.photos/300/200?random=${product.id}`
                  }
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
                <p className="text-gray-600 mt-2">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {displayProducts.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No featured products available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
