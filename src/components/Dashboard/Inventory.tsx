import React, { useState } from "react";

export const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Toothbrush",
      quantity: 150,
      price: 2.5,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Dental Floss",
      quantity: 50,
      price: 1.5,
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Teeth Whitening Kit",
      quantity: 20,
      price: 30,
      status: "In Stock",
    },
    // Add more mock data as needed
  ]);

  const handleAddItem = (name: string, quantity: number, price: number) => {
    setInventoryItems([
      ...inventoryItems,
      {
        id: inventoryItems.length + 1,
        name,
        quantity,
        price,
        status: quantity > 10 ? "In Stock" : "Low Stock",
      },
    ]);
  };

  const handleDeleteItem = (id: number) => {
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Inventory</h2>

      {/* Inventory Items List */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Inventory Items</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Item</th>
              <th className="px-4 py-2 text-left text-gray-700">Quantity</th>
              <th className="px-4 py-2 text-left text-gray-700">Price</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">${item.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-full ${
                      item.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Item */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Item</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = (e.target as any).name.value;
            const quantity = parseInt((e.target as any).quantity.value);
            const price = parseFloat((e.target as any).price.value);
            handleAddItem(name, quantity, price);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter item name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter quantity"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">
                Price per Unit
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Add Item
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
