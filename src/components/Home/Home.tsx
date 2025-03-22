import { Link } from "react-router-dom";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import HeroImage from "../../assets/hero-picture.png";
import AppstoreImage from "../../assets/appstore.png";
import PlaystoreImage from "../../assets/playstore.png";

export const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <PricingSection />
      <TestimonialsSections />
      <Footer />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative bg-white py-20 px-6">
      <div className="container mx-auto py-20 flex justify-between">
        <div className="mt-20">
          <h1 className="text-5xl font-semibold">
            Empowering <span className="text-blue-400">Dentists</span>
            <br />
            to drive <span className="text-green-400">Influence of Caring</span>
          </h1>
          <p className="mt-4 text-lg">
            Connecting Dentists, Patients, and Vendors in one unified ecosystem.
          </p>
          <button className="mt-6 px-8 py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-800 transition">
            Get Started
          </button>
          <p className="flex space-x-3 py-10 w-96">
            <a href="#">
              <img src={AppstoreImage} />
            </a>
            <a href="#">
              <img src={PlaystoreImage} />
            </a>
          </p>
        </div>
        <div className="w-2/6">
          <img
            className="object-cover w-full h-full"
            src={HeroImage}
            alt="Platform connects Dentists, Patients, and Vendors in one unified ecosystem."
          />
        </div>
      </div>
    </div>
  );
};

// Products Section Component
const ProductsSection = () => {
  const cards = [
    {
      title: "Shop App",
      description:
        "Create your own online shop effortlessly and start selling in minutes. Generate affiliate links automatically to expand your reach and maximize earnings. With one-click sales, streamline the buying process for a seamless shopping experience.",
      href: "/shop",
    },
    {
      title: "Booking App",
      description:
        "Schedule appointments effortlessly with a simple click and seamless syncing. Stay organized as your bookings automatically update across your calendar. Enjoy automated follow-ups for confirmations, ensuring a smooth and hassle-free experience.",
      href: "/booking",
    },
    {
      title: "Social Share App",
      description:
        "Create your own membership spot to engage, share testimonies, and vibe with your social fam. Easily publish AI-generated or personal content to popular social platforms. Stay connected with a built-in vibe check for the perfect community feel.",
      href: "/social-share",
    },
    {
      title: "Care App",
      description:
        "Stay on top of your daily dental habits with smart notifications and reminders. Follow a customized checklist designed by dentists to keep your oral care on track. Make dental hygiene effortless with guided tasks and timely alerts.",
      href: "/care",
    },
  ];

  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 overflow-x-auto">
          {cards.map((card, idx) => (
            <div key={idx}>
              <div className="p-4">
                <h3 className={`text-lg font-semibold`}>{card.title}</h3>
                <p className="text-gray-600 mt-2">{card.description}</p>
              </div>
              <div className="p-4">
                <Link
                  to={card.href}
                  className={`mt-4 px-6 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-700`}
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Pricing Section Component
const PricingSection = () => {
  const plans = [
    {
      title: "Minimal",
      description:
        "Perfect for individuals and freelancers. Access essential features to get started with ease and efficiency.",
      price: "$9.99 / month",
      href: "/pricing/minimal",
      features: [
        "Basic support",
        "Access to essential features",
        "1 user account",
        "Monthly updates",
      ],
    },
    {
      title: "Professional",
      description:
        "Designed for small businesses. Unlock advanced features, priority support, and tools to enhance your productivity.",
      price: "$19.99 / month",
      href: "/pricing/professional",
      features: [
        "Priority support",
        "Advanced features",
        "Up to 5 user accounts",
        "Weekly updates",
      ],
    },
    {
      title: "Business",
      description:
        "Tailored for growing teams. Enjoy collaborative features, dedicated support, and scalable solutions to drive your success.",
      price: "$49.99 / month",
      href: "/pricing/business",
      features: [
        "Dedicated support",
        "Collaborative tools",
        "Up to 20 user accounts",
        "Daily updates",
      ],
    },
    {
      title: "Enterprise",
      description:
        "Custom solutions for large organizations. Benefit from personalized support, advanced security, and tailored features to meet your unique needs.",
      price: "Contact Us",
      href: "/pricing/enterprise",
      features: [
        "Personalized support",
        "Advanced security features",
        "Unlimited user accounts",
        "Custom solutions and integrations",
      ],
    },
  ];

  return (
    <div id="pricing" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 overflow-x-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 shadow-lg flex flex-col justify-between h-full"
            >
              <div>
                <h3 className={`text-lg font-semibold`}>{plan.title}</h3>
                <h4>Starting at</h4>
                <p className="text-xl font-bold mt-4">{plan.price}</p>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <div className="mt-2">
                  <ul className="list-disc list-inside space-y-1">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-600 flex items-center"
                      >
                        <span className="mr-2">✔️</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to={plan.href}
                  className={`mt-4 px-6 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-700`}
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSections = () => {
  const testimonials = [
    {
      name: "Dr. John Smith",
      feedback: "This platform has transformed my practice. Highly recommend!",
      position: "Dentist at Smile Clinic",
      avatar: "path/to/dr_john_smith_avatar.png", // Add avatar path
    },
    {
      name: "Dr. Emily Johnson",
      feedback: "An invaluable tool for connecting with patients and vendors.",
      position: "Orthodontist at Bright Smiles",
      avatar: "path/to/dr_emily_johnson_avatar.png", // Add avatar path
    },
    {
      name: "Dr. Michael Brown",
      feedback: "The best decision I made for my practice. Excellent support!",
      position: "Pediatric Dentist at Happy Teeth",
      avatar: "path/to/dr_michael_brown_avatar.png", // Add avatar path
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-lg flex flex-col space-y-4"
            >
              <div className="flex justify-center pt-5">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                  className="w-24 h-24 rounded-full bg-blue-500"
                />
              </div>
              <div className="flex justify-center text-center py-4">
                <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
              </div>
              <div className="flex flex-col items-center justify-center mb-4">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-500">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
