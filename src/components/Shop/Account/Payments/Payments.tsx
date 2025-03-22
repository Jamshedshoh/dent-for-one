import React, { useEffect, useState } from "react";
import { usePayments } from "../../../../contexts";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Payment } from "../../../../contexts/PaymentsContext";
import { Layout } from "../Layout";

export const Payments = () => {
  const { payments, fetchPayments, updatePaymentStatus } = usePayments();
  const [expandedPayments, setExpandedPayments] = useState<number[]>([]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const togglePaymentExpand = (paymentId: number) => {
    setExpandedPayments((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const isPaymentExpanded = (paymentId: number) =>
    expandedPayments.includes(paymentId);

  const getStatusIcon = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Payments History
        </h2>

        <div className="space-y-4">
          {payments.map((payment) => (
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
                  {getStatusIcon(payment.status)}
                  <div>
                    <h3 className="font-medium">Payment #{payment.id}</h3>
                    <p className="text-sm text-gray-500">
                      Order #{payment.order_id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-medium text-blue-600">
                    ${payment.amount.toFixed(2)}
                  </span>
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
                        Payment Information
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Method:</span>{" "}
                          {payment.payment_method}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Status:</span>
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium
                          ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                          >
                            {payment.status.charAt(0).toUpperCase() +
                              payment.status.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Order Information
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">User ID:</span>{" "}
                          {payment.order.user_id}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Shipping Address:</span>
                          <br />
                          {payment.order.shipping_address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-gray-50 flex justify-end">
                    <select
                      value={payment.status}
                      onChange={(e) =>
                        updatePaymentStatus(
                          payment.id,
                          e.target.value as Payment["status"]
                        )
                      }
                      className="text-sm border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}

          {payments.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No payments found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
