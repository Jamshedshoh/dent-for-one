import { Link } from "react-router-dom";
import { useShop } from "../../contexts/ShopContext";

interface ProductCardProps {
  product: any; // Define product type more specifically if available
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShop();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
  );
};
