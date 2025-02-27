import { useState, useEffect } from "react";
import { useDiscounts } from "../../../contexts/DiscountsContext";
import { Plus, Search, Edit, Trash, ChevronDown } from "lucide-react";

export const Discounts = () => {
  const { discounts, applyDiscount, removeDiscount, fetchDiscounts } = useDiscounts();
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDiscount, setExpandedDiscount] = useState<number | null>(null);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  const filteredDiscounts = discounts.filter((discount) =>
    discount?.product_id?.toString().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const discountData = {
      product_id: Number(formData.get("product_id")),
      discount_type: formData.get("discount_type") as string,
      discount_value: Number(formData.get("discount_value")),
      start_date: formData.get("start_date") as string,
      end_date: formData.get("end_date") as string,
    };

    try {
      if (editId !== null) {
        await applyDiscount({ ...discountData, id: editId });
        setEditId(null);
      } else {
        await applyDiscount(discountData);
      }
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving discount:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Discounts</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Discount</span>
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

        {/* Discounts List */}
        <div className="space-y-4">
          {filteredDiscounts.map((discount) => (
            <div key={discount.id} className="bg-white rounded-lg shadow">
              <div
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedDiscount(expandedDiscount === discount.id ? null : discount.id)}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Product ID: {discount.product_id}</h3>
                  <p className="text-sm text-gray-500">{discount.discount_type}: {discount.discount_value}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedDiscount === discount.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {expandedDiscount === discount.id && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setEditId(discount.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => removeDiscount(discount.id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                    >
                      <Trash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {(isAdding || editId !== null) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  {editId !== null ? "Edit Discount" : "Add New Discount"}
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
                      <label htmlFor="discount_type" className="block text-sm font-medium text-gray-700">
                        Discount Type
                      </label>
                      <select
                        name="discount_type"
                        id="discount_type"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="discount_value" className="block text-sm font-medium text-gray-700">
                        Discount Value
                      </label>
                      <input
                        type="number"
                        name="discount_value"
                        id="discount_value"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        id="end_date"
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
                      {editId !== null ? "Update" : "Add"} Discount
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
