import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Community = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <CommunityHero />
      <CommunityContent />
      <Footer />
    </div>
  );
};

const CommunityHero = () => {
  return (
    <div className="relative bg-green-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto py-20">
        <h1 className="text-5xl font-semibold">Join Our Community</h1>
        <p className="mt-4 text-lg">
          Engage with peers, share insights, and grow together.
        </p>
      </div>
    </div>
  );
};

const CommunityContent = () => {
  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Community Highlights
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Forums",
              description:
                "Discuss and resolve queries with experts and peers.",
              color: "red",
            },
            {
              title: "Events",
              description:
                "Participate in webinars, workshops, and live sessions.",
              color: "blue",
            },
            {
              title: "Resources",
              description:
                "Access exclusive articles, guides, and case studies.",
              color: "yellow",
            },
            {
              title: "Support",
              description:
                "Collaborate and seek guidance on challenging cases.",
              color: "green",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-white shadow-md rounded-lg overflow-hidden border-t-4 border-${item.color}-600`}
            >
              <div className="p-4">
                <h3 className={`text-lg font-semibold text-${item.color}-600`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  className={`mt-4 px-6 py-2 bg-${item.color}-600 text-white rounded-lg hover:bg-${item.color}-700`}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
