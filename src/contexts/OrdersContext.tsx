import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { db } from "../../database/client";
import { useAuth } from "./AuthContext";

export interface Order {
  id: string;
  user_id: string;
  items: { product_id: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  shipping_address: string;
  created_at: string;
  updated_at: string; // Added updated_at field
}

interface OrdersContextType {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>; // Added deleteOrder method
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    try {
      // Get all orders for the current user
      const { data: ordersData, error: ordersError } = await db
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Set orders directly as we no longer need to fetch items separately
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }, [user]);

  const updateOrderStatus = useCallback(
    async (orderId: string, status: Order["status"]) => {
      if (!user) return;

      try {
        const { error } = await db
          .from("orders")
          .update({ status })
          .eq("id", orderId)
          .eq("user_id", user.id);

        if (error) throw error;
        await fetchOrders();
      } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
      }
    },
    [user, fetchOrders]
  );

  const deleteOrder = useCallback(
    async (orderId: string) => {
      if (!user) return;

      try {
        const { error } = await db
          .from("orders")
          .delete()
          .eq("id", orderId)
          .eq("user_id", user.id);

        if (error) throw error;
        await fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
      }
    },
    [user, fetchOrders]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders, updateOrderStatus, deleteOrder }}>
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
