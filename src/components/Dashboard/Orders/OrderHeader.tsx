import React from "react";
import { Order } from "../../../contexts/OrdersContext";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OrderHeaderProps {
  order: Order;
  isExpanded: boolean;
  toggleExpand: (orderId: number) => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ order, isExpanded, toggleExpand }) => {
  return (
    <div 
      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
      onClick={() => toggleExpand(order.id)}
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
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default OrderHeader; 