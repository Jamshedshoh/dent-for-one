import React, { useState } from "react";

// Landing Page Form
const LandingPageForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [pageDetails, setPageDetails] = useState({
    title: "",
    description: "",
    cta: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPageDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pageDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-700">Create Landing Page</h3>
      <div>
        <label className="block text-gray-700">Page Title</label>
        <input
          type="text"
          name="title"
          value={pageDetails.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter page title"
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={pageDetails.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter page description"
        />
      </div>
      <div>
        <label className="block text-gray-700">Call to Action (CTA)</label>
        <input
          type="text"
          name="cta"
          value={pageDetails.cta}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter CTA text"
        />
      </div>
      <div>
        <label className="block text-gray-700">Upload Image</label>
        <input
          type="file"
          name="image"
          onChange={(e) => setPageDetails({ ...pageDetails, image: e.target.files?.[0]?.name || "" })}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>
      <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
        Create Landing Page
      </button>
    </form>
  );
};

// Campaign Management Form
const CampaignForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    budget: "",
    targetAudience: "",
    landingPage: "",
    status: "active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaignDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(campaignDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-700">Create Campaign</h3>
      <div>
        <label className="block text-gray-700">Campaign Name</label>
        <input
          type="text"
          name="name"
          value={campaignDetails.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter campaign name"
        />
      </div>
      <div>
        <label className="block text-gray-700">Budget</label>
        <input
          type="number"
          name="budget"
          value={campaignDetails.budget}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter campaign budget"
        />
      </div>
      <div>
        <label className="block text-gray-700">Target Audience</label>
        <input
          type="text"
          name="targetAudience"
          value={campaignDetails.targetAudience}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter target audience details"
        />
      </div>
      <div>
        <label className="block text-gray-700">Landing Page</label>
        <select
          name="landingPage"
          value={campaignDetails.landingPage}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select Landing Page</option>
          <option value="page1">Landing Page 1</option>
          <option value="page2">Landing Page 2</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Campaign Status</label>
        <select
          name="status"
          value={campaignDetails.status}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
        Create Campaign
      </button>
    </form>
  );
};

// Marketing Component
export const Marketing = () => {
  const [landingPages, setLandingPages] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const handleLandingPageSubmit = (pageDetails: any) => {
    setLandingPages((prev) => [...prev, pageDetails]);
  };

  const handleCampaignSubmit = (campaignDetails: any) => {
    setCampaigns((prev) => [...prev, campaignDetails]);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Marketing Dashboard</h2>

      {/* Landing Page Form */}
      <LandingPageForm onSubmit={handleLandingPageSubmit} />

      {/* Display created landing pages */}
      <section className="space-y-4 mt-8">
        <h3 className="text-xl font-semibold text-gray-700">Landing Pages</h3>
        <ul className="space-y-2">
          {landingPages.map((page, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-700">{page.title}</h4>
              <p className="text-gray-600">{page.description}</p>
              <p className="text-blue-600">{page.cta}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Campaign Form */}
      <CampaignForm onSubmit={handleCampaignSubmit} />

      {/* Display created campaigns */}
      <section className="space-y-4 mt-8">
        <h3 className="text-xl font-semibold text-gray-700">Campaigns</h3>
        <ul className="space-y-2">
          {campaigns.map((campaign, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-700">{campaign.name}</h4>
              <p className="text-gray-600">Budget: ${campaign.budget}</p>
              <p className="text-gray-600">Target Audience: {campaign.targetAudience}</p>
              <p className="text-gray-600">Status: {campaign.status}</p>
              <p className="text-blue-600">Landing Page: {campaign.landingPage}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
