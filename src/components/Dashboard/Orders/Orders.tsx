import { useEffect, useState, useCallback } from "react";
import { useOrders } from "../../../contexts";
import OrderItem from "./OrderItem";

export const Orders = () => {
  const { orders, fetchOrders } = useOrders();
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Orders Management</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderItem 
            key={order.id} 
            order={order} 
            isExpanded={expandedOrders.includes(order.id)} 
            toggleExpand={toggleOrderExpand} 
          />
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
