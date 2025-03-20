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
      <ServicesSection />
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

// Services Section Component
const ServicesSection = () => {
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
                  className={`mt-4 px-6 py-2 outline outline-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white`}
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
