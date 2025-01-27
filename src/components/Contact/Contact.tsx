import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Contact = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <ContactHeroSection />
      <ContactFormSection />
      <Footer />
    </div>
  );
};

// Contact Hero Section Component
const ContactHeroSection = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto py-20">
        <h1 className="text-5xl font-semibold">Get in Touch</h1>
        <p className="mt-4 text-lg">
          We are here to assist you. Reach out to us for any queries or support.
        </p>
      </div>
    </div>
  );
};

// Contact Form Section Component
const ContactFormSection = () => {
  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Contact Us
        </h2>
        <form className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
