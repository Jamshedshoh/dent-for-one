import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Business = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <BusinessHeroSection />
      <BusinessResourcesSection />
      <Footer />
    </div>
  );
};

// Business Hero Section Component
const BusinessHeroSection = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto">
        <h1 className="text-5xl font-semibold">Business Information</h1>
        <p className="mt-4 text-lg">Explore opportunities, resources, and tools to expand your business within the dental ecosystem.</p>
      </div>
    </div>
  );
};

// Business Resources Section Component
const BusinessResourcesSection = () => {
  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Resources for Businesses</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Vendor Marketplace", description: "List your products and services on a platform used by thousands of dental professionals." },
            { title: "Analytics and Insights", description: "Leverage data to understand trends, improve offerings, and grow your market reach." },
            { title: "Compliance Support", description: "Ensure your products and services meet industry regulations and standards." },
            { title: "Marketing Opportunities", description: "Access tools to advertise your business directly to dental practices and patients." },
            { title: "Partnership Programs", description: "Collaborate with dental clinics and insurance providers to enhance your offerings." },
            { title: "API Integrations", description: "Seamlessly connect your services with the platform for a smooth user experience." }
          ].map((resource, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};