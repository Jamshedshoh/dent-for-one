import { Layout } from "../Layout";

export const Favorites = () => {
  const mockSavedItems = [
    {
      id: 1,
      name: "Electric Toothbrush Pro",
      price: 79.99,
      image: "https://via.placeholder.com/150",
      savedDate: "2023-07-15",
      type: "product",
    },
    {
      id: 2,
      name: "Teeth Whitening Kit",
      price: 49.99,
      image: "https://via.placeholder.com/150",
      savedDate: "2023-08-01",
      type: "product",
    },
    {
      id: 3,
      name: "Dental Checkup Appointment",
      price: 120.0,
      image: "https://via.placeholder.com/150",
      savedDate: "2023-08-10",
      type: "appointment",
    },
  ];

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Saved Items</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSavedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                {item.type === "product" ? (
                  <>
                    <p className="text-gray-600 mb-2">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Saved on {new Date(item.savedDate).toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add to Cart
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 mb-2">
                      Appointment saved on{" "}
                      {new Date(item.savedDate).toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Book Now
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
