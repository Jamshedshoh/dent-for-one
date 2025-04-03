import { Layout } from "../Layout";

export const Resources = () => {
  return (
    <Layout>
      <div className="container p-6 mx-auto space-y-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for dental tips..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">All (3)</h2>
          <ul className="flex space-x-4 text-blue-700">
            <li className="cursor-pointer hover:underline">Techniques (1)</li>
            <li className="cursor-pointer hover:underline">Hygiene (1)</li>
            <li className="cursor-pointer hover:underline">Nutrition (1)</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Proper Brushing Technique
            </h3>
            <p className="text-gray-600 mb-4">
              Brush your teeth for two minutes at least twice a day. Hold your
              toothbrush at a 45-degree angle to your gums and use short, gentle
              strokes. Make sure to brush all...
            </p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors">
              Learn more
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Benefits of Daily Flossing
            </h3>
            <p className="text-gray-600 mb-4">
              Flossing removes plaque and food particles from between your teeth
              and under the gumline, areas your toothbrush can't reach. Daily
              flossing helps prevent gum...
            </p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors">
              Learn more
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Diet and Dental Health
            </h3>
            <p className="text-gray-600 mb-4">
              What you eat affects your dental health. Limit sugary and acidic
              foods and drinks, as they can erode enamel and lead to cavities.
              Opt for calcium-rich foods like...
            </p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
