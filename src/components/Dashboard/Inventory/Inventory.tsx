import { useState, useEffect } from "react";
import { useInventory } from "../../../contexts/InventoryContext";
import { Plus, Search, Edit, Trash, ChevronDown } from "lucide-react";

export const Inventory = () => {
  const { inventory, updateStock, getStockLevels } = useInventory();
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    getStockLevels();
  }, [getStockLevels]);

  const filteredInventory = inventory.filter((item) =>
    item?.product_id?.toString().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productId = Number(formData.get("product_id"));
    const quantity = Number(formData.get("quantity"));

    try {
      await updateStock(productId, quantity);
      setIsAdding(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Stock</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by product ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Product ID: {item.product_id}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedItems.includes(item.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                
                {expandedItems.includes(item.id) && (
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Quantity:</p>
                      <p className="text-sm text-gray-900">{item.quantity}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditId(item.id);
                          setIsAdding(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => updateStock(item.product_id, 0)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Form */}
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">
                {editId !== null ? "Edit" : "Add"} Stock
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">
                      Product ID
                    </label>
                    <input
                      type="number"
                      name="product_id"
                      id="product_id"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
