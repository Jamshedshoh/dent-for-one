import { useState } from "react";
import { useProducts } from "../../contexts";

export const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, stock: 0, status: "In Stock" });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0 || newProduct.stock < 0) return;
    
    await addProduct(newProduct);
    setNewProduct({ name: "", price: 0, stock: 0, status: "In Stock" });
  };

  const handleStockChange = async (id: number, newStock: number) => {
    const status = newStock === 0 ? "Out of Stock" : newStock < 5 ? "Low Stock" : "In Stock";
    await updateProduct(id, { stock: newStock, status });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Products</h2>

      {/* Product List */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Inventory</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Product</th>
              <th className="px-4 py-2 text-left text-gray-700">Price</th>
              <th className="px-4 py-2 text-left text-gray-700">Stock</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={product.stock}
                    className="w-16 p-1 border rounded"
                    onChange={(e) => handleStockChange(product.id, parseInt(e.target.value) || 0)}
                  />
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-full ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : product.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Product */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Product</h3>

        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                placeholder="Enter product price"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-gray-700 font-semibold mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                placeholder="Enter stock quantity"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
