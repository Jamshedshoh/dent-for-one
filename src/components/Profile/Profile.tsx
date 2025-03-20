import { useParams } from "react-router-dom";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Profile = () => {
  const { username } = useParams();

  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="min-h-screen px-5 py-20 container mx-auto">
        <h1 className="text-3xl font-semibold mb-6">{username}'s Profile</h1>

        {/* Section for Sale Products */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Sale Products</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>List of products available for sale will go here.</p>
            {/* Example product item */}
            <div className="border-b py-2">
              <h3 className="font-medium">Product Name</h3>
              <p className="text-gray-600">Description of the product.</p>
              <p className="text-blue-600">Price: $XX.XX</p>
            </div>
          </div>
        </section>

        {/* Section for Booking Appointment */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>Form to book an appointment will go here.</p>
            {/* Example appointment form */}
            <form>
              <input type="date" className="border rounded p-2 mb-4" />
              <input type="time" className="border rounded p-2 mb-4" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Book Appointment</button>
            </form>
          </div>
        </section>

        {/* Section for Donation */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Support Us with a Donation</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>Your contributions help us provide better services.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded">Donate Now</button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};
