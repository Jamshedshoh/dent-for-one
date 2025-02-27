import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { db } from "../../database/client";

interface Supplier {
  id: string;
  name: string;
  contact_email: string;
  phone: string;
  address: string;
}

interface SuppliersContextType {
  suppliers: Supplier[];
  fetchSuppliers: () => Promise<void>;
  addSupplier: (supplier: Omit<Supplier, "id">) => Promise<void>;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
}

const SuppliersContext = createContext<SuppliersContextType | null>(null);

export const SuppliersProvider = ({ children }: { children: ReactNode }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const fetchSuppliers = useCallback(async () => {
    const { data, error } = await db.from("suppliers").select("*");
    if (error) throw error;
    setSuppliers(data || []);
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const addSupplier = async (supplier: Omit<Supplier, "id">) => {
    const { data, error } = await db.from("suppliers").insert(supplier).single();
    if (error) throw error;
    setSuppliers((prev) => [...prev, data]);
  };

  const updateSupplier = async (id: string, supplier: Partial<Supplier>) => {
    const { data, error } = await db
      .from("suppliers")
      .update(supplier)
      .eq("id", id)
      .single();
    if (error) throw error;
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  };

  const deleteSupplier = async (id: string) => {
    const { error } = await db.from("suppliers").delete().eq("id", id);
    if (error) throw error;
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SuppliersContext.Provider
      value={{ suppliers, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier }}
    >
      {children}
    </SuppliersContext.Provider>
  );
};

export const useSuppliers = () => {
  const context = useContext(SuppliersContext);
  if (!context) throw new Error("useSuppliers must be used within a SuppliersProvider");
  return context;
};