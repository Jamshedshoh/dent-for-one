import React, { useEffect, useState, useCallback } from "react";
import { useOrders } from "../../contexts";
import { Order } from "../../contexts/OrdersContext";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Orders = () => {
  const { orders, fetchOrders, updateOrderStatus } = useOrders();
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  const handleFetchOrders = useCallback(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    handleFetchOrders();
  }, [handleFetchOrders]);

  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const isOrderExpanded = (orderId: number) => expandedOrders.includes(orderId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Orders Management</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => toggleOrderExpand(order.id)}
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium">Order #{order.id}</span>
                <span className={`px-2 py-1 text-xs rounded-full font-medium
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
                {isOrderExpanded(order.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>

            {/* Order Details (Collapsible) */}
            {isOrderExpanded(order.id) && (
              <div className="border-t border-gray-200">
                {/* Customer Info */}
                <div className="p-4 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
                  <p className="text-sm">User ID: {order.user_id}</p>
                  <p className="text-sm mt-1">Shipping Address: {order.shipping_address}</p>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.productDetails?.name}</p>
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
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <div className="font-medium">
                    Total Amount: ${order.total.toFixed(2)}
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="text-sm border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};
