import { Footer } from '../Footer';
import { Navbar } from '../Navbar';

export const Patient = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <InfoHeroSection />
      <PatientTipsSection />
      <Footer />
    </div>
  );
};

// Info Hero Section Component
const InfoHeroSection = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto">
        <h1 className="text-5xl font-semibold">Patient Information</h1>
        <p className="mt-4 text-lg">Learn more about dental care, treatments, and how we can help you maintain a healthy smile.</p>
      </div>
    </div>
  );
};

// Patient Tips Section Component
const PatientTipsSection = () => {
  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Dental Care Tips</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Regular Check-Ups", description: "Visit your dentist every six months for a routine check-up and cleaning." },
            { title: "Proper Brushing", description: "Brush your teeth twice a day with fluoride toothpaste to prevent cavities and gum disease." },
            { title: "Healthy Diet", description: "Maintain a balanced diet and limit sugary snacks to keep your teeth healthy." },
            { title: "Flossing", description: "Floss daily to remove plaque and food particles between teeth." },
            { title: "Emergency Care", description: "Know how to handle dental emergencies, like a knocked-out tooth or severe pain." },
            { title: "Hydration", description: "Drink plenty of water to help wash away food particles and bacteria." }
          ].map((tip, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};