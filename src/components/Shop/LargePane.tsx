export const LargePane = ({ category }: any) => {
  return (
    <div className="absolute left-0 w-full bg-white shadow-lg py-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {category.subcategories.map((subcategory: any) => (
            <button
              key={subcategory}
              className="block w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-gray-800 text-left px-4 py-2 rounded transition"
            >
              {subcategory}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};