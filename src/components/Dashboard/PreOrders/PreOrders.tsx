import { useState, useEffect } from "react";
import { usePreOrders } from "../../../contexts/PreOrdersContext";
import { Plus, Search, Edit, Trash, ChevronDown } from "lucide-react";

export const PreOrders = () => {
  const { preOrders, fetchPreOrders, createPreOrder, updatePreOrderStatus } = usePreOrders();
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPreOrder, setExpandedPreOrder] = useState<number | null>(null);

  useEffect(() => {
    fetchPreOrders();
  }, [fetchPreOrders]);

  const filteredPreOrders = preOrders.filter((preOrder) =>
    preOrder?.product_id?.toString().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const preOrderData = {
      product_id: Number(formData.get("product_id")),
      quantity: Number(formData.get("quantity")),
      user_id: "current_user_id", // Add user_id
      status: "pending", // Add default status
      expected_date: formData.get("expected_date") as string,
      notes: formData.get("notes") as string,
    };

    try {
      if (editId !== null) {
        await updatePreOrderStatus(editId, preOrderData.status);
        setEditId(null);
      } else {
        await createPreOrder(preOrderData);
      }
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving pre-order:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Implement delete functionality if needed
      console.log("Delete pre-order:", id);
    } catch (error) {
      console.error("Error deleting pre-order:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pre-Orders</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Pre-Order</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pre-Orders List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredPreOrders.map((preOrder) => (
            <div key={preOrder.id} className="border-b last:border-b-0">
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Product ID: {preOrder.product_id}</h3>
                    <p className="text-sm text-gray-500">Quantity: {preOrder.quantity}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditId(preOrder.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(preOrder.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setExpandedPreOrder(expandedPreOrder === preOrder.id ? null : preOrder.id)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform ${expandedPreOrder === preOrder.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
                {expandedPreOrder === preOrder.id && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Status: {preOrder.status}</p>
                    <p>Created At: {new Date(preOrder.created_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
