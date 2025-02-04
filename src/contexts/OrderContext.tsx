import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useShop } from './ShopContext';
import { db } from '../../database/client';

interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shipping_address: string;
  created_at: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (shippingAddress: string) => Promise<void>;
  getOrders: () => Promise<void>;
  cancelOrder: (orderId: number) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();
  const { cartItems, clearCart } = useShop();

  const createOrder = async (shippingAddress: string) => {
    if (!user) throw new Error('User must be logged in');
    
    try {
      const { data, error } = await db
        .from('orders')
        .insert({
          user_id: user.id,
          total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          status: 'pending',
          shipping_address: shippingAddress,
        })
        .select()
        .single();

      if (error) throw error;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: data.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await db
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear the cart after successful order creation
      clearCart();
      await getOrders();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const getOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await db
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const cancelOrder = async (orderId: number) => {
    try {
      const { error } = await db
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId);

      if (error) throw error;
      await getOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrders, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 