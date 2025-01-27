import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../../database/client";

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
};

type ProductsContextType = {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await db.from("products").select();
    if (error) console.error("Error fetching products:", error);
    else setProducts(data || []);
  };

  // Add a new product
  const addProduct = async (product: Omit<Product, "id">) => {
    const { data, error } = await db.from("products").insert(product).select();
    if (error) console.error("Error adding product:", error);
    else setProducts((prev) => [...prev, ...(data || [])]);
  };

  // Update a product
  const updateProduct = async (id: number, product: Partial<Product>) => {
    const { data, error } = await db.from("products").update(product).eq("id", id).select();
    if (error) console.error("Error updating product:", error);
    else setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...product } : p)));
  };

  // Delete a product
  const deleteProduct = async (id: number) => {
    const { error } = await db.from("products").delete().eq("id", id);
    if (error) console.error("Error deleting product:", error);
    else setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within a ProductsProvider");
  return context;
};
