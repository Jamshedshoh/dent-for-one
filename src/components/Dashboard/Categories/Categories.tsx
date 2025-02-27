import { useState } from "react";
import { useCategories } from "../../../contexts/CategoriesContext";
import { Plus, Edit, Trash, ChevronDown } from "lucide-react";
import { Search } from "../../ui/Search";
import { CollapseCard } from "../../ui/CollapseCard";
import { Modal } from "../../ui/Modal";

export const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategories();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      if (editId !== null) {
        await updateCategory(editId, name);
        setEditId(null);
      } else {
        await addCategory(name);
      }
      setIsAddFormOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;

    try {
      await deleteCategory(id);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const categoryActions = (categoryId: string) => {
    return [
      <button
        onClick={() => setEditId(categoryId)}
        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
        aria-label="Edit"
        title="Edit"
      >
        <Edit />
      </button>,
      <button
        onClick={() => deleteCategory(categoryId)}
        className="flex items-center space-x-1 text-red-600 hover:text-red-800"
        aria-label="Delete"
        title="Delete"
      >
        <Trash />
      </button>,
    ];
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>

        <Search query={searchQuery} onSearch={setSearchQuery} />

        {/* Categories List */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <CollapseCard
              key={category.id}
              title={category.name}
              actions={categoryActions(category.id)}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                {category.slug && (
                  <p className="text-gray-600">Slug: {category.slug}</p>
                )}
                {category.displayName && (
                  <p className="text-gray-600">
                    Display Name: {category.displayName}
                  </p>
                )}
                {category.categories && category.categories.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium">Subcategories:</h3>
                    <ul className="list-disc list-inside">
                      {category.categories.map((subCategory) => (
                        <li key={subCategory.id} className="text-gray-600">
                          {subCategory.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CollapseCard>
          ))}
        </div>

        <Modal
          isOpen={isAddFormOpen}
          onClose={() => {
            setIsAddFormOpen(false);
            setEditId(null);
          }}
          title="Add New Category"
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
                Add Category
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={editId !== null}
          onClose={() => {
            setEditId(null);
          }}
          title="Edit Category"
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
            </div>
            <div className="mt-6 flex justify-end space-x-2">
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
                Update Category
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          title={`Delete Category ${deleteId}`}
        >
          <div className="p-4">
            <p>Are you sure you want to delete this category?</p>
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
      </div>
    </div>
  );
};
