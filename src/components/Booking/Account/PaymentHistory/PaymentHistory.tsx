import React, { useState } from "react";
import { ChevronDown, ChevronUp, CreditCard, FileText, DollarSign } from "lucide-react";
import { Layout } from "../Layout";
import { Search } from "../../../ui/Search";

interface Payment {
  id: string;
  date: string;
  status: 'paid' | 'unpaid';
  amount: number;
  invoiceNumber: string;
  treatment: string;
  procedures: string[];
  estimatedTotal?: number;
  totalPaidSoFar?: number;
}

const mockPayments: Payment[] = [
  {
    id: "P001",
    date: "2023-11-15",
    status: 'paid',
    amount: 1200,
    invoiceNumber: "INV-20231115-001",
    treatment: "Root Canal Treatment",
    procedures: ["Root Canal", "Crown Placement"],
    totalPaidSoFar: 1200
  },
  {
    id: "P002",
    date: "2023-09-10",
    status: 'paid',
    amount: 200,
    invoiceNumber: "INV-20230910-002",
    treatment: "Regular Checkup",
    procedures: ["Cleaning", "X-Ray"],
    totalPaidSoFar: 1400
  },
  {
    id: "P003",
    date: "2023-12-01",
    status: 'unpaid',
    amount: 500,
    invoiceNumber: "INV-20231201-003",
    treatment: "Teeth Whitening",
    procedures: ["Whitening Treatment"],
    estimatedTotal: 1900
  }
];

export const PaymentHistory = () => {
  const [expandedPayments, setExpandedPayments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePaymentExpand = (paymentId: string) => {
    setExpandedPayments((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const isPaymentExpanded = (paymentId: string) =>
    expandedPayments.includes(paymentId);

  const filteredPayments = mockPayments.filter(payment =>
    payment.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPaid = mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalUnpaid = mockPayments
    .filter(p => p.status === 'unpaid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Payment History</h2>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm">Paid: ${totalPaid}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-red-500" />
              <span className="text-sm">Unpaid: ${totalUnpaid}</span>
            </div>
          </div>
        </div>

        <Search query={searchQuery} onSearch={setSearchQuery} />

        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Payment Header */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => togglePaymentExpand(payment.id)}
              >
                <div className="flex items-center space-x-4">
                  <CreditCard className={`w-5 h-5 ${payment.status === 'paid' ? 'text-green-500' : 'text-red-500'}`} />
                  <div>
                    <h3 className="font-medium">{payment.treatment}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()} - 
                      <span className={`ml-2 ${payment.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                        {payment.status === 'paid' ? 'Paid' : 'Unpaid'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">${payment.amount}</span>
                  {isPaymentExpanded(payment.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {/* Payment Details (Collapsible) */}
              {isPaymentExpanded(payment.id) && (
                <div className="border-t border-gray-200">
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Payment Details
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Invoice:</span> {payment.invoiceNumber}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Date:</span> {new Date(payment.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Status:</span> 
                          <span className={`ml-1 ${payment.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                            {payment.status === 'paid' ? 'Paid' : 'Unpaid'}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Procedures
                      </h3>
                      <div className="space-y-2">
                        {payment.procedures.map((procedure, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <p className="text-sm">{procedure}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="p-4 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Financial Summary
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Amount:</span> ${payment.amount}
                      </p>
                      {payment.totalPaidSoFar && (
                        <p className="text-sm">
                          <span className="font-medium">Total Paid So Far:</span> ${payment.totalPaidSoFar}
                        </p>
                      )}
                      {payment.estimatedTotal && (
                        <p className="text-sm">
                          <span className="font-medium">Estimated Total:</span> ${payment.estimatedTotal}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredPayments.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No payments found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
