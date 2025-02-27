import { useState, useEffect } from "react";
import { useInventory, useProducts } from "../../../contexts";
import { Plus, Edit, Trash } from "lucide-react";
import { Search } from "../../ui/Search";
import { CollapseCard } from "../../ui/CollapseCard";
import { Modal } from "../../ui/Modal";

export const Inventory = () => {
  const { inventory, addStock, updateStock, getStockLevels, deleteStock } = useInventory();
  const { products } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getStockLevels();
  }, [getStockLevels]);

  const filteredInventory = inventory.filter((item) =>
    item?.product_id?.toString().includes(searchQuery.toLowerCase())
  );

  const handleAddStock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inventoryData  = {
      product_id: formData.get("product_id") as string,
      quantity: Number(formData.get("quantity")),
    };

    try {
      await addStock(inventoryData);
      setIsAdding(false);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleUpdateStock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editId) return;
    const formData = new FormData(e.currentTarget);
    const inventoryData = {
      quantity: Number(formData.get("quantity")),
    };
    try {
      await updateStock(editId, inventoryData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleDeleteStock = async (inventoryId: string) => {
    if (!inventoryId) return;
    try {
      await deleteStock(inventoryId);
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const inventoryActions = (inventoryId: string) => {
    return [
      <button
        className="text-blue-500 hover:text-blue-600"
        aria-label="Edit"
        title="Edit"
        onClick={() => {
          setEditId(inventoryId);
          setIsEditing(true);
        }}
      >
        <Edit />
      </button>,
      <button
        onClick={() => {
          setDeleteId(inventoryId);
          setIsDeleting(true);
        }}
        className="text-red-600 hover:text-red-900"
      >
        <Trash className="w-5 h-5" />
      </button>,
    ];
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Stock</span>
          </button>
        </div>

        {/* Search Bar */}
        <Search query={searchQuery} onSearch={setSearchQuery} />

        {/* Inventory List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredInventory.map((item) => (
            <CollapseCard
              key={item.id}
              title={`Product ID: ${item.product_id}`}
              actions={inventoryActions(item.id)}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">
                  Quantity: {item.quantity}
                </p>
              </div>
            </CollapseCard>
          ))}
        </div>

        {/* Add Form */}
        <Modal
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          title={editId !== null ? "Edit Stock" : "Add Stock"}
        >
          <form onSubmit={handleAddStock}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="product_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product ID
                </label>
                <select
                  name="product_id"
                  id="product_id"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {`Product ID: ${product.id} - ${product.name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {editId !== null ? "Update" : "Add"} Stock
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit Form */}
        <Modal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          title="Edit Stock"
        >
          <form onSubmit={handleUpdateStock}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  defaultValue={inventory.find(item => item.id === editId)?.quantity}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
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
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleting}
          onClose={() => setIsDeleting(false)}
          title={`Delete Stock ${deleteId}`}
        >
          <p>Are you sure you want to delete this stock?</p>
          <div className="mt-6 flex justify-end space-x-2">
            <button onClick={() => setIsDeleting(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
            <button onClick={() => handleDeleteStock(deleteId)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
