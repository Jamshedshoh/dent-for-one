import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { db } from "../../database/client";

interface PreOrder {
  id: number;
  product_id: number;
  user_id: string;
  quantity: number;
  status: string; // e.g., "pending", "fulfilled", "cancelled"
  created_at: string;
}

interface PreOrdersContextType {
  preOrders: PreOrder[];
  createPreOrder: (preOrder: Omit<PreOrder, "id" | "created_at">) => Promise<void>;
  updatePreOrderStatus: (id: number, status: string) => Promise<void>;
  fetchPreOrders: () => Promise<void>;
}

const PreOrdersContext = createContext<PreOrdersContextType | null>(null);

export const PreOrdersProvider = ({ children }: { children: ReactNode }) => {
  const [preOrders, setPreOrders] = useState<PreOrder[]>([]);

  const fetchPreOrders = useCallback(async () => {
    const { data, error } = await db.from("pre_orders").select("*");
    if (error) throw error;
    setPreOrders(data || []);
  }, []);

  const createPreOrder = async (preOrder: Omit<PreOrder, "id" | "created_at">) => {
    const { data, error } = await db.from("pre_orders").insert(preOrder).single();
    if (error) throw error;
    setPreOrders((prev) => [...prev, data]);
  };

  const updatePreOrderStatus = async (id: number, status: string) => {
    const { data, error } = await db
      .from("pre_orders")
      .update({ status })
      .eq("id", id)
      .single();
    if (error) throw error;
    setPreOrders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  useEffect(() => {
    fetchPreOrders();
  }, [fetchPreOrders]);

  return (
    <PreOrdersContext.Provider
      value={{ preOrders, fetchPreOrders, createPreOrder, updatePreOrderStatus }}
    >
      {children}
    </PreOrdersContext.Provider>
  );
};

export const usePreOrders = () => {
  const context = useContext(PreOrdersContext);
  if (!context) throw new Error("usePreOrders must be used within a PreOrdersProvider");
  return context;
};