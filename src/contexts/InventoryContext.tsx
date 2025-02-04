import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { db } from "../../database/client";

interface Inventory {
  id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface InventoryContextType {
  inventory: Inventory[];
  updateStock: (productId: number, quantity: number) => Promise<void>;
  getStockLevels: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<Inventory[]>([]);

  const updateStock = async (productId: number, quantity: number) => {
    const { data, error } = await db
      .from("inventory")
      .upsert({ product_id: productId, quantity })
      .single();
    if (error) throw error;
    setInventory((prev) =>
      prev.map((i) => (i.product_id === productId ? { ...i, ...data } : i))
    );
  };

  const getStockLevels = useCallback(async () => {
    const { data, error } = await db.from("inventory").select("*");
    if (error) throw error;
    setInventory(data || []);
  }, []);

  useEffect(() => {
    getStockLevels();
  }, [getStockLevels]);

  return (
    <InventoryContext.Provider value={{ inventory, updateStock, getStockLevels }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error("useInventory must be used within an InventoryProvider");
  return context;
};