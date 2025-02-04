import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { db } from "../../database/client";

interface Discount {
  id: number;
  product_id: number;
  discount_type: string; // e.g., "percentage", "fixed"
  discount_value: number;
  start_date: string;
  end_date: string;
}

interface DiscountsContextType {
  discounts: Discount[];
  applyDiscount: (discount: Omit<Discount, "id">) => Promise<void>;
  removeDiscount: (id: number) => Promise<void>;
  fetchDiscounts: () => Promise<void>;
}

const DiscountsContext = createContext<DiscountsContextType | null>(null);

export const DiscountsProvider = ({ children }: { children: ReactNode }) => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const fetchDiscounts = useCallback(async () => {
    const { data, error } = await db.from("discounts").select("*");
    if (error) throw error;
    setDiscounts(data || []);
  }, []);

  const applyDiscount = async (discount: Omit<Discount, "id">) => {
    const { data, error } = await db.from("discounts").insert(discount).single();
    if (error) throw error;
    setDiscounts((prev) => [...prev, data]);
  };

  const removeDiscount = async (id: number) => {
    const { error } = await db.from("discounts").delete().eq("id", id);
    if (error) throw error;
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  return (
    <DiscountsContext.Provider
      value={{ discounts, fetchDiscounts, applyDiscount, removeDiscount }}
    >
      {children}
    </DiscountsContext.Provider>
  );
};

export const useDiscounts = () => {
  const context = useContext(DiscountsContext);
  if (!context) throw new Error("useDiscounts must be used within a DiscountsProvider");
  return context;
};