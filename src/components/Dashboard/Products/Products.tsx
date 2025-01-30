import React, { useEffect, useState, useCallback } from "react";
import { useProducts } from "../../../contexts";
import ProductItem from "./ProductItem";

export const Products = () => {
  const { products, fetchProducts } = useProducts();
  const [expandedProducts, setExpandedProducts] = useState<number[]>([]);

  const handleFetchProducts = useCallback(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFetchProducts();
  }, [handleFetchProducts]);

  const toggleProductExpand = (productId: number) => {
    setExpandedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

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
          <ProductItem 
            key={product.id} 
            product={product} 
            isExpanded={expandedProducts.includes(product.id)} 
            toggleExpand={toggleProductExpand} 
          />
        ))}

        {products.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}; 