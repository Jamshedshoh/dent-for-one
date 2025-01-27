import React, { useState } from "react";
import { useOrders } from "../../contexts";

export const Orders = () => {
  const { orders, addOrder } = useOrders();
  const [customer, setCustomer] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !totalAmount) return;
    
    await addOrder({
      customer,
      totalAmount: parseFloat(totalAmount),
      status: "Pending",
    });

    setCustomer("");
    setTotalAmount("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>

      {/* Orders List */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Order List</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Customer</th>
              <th className="px-4 py-2 text-left text-gray-700">Total Amount</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id}>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">${order.totalAmount}</td>
                <td className="px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Order */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Order</h3>

        <form onSubmit={handleAddOrder} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Total Amount ($)
            </label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter total amount"
            />
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Add Order
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
