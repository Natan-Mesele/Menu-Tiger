import React from "react";
import { FaSearch } from "react-icons/fa";

function Faq() {
  const categories = [
    {
      title: "Getting Started & Account Management",
      description:
        "Learn how to set up your account and manage your profile and subscription settings.",
      articles: 13,
    },
    {
      title: "The Customer Experience (Customer App)",
      description:
        "Understand how your customers interact with your Menu Tiger website.",
      articles: 7,
    },
    {
      title: "Menu Management & Admin Panel",
      description:
        "Find instructions on how to organize your menus and manage the backend.",
      articles: 13,
    },
    {
      title: "Store & Operations Management",
      description:
        "Manage your store settings, add multiple locations, and table QR codes.",
      articles: 16,
    },
    {
      title: "Marketing & Customer Engagement",
      description:
        "Learn how to customize the website, promotions, and customer feedback.",
      articles: 4,
    },
    {
      title: "Advanced Settings, Reports & Integrations",
      description:
        "Advanced configurations, data reports, and connecting with third-party apps.",
      articles: 14,
    },
    {
      title: "FAQs & Troubleshooting",
      description:
        "Find answers to common questions and solutions for frequent technical issues.",
      articles: 8,
    },
  ];

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Logo */}
        {/* Header Bar with Logo and Menu */}
        <div className="flex justify-between items-center mb-6">
          <img
            src="https://www.menutiger.com/_next/static/media/logo.80aeb17b.svg"
            alt="Menu Tiger Logo"
            className="h-10"
          />
          <nav>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Home
            </a>
          </nav>
        </div>

        {/* Centered Header & Search */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Menu Tiger Help Center
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            How can we help?
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for articles"
              className="w-full px-4 py-3 pl-10 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
            />
            <FaSearch className="absolute top-3.5 left-3 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {category.title}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {category.description}
              </p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {category.articles} articles
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          © QRTIGER 2025. Powered by Help Scout
        </footer>
      </div>
    </div>
  );
}

export default Faq;
