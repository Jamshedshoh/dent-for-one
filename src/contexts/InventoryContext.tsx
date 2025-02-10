import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { db } from "../../database/client";

interface Inventory {
  id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface InventoryContextType {
  inventory: Inventory[];
  addStock: (data: Partial<Inventory>) => Promise<void>;
  updateStock: (inventoryId: string, data: Partial<Inventory>) => Promise<void>;
  getStockLevels: () => Promise<void>;
  deleteStock: (inventoryId: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<Inventory[]>([]);

  const addStock = async (inventoryData: Partial<Inventory>) => {
    const { data: _, error } = await db
      .from("inventory")
      .insert(inventoryData)
      .single();
    if (error) throw error;
  };

  const updateStock = async (inventoryId: string, inventoryData: Partial<Inventory>) => {
    const { data: _, error } = await db
      .from("inventory")
      .update(inventoryData)
      .eq("id", inventoryId)
      .single();
    if (error) throw error;
  };

  const deleteStock = async (inventoryId: string) => {
    const { data: _, error } = await db.from("inventory").delete().eq("id", inventoryId);
    if (error) throw error;
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
    <InventoryContext.Provider value={{ inventory, addStock, updateStock, getStockLevels, deleteStock }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error("useInventory must be used within an InventoryProvider");
  return context;
};