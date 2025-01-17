// Import necessary libraries
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto py-20">
        <h1 className="text-5xl font-semibold">
          Welcome to the Dental SaaS Platform
        </h1>
        <p className="mt-4 text-lg">
          Connecting Dentists, Patients, and Vendors in one unified ecosystem.
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

// Services Section Component
const ServicesSection = () => {
  const cards = [
    {
      title: "Patients",
      description:
        "Search for dentists, book appointments, access medical records, and more.",
      color: "blue",
      href: "/patient",
    },
    {
      title: "Dentists",
      description:
        "Manage your practice, schedule appointments, and interact with patients seamlessly.",
      color: "green",
      href: "/dentist",
    },
    {
      title: "Business",
      description:
        "Showcase and sell dental products, track sales, and expand your reach.",
      color: "purple",
      href: "/business",
    },
  ];

  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Our Services
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-white shadow-md rounded-lg overflow-hidden border-t-4 border-${card.color}-600`}
            >
              <div className="p-4">
                <h3 className={`text-lg font-semibold text-${card.color}-600`}>
                  {card.title}
                </h3>
                <p className="text-gray-600 mt-2">{card.description}</p>
              </div>
              <div className="p-4">
                <a
                  href={card.href}
                  className={`mt-4 px-6 py-2 bg-${card.color}-600 text-white rounded-lg hover:bg-${card.color}-700`}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
