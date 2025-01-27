import { useState } from "react";
import { usePayments } from "../../contexts";

export const Payments = () => {
  const { payments, addPayment } = usePayments();
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState(0);

  const handleAddPayment = async () => {
    await addPayment({
      customer,
      amount,
      date: new Date().toISOString(),
      status: "Pending",
    });
    setCustomer("");
    setAmount(0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Payments</h2>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Payment Records
        </h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Customer</th>
              <th className="px-4 py-2 text-left text-gray-700">Amount</th>
              <th className="px-4 py-2 text-left text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-4 py-2">{payment.customer}</td>
                <td className="px-4 py-2">${payment.amount}</td>
                <td className="px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Payment
        </h3>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full mb-4"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-3 border border-gray-300 rounded-lg w-full mb-4"
        />
        <button
          onClick={handleAddPayment}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg"
        >
          Add Payment
        </button>
      </section>
    </div>
  );
};
