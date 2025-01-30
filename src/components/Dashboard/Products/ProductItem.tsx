import React from "react";
import { Product } from "../../../contexts/ProductsContext";
import ProductHeader from "./ProductHeader";
import ProductDetails from "./ProductDetails";

interface ProductItemProps {
  product: Product;
  isExpanded: boolean;
  toggleExpand: (productId: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, isExpanded, toggleExpand }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ProductHeader product={product} isExpanded={isExpanded} toggleExpand={toggleExpand} />
      {isExpanded && <ProductDetails product={product} />}
    </div>
  );
};

export default ProductItem; 