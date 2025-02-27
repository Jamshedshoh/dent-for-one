import { useState } from "react";
import { useSuppliers } from "../../../contexts/SuppliersContext";
import { Plus, Edit, Trash } from "lucide-react";
import { Search } from "../../ui/Search";
import { Modal } from "../../ui/Modal";
import { CollapseCard } from "../../ui/CollapseCard";

export const Suppliers = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } =
    useSuppliers();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const supplierData = {
      name: formData.get("name") as string,
      contact_email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    };

    try {
      if (editId !== null) {
        await updateSupplier(editId, supplierData);
        setEditId(null);
      } else {
        await addSupplier(supplierData);
      }
      setIsAddFormOpen(false);
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    try {
      await deleteSupplier(id);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const supplierActions = (supplierId: string) => {
    return [
      <button
        onClick={() => setEditId(supplierId)}
        className="text-blue-500 hover:text-blue-600"
        aria-label="Edit"
        title="Edit"
      >
        <Edit />
      </button>,
      <button
        onClick={() => setDeleteId(supplierId)}
        className="text-red-500 hover:text-red-600"
        aria-label="Delete"
        title="Delete"
      >
        <Trash />
      </button>,
    ];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Supplier</span>
          </button>
        </div>

        <Search query={searchQuery} onSearch={setSearchQuery} />

        {/* Suppliers List */}
        <div className="space-y-4">
          {filteredSuppliers.map((supplier) => (
            <CollapseCard
              key={supplier.id}
              title={supplier.name}
              actions={supplierActions(supplier.id)}
            >
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  {supplier.contact_email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {supplier.phone}
                </div>
                <div>
                  <span className="font-medium">Address:</span>{" "}
                  {supplier.address}
                </div>
              </div>
            </CollapseCard>
          ))}
        </div>

        <Modal
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          title={`Delete Supplier ${deleteId}`}
        >
          <div className="p-4">
            <p>Are you sure you want to delete this supplier?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          title="Add New Supplier"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddFormOpen(false);
                  setEditId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {editId !== null ? "Update" : "Add"} Supplier
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={editId !== null}
          onClose={() => {
            setIsAddFormOpen(false);
            setEditId(null);
          }}
          title={`Edit Supplier ${editId}`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={
                  suppliers.find((s) => s.id === editId)?.name || ""
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={
                  suppliers.find((s) => s.id === editId)?.contact_email || ""
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={
                  suppliers.find((s) => s.id === editId)?.phone || ""
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={
                  suppliers.find((s) => s.id === editId)?.address || ""
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {editId !== null ? "Update" : "Add"} Supplier
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};
