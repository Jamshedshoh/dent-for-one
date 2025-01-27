import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, ArrowLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../../contexts/ShopContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Optional: Show a success message or notification
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm mb-8">
        <Link to="/shop" className="text-gray-600 hover:text-blue-600">
          Shop
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link to="/shop/catalog" className="text-gray-600 hover:text-blue-600">
          Catalog
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium truncate">
          {product.name}
        </span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Catalog
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image_url || "https://picsum.photos/400/300"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Stock: {product.stock} units</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors
              ${product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Additional Product Details */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
            <p className="text-gray-600">
              This is where the product description would go. You might want to add a description field to your products table in the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
