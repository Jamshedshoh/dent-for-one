import { useEffect, useState, useCallback } from "react";
import { useProducts } from "../../../contexts";
import { CollapseCard } from "../../ui/CollapseCard";
import { Modal } from "../../ui/Modal";
import { Edit, Trash } from "lucide-react";
import { Search } from "../../ui/Search";

export const Products = () => {
  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFetchProducts = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    handleFetchProducts();
  }, [handleFetchProducts]);

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addProduct = async (productData: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    }) => {
      try {
        await createProduct(
          productData
        );
        setIsAddFormOpen(false);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

    const formData = new FormData(e.target as HTMLFormElement);
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: formData.get("category") as string,
    };
    addProduct(productData);
  };

  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editProduct = async (productData: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    }) => {
      try {
        if (editProductId) {
          await updateProduct(editProductId, productData);
          console.log(productData);
          setEditProductId(null);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };

    const formData = new FormData(e.target as HTMLFormElement);
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: formData.get("category") as string,
    };
    editProduct(productData);
  };

  const handleDeleteProduct = async (productId: number | null) => {
    if (!productId) return;
    try {
      await deleteProduct(productId);
      setDeleteProductId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const productActions = (productId: number) => {
    return [
      <button
        key="edit"
        className="text-blue-500 hover:text-blue-600"
        aria-label="Edit"
        title="Edit"
        onClick={() => setEditProductId(productId)}
      >
        <Edit />
      </button>,
      <button
        key="delete"
      className="text-red-500 hover:text-red-600"
        aria-label="Delete"
        title="Delete"
        onClick={() => {
          setDeleteProductId(productId);
        }}
      >
        <Trash />
      </button>,
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Products Management
        </h2>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </button>
      </div>

      <Search query={searchQuery} onSearch={setSearchQuery} />

      <div className="space-y-4">
        {products.map((product) => (
          <CollapseCard
            key={product.id}
            title={product.name}
            actions={productActions(product.id)}
            imageUrl={product.image_url}
            imageSkeleton={true}
          >
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <strong>ID:</strong> {product.id}
              </div>
              <div>
                <strong>Name:</strong> {product.name}
              </div>
              <div>
                <strong>Description:</strong>{" "}
                {product.description || "No description available."}
              </div>
              <div>
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </div>
              <div>
                <strong>Stock:</strong> {product.stock} units
              </div>
              <div>
                <strong>Category:</strong> {product.category}
              </div>
            </div>
          </CollapseCard>
        ))}

        {products.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        title="Add New Product"
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddFormOpen(false)} // Assuming this closes the form
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={editProductId !== null}
        onClose={() => setEditProductId(null)}
        title={`Edit Product ${editProductId}`}
      >
        <form onSubmit={handleEditProduct} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={
                products.find((p) => p.id === editProductId)?.name || ""
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={
                products.find((p) => p.id === editProductId)?.description || ""
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={
                products.find((p) => p.id === editProductId)?.price || 0
              }
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              defaultValue={
                products.find((p) => p.id === editProductId)?.stock || 0
              }
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              required
              defaultValue={
                products.find((p) => p.id === editProductId)?.category || ""
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setEditProductId(null); // Assuming this resets the form or closes the modal
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={deleteProductId !== null}
        onClose={() => setDeleteProductId(null)}
        title={`Delete Product ${deleteProductId}`}
      >
        <div className="p-4">
          <p>Are you sure you want to delete this product?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setDeleteProductId(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteProduct(deleteProductId)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
