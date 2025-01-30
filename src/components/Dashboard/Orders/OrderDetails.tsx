import React from "react";
import { Order } from "../../../contexts/OrdersContext";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
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
  );
};

export default OrderDetails; 