import { createContext, useContext, useState, ReactNode } from "react";
import { db } from "../../database/client";
import { useAuth } from "./AuthContext";

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  productDetails?: {
    name: string;
    price: number;
  };
}

export interface Order {
  id: number;
  user_id: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

interface OrdersContextType {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: number, status: Order['status']) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) return;

    try {
      // Get all orders for the current user
      const { data: ordersData, error: ordersError } = await db
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Then get order items and products for each order
      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          // First get order items
          const { data: itemsData, error: itemsError } = await db
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;

          // Then get product details for each item
          const itemsWithProducts = await Promise.all(
            (itemsData || []).map(async (item) => {
              const { data: productData, error: productError } = await db
                .from('products')
                .select('name, price')
                .eq('id', item.product_id)
                .single();

              if (productError) throw productError;

              return {
                ...item,
                productDetails: productData
              };
            })
          );

          return {
            ...order,
            items: itemsWithProducts
          };
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    if (!user) return;
    
    try {
      const { error } = await db
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .eq('user_id', user.id); // Only update if order belongs to user

      if (error) throw error;
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
