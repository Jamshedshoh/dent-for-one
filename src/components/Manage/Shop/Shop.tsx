import {
  Package,
  Plus,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  AlertTriangle,
  ShoppingCart,
  BarChart2,
  Settings,
  Trash2,
  Edit,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout";

export const Shop = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Composite Resin A2",
      category: "Restorative",
      stock: 12,
      threshold: 5,
      price: 45.99,
      supplier: "Dental Supplies Inc.",
      lastOrdered: "2023-06-15",
      status: "adequate",
    },
    {
      id: 2,
      name: "Disposable Bibs (100pk)",
      category: "Disposables",
      stock: 3,
      threshold: 10,
      price: 24.5,
      supplier: "Oral Care Co.",
      lastOrdered: "2023-06-10",
      status: "low",
    },
    {
      id: 3,
      name: "PFM Crown Kit",
      category: "Prosthetics",
      stock: 8,
      threshold: 3,
      price: 189.0,
      supplier: "Crown Materials Ltd",
      lastOrdered: "2023-06-18",
      status: "adequate",
    },
    {
      id: 4,
      name: "Local Anesthetic Carpules",
      category: "Medication",
      stock: 25,
      threshold: 15,
      price: 12.75,
      supplier: "Dental Pharma",
      lastOrdered: "2023-06-05",
      status: "adequate",
    },
    {
      id: 5,
      name: "Surgical Masks (50pk)",
      category: "PPE",
      stock: 1,
      threshold: 5,
      price: 18.99,
      supplier: "SafeDent Supplies",
      lastOrdered: "2023-05-28",
      status: "critical",
    },
  ];

  // Sample order history
  const orders = [
    {
      id: 1001,
      date: "2023-06-18",
      supplier: "Crown Materials Ltd",
      items: 3,
      total: 567.0,
      status: "delivered",
    },
    {
      id: 1002,
      date: "2023-06-10",
      supplier: "Oral Care Co.",
      items: 5,
      total: 245.5,
      status: "delivered",
    },
    {
      id: 1003,
      date: "2023-06-05",
      supplier: "Dental Pharma",
      items: 2,
      total: 89.25,
      status: "processing",
    },
  ];

  // Filter products based on search and status
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter by stock status
  const criticalStock = products.filter((p) => p.status === "critical");
  const lowStock = products.filter((p) => p.status === "low");

  return (
    <Layout>
      <div className="container mx-auto bg-gray-50">     
        {/* Main Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Products
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {products.length}
                  </p>
                </div>
                <Package className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Low Stock Items
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {lowStock.length}
                  </p>
                </div>
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Critical Stock
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {criticalStock.length}
                  </p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "inventory"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("inventory")}
            >
              Inventory
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "orders"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "suppliers"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("suppliers")}
            >
              Suppliers
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "reports"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </button>
          </div>

          {/* Inventory Tab */}
          {activeTab === "inventory" && (
            <div>
              {/* Search and Actions */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Plus className="mr-2 h-5 w-5" /> Add Product
                    </button>
                    <div className="relative">
                      <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>All Categories</option>
                        <option>Restorative</option>
                        <option>Disposables</option>
                        <option>Prosthetics</option>
                        <option>PPE</option>
                        <option>Medication</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Threshold
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Supplier
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {product.category}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm font-medium ${
                                  product.status === "critical"
                                    ? "text-red-600"
                                    : product.status === "low"
                                    ? "text-yellow-600"
                                    : "text-gray-900"
                                }`}
                              >
                                {product.stock}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {product.threshold}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ${product.price.toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {product.supplier}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setShowReorderModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900 p-1"
                                  title="Reorder"
                                >
                                  <ShoppingCart className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    // Would open edit modal in a real app
                                  }}
                                  className="text-gray-600 hover:text-gray-900 p-1"
                                  title="Edit"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No products found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                      <Plus className="mr-2 h-5 w-5" /> New Order
                    </button>
                    <div className="relative">
                      <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>All Statuses</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Order #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Supplier
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Items
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">
                              #{order.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {order.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {order.supplier}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {order.items}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ${order.total.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status === "delivered"
                                ? "Delivered"
                                : "Processing"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 p-1">
                                <Edit className="h-5 w-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 p-1">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Suppliers Tab */}
          {activeTab === "suppliers" && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Supplier Management
              </h3>
              <p className="text-gray-600 mb-4">
                Manage your dental suppliers and vendors
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Coming Soon
              </button>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <BarChart2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Inventory Reports
              </h3>
              <p className="text-gray-600 mb-4">
                Generate detailed reports on your dental inventory
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Coming Soon
              </button>
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add New Product
                </h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="e.g. Composite Resin A2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                        <option>Restorative</option>
                        <option>Disposables</option>
                        <option>Prosthetics</option>
                        <option>PPE</option>
                        <option>Medication</option>
                        <option>Equipment</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Stock
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reorder Threshold
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Minimum stock level"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                        <option>Dental Supplies Inc.</option>
                        <option>Oral Care Co.</option>
                        <option>Crown Materials Ltd</option>
                        <option>Dental Pharma</option>
                        <option>SafeDent Supplies</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]"
                      placeholder="Additional product information..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle add product logic
                    setShowAddProductModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reorder Modal */}
        {showReorderModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Reorder {selectedProduct.name}
                </h3>
                <button
                  onClick={() => setShowReorderModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Current Stock:{" "}
                    <span className="font-medium text-gray-900">
                      {selectedProduct.stock}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Threshold:{" "}
                    <span className="font-medium text-gray-900">
                      {selectedProduct.threshold}
                    </span>
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity to Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue={selectedProduct.threshold * 2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <div className="relative">
                    <select
                      defaultValue={selectedProduct.supplier}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none"
                    >
                      <option>Dental Supplies Inc.</option>
                      <option>Oral Care Co.</option>
                      <option>Crown Materials Ltd</option>
                      <option>Dental Pharma</option>
                      <option>SafeDent Supplies</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value="standard"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Standard (5-7 days)
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value="rush"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Rush (2-3 days)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowReorderModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle reorder logic
                    setShowReorderModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
