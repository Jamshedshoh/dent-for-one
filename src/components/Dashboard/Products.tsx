import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import { Product } from "../../contexts/ProductsContext";

export const Products = () => {
  const { products, fetchProducts, updateProduct, deleteProduct } = useProducts();
  const [expandedProducts, setExpandedProducts] = useState<number[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleProductExpand = (productId: number) => {
    setExpandedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isProductExpanded = (productId: number) => expandedProducts.includes(productId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Products Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Product
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Product Header */}
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => toggleProductExpand(product.id)}
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
                {isProductExpanded(product.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>

            {/* Product Details (Collapsible) */}
            {isProductExpanded(product.id) && (
              <div className="border-t border-gray-200">
                {/* Product Info */}
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

                {/* Actions */}
                <div className="p-4 bg-gray-50 flex justify-end space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProduct(product);
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
                        deleteProduct(product.id);
                      }
                    }}
                    className="flex items-center px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* TODO: Add EditProductModal component */}
      {editingProduct && (
        <div>
          {/* Add your edit product modal here */}
        </div>
      )}
    </div>
  );
};
