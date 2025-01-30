import React from "react";
import { Product } from "../../../contexts/ProductsContext";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductHeaderProps {
  product: Product;
  isExpanded: boolean;
  toggleExpand: (productId: number) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product, isExpanded, toggleExpand }) => {
  return (
    <div 
      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
      onClick={() => toggleExpand(product.id)}
    >
      <div className="flex items-center space-x-4">
        <img
          src={product.image_url || `https://picsum.photos/200/200?random=${product.id}`}
          alt={product.name}
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="font-medium text-blue-600">
          ${product.price.toFixed(2)}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default ProductHeader; 