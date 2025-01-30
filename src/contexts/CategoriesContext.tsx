import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { db } from "../../database/client";

interface Category {
  id: number;
  name: string;
}

interface CategoriesContextType {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (id: number, name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await db.from("categories").select("*");
    if (error) throw error;
    setCategories(data || []);
  }, []);

  fetchCategories();

  const addCategory = async (name: string) => {
    const { data, error } = await db.from("categories").insert({ name }).single();
    if (error) throw error;
    setCategories((prev) => [...prev, data]);
  };

  const updateCategory = async (id: number, name: string) => {
    const { data, error } = await db.from("categories").update({ name }).eq("id", id).single();
    if (error) throw error;
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteCategory = async (id: number) => {
    const { error } = await db.from("categories").delete().eq("id", id);
    if (error) throw error;
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, fetchCategories, addCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error("useCategories must be used within a CategoriesProvider");
  return context;
};