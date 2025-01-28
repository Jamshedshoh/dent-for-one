import { createContext, useContext, useState, ReactNode } from "react";
import { db } from "../../database/client";
import { useAuth } from "./AuthContext";

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  created_at: string;
  order: {
    user_id: string;
    shipping_address: string;
  };
}

interface PaymentsContextType {
  payments: Payment[];
  fetchPayments: () => Promise<void>;
  updatePaymentStatus: (id: number, status: Payment['status']) => Promise<void>;
}

const PaymentsContext = createContext<PaymentsContextType | null>(null);

export const PaymentsProvider = ({ children }: { children: ReactNode }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { user } = useAuth();

  const fetchPayments = async () => {
    if (!user) return;

    try {
      const { data, error } = await db
        .from('payments')
        .select(`
          *,
          order:orders (
            user_id,
            shipping_address
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  };

  const updatePaymentStatus = async (id: number, status: Payment['status']) => {
    try {
      const { error } = await db
        .from('payments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchPayments();
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  };

  return (
    <PaymentsContext.Provider value={{ payments, fetchPayments, updatePaymentStatus }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error("usePayments must be used within a PaymentsProvider");
  }
  return context;
};
