import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../../database/client";

type Payment = {
  id: number;
  customer: string;
  amount: number;
  date: string;
  status: string;
};

type PaymentsContextType = {
  payments: Payment[];
  addPayment: (payment: Omit<Payment, "id">) => Promise<void>;
  fetchPayments: () => Promise<void>;
};

const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);

export const PaymentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  // Fetch payments from Supabase
  const fetchPayments = async () => {
    const { data, error } = await db.from("payments").select();
    if (error) console.error("Error fetching payments:", error);
    else setPayments(data);
  };

  // Add a new payment
  const addPayment = async (payment: Omit<Payment, "id">) => {
    const { data, error } = await db.from("payments").insert([payment]).select();
    if (error) console.error("Error adding payment:", error);
    else setPayments((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <PaymentsContext.Provider value={{ payments, addPayment, fetchPayments }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentsContext);
  if (!context) throw new Error("usePayments must be used within a PaymentsProvider");
  return context;
};
