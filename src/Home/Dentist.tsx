import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Dentist = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <DentistHeroSection />
      <DentistResourcesSection />
      <Footer />
    </div>
  );
};

// Dentist Hero Section Component
const DentistHeroSection = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto">
        <h1 className="text-5xl font-semibold">Dentist Information</h1>
        <p className="mt-4 text-lg">Access tools, resources, and tips to enhance your practice and deliver exceptional care.</p>
      </div>
    </div>
  );
};

// Dentist Resources Section Component
const DentistResourcesSection = () => {
  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Resources for Dentists</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Practice Management", description: "Discover tools to manage schedules, patient records, and billing efficiently." },
            { title: "Continuing Education", description: "Access courses and webinars to stay updated on the latest in dental care." },
            { title: "Supply Management", description: "Find reliable vendors for dental supplies and streamline your inventory." },
            { title: "Patient Engagement", description: "Learn strategies to enhance patient satisfaction and retention." },
            { title: "Telehealth Integration", description: "Explore how to incorporate virtual consultations into your practice." },
            { title: "Compliance Tips", description: "Ensure your practice adheres to regulatory requirements and data security protocols." }
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