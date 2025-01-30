import React from "react";
import { Order } from "../../../contexts/OrdersContext";
import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";

interface OrderItemProps {
  order: Order;
  isExpanded: boolean;
  toggleExpand: (orderId: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, isExpanded, toggleExpand }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <OrderHeader order={order} isExpanded={isExpanded} toggleExpand={toggleExpand} />
      {isExpanded && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderItem; 