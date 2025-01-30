import React from "react";
import { Product } from "../../../contexts/ProductsContext";
import { Edit, Trash2 } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="border-t border-gray-200">
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Product Information</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Stock:</span> {product.stock} units
            </p>
            <p className="text-sm">
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p className="text-sm">
              <span className="font-medium">Featured:</span> {product.is_featured ? 'Yes' : 'No'}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created:</span> {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Product Description</h3>
          <p className="text-sm text-gray-600">
            {product.description || 'No description available.'}
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 flex justify-end space-x-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle edit product logic
          }}
          className="flex items-center px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this product?')) {
              // Handle delete product logic
            }
          }}
          className="flex items-center px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetails; 