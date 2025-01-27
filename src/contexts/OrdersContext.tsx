import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../../database/client"; // Supabase client

type Order = {
  id?: number;
  customer: string;
  totalAmount: number;
  status: string;
  createdAt?: string;
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (order: Order) => Promise<void>;
  fetchOrders: () => Promise<void>;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    const { data, error } = await db.from("orders").select();
    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data);
    }
  };

  // Add a new order
  const addOrder = async (order: Order) => {
    const { data, error } = await db.from("orders").insert([order]).select();
    if (error) {
      console.error("Error adding order:", error);
    } else {
      setOrders((prevOrders) => [...prevOrders, ...data]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, addOrder, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

// Hook to use orders context
export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
