import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { db } from "../../database/client";

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  is_featured: boolean;
  created_at: string;
  image: string;
};

interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  categories: string[];
  filters: { category: string; priceRange: [number, number] };
  setFilters: (filters: { category: string; priceRange: [number, number] }) => void;
  applyFilters: (filteredProducts: Product[]) => Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ category: string; priceRange: [number, number] }>({
    category: "",
    priceRange: [0, 1000],
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await db.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      return;
    }

    setProducts(data);
    setFeaturedProducts(data.filter((p) => p.is_featured));
    setNewArrivals([...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10));
    setCategories([...new Set(data.map((p) => p.category))]);
  };

  const applyFilters = (filteredProducts: Product[]): Product[] => {
    return filteredProducts.filter(
      (product) =>
        (filters.category ? product.category === filters.category : true) &&
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        featuredProducts,
        newArrivals,
        categories,
        filters,
        setFilters,
        applyFilters,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
