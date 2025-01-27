import { useNavigate } from "react-router-dom";

export const Products = ({ products }: { products: any[] }) => {
  const navigate = useNavigate();

  const handleProductClick = (id: number) => {
    navigate(`/shop/products/${id}`);
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="p-4 border rounded shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <img
                src={product.image_url || "https://picsum.photos/200/300"}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          ))}
          {products.length === 0 && (
            <p className="col-span-full text-gray-500">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
