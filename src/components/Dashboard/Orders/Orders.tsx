import { useState } from "react";
import { useOrders } from "../../../contexts";
import { Search } from "../../ui/Search";
import { CollapseCard } from "../../ui/CollapseCard";
import { Edit } from "lucide-react";
import { Modal } from "../../ui/Modal";

export const Orders = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [editOrderId, setEditOrderId] = useState<string | null>(null);

  const handleEditOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = e.currentTarget.status.value;
    try {
      if (editOrderId) {
        updateOrderStatus(editOrderId, status);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
    setEditOrderId(null);
  };

  const orderActions = (orderId: string) => {
    return [
      <button
        key="edit"
        className="text-blue-500 hover:text-blue-600"
        aria-label="Edit"
        title="Edit"
        onClick={() => setEditOrderId(orderId)}
      >
        <Edit />
      </button>,
    ];
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(searchQuery) ||
      order.user_id.includes(searchQuery) ||
      order.shipping_address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Orders Management
        </h2>
      </div>

      <Search query={searchQuery} onSearch={setSearchQuery} />

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <CollapseCard
            key={order.id}
            title={
              <span className="flex items-center gap-2">
                <span>Order #{order.id}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : order.status === "processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </span>
            }
            actions={orderActions(order.id)}
          >
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Order Date:
                </h3>
                <div className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200">
              {/* Customer Info */}
              <div className="p-4 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Customer Information
                </h3>
                <p className="text-sm">User ID: {order.user_id}</p>
                <p className="text-sm mt-1">
                  Shipping Address: {order.shipping_address}
                </p>
              </div>

              {/* Order Items */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Order Items
                </h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total & Actions */}
              <div className="p-4 bg-gray-100 flex justify-between items-center">
                <p className="font-medium">Total Amount:</p>
                <p className="font-medium">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </CollapseCard>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

      {editOrderId && (
        <Modal
          isOpen={true}
          onClose={() => setEditOrderId(null)}
          title="Edit Order"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edit Order
          </h2>
          <p className="text-gray-600 mb-4">
            Order ID: <span className="font-medium">{editOrderId}</span>
          </p>

          <form onSubmit={handleEditOrder} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="status" className="font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
