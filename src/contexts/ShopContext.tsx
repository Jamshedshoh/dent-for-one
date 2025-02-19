import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { db } from "../../database/client";

export type Product = {
  id: string;
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

interface Subcategory {
  name: string;
  displayName: string;
  slug: string;
}

interface Category {
  name: string;
  displayName: string;
  slug: string;
  categories: {
    name: string;
    displayName: string;
    slug: string;
    subcategories: Subcategory[];
  }[];
}

interface ShopContextType {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  categories: Category[];

  filters: {
    category: string;
    priceRange: [number, number];
    subcategory: string;
  };
  fetchProductById: (productId: string) => any;
  setFilters: (filters: {
    category: string;
    priceRange: [number, number];
  }) => void;
  applyFilters: (filteredProducts: Product[]) => Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void; // Changed to string
  updateQuantity: (productId: string, quantity: number) => void; // Changed to string
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<{
    category: string; // This will now hold a list of slugs
    priceRange: [number, number];
  }>({
    category: "", // This can be a comma-separated string of slugs
    priceRange: [0, 1000],
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchProducts = async () => {
    const { data, error } = await db.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      return;
    }

    setProducts(data);
    setFeaturedProducts(data.filter((p) => p.is_featured));
    setNewArrivals(
      [...data]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 10)
    );
  };

  const fetchCategories = async () => {
    const { data, error } = await db
      .from("categories")
      .select("*")
      .order("position");
    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }
    setCategories(data);
  };

  const applyFilters = (filteredProducts: Product[]): Product[] => {
    const condition1 = (product: any) =>
      filters.category
        ? product.category
            .split(",")
            .map((i: string) => i.trim())
            .includes(filters.category)
        : true;

    const condition2 = (product: any) =>
      filters.subcategory
        ? product.category
            .split(",")
            .map((i: string) => i.trim())
            .includes(filters.subcategory)
        : true;

    return filteredProducts.filter(condition1).filter(condition2);
  };

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    // Changed to string
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    // Changed to string
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const fetchProductById = async (id: string) => {
    try {
      const { data, error } = await db
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Could not fetch product from ", error);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        fetchProductById,
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
