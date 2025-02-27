import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { db } from "../../database/client";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  image_url?: string;
  created_at: string;
}

interface ProductsContextType {
  products: Product[];
  fetchProducts: () => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  createProduct: (data: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const { data, error } = await db
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id: string, data: Partial<Product>) => {
    try {
      const { error } = await db
        .from('products')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const { error } = await db
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }, [fetchProducts]);

  const createProduct = async (data: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const { error } = await db
        .from('products')
        .insert(data);

      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  const uploadImage = async (file: File) => {
    const { data, error } = await db.storage
      .from("product-images")
      .upload(`products/${file.name}`, file);
  
    if (error) throw error;
    return data.path;
  };

  return (
    <ProductsContext.Provider value={{ 
      products, 
      fetchProducts, 
      updateProduct, 
      deleteProduct, 
      createProduct 
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
