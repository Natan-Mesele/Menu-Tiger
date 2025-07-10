import React, { useState } from "react";
import {
  FaRocket,
  FaUtensils,
  FaHome,
  FaCheck,
  FaPalette,
  FaPaintBrush,
  FaQuestionCircle,
  FaChevronRight,
  FaImage,
  FaInfoCircle,
  FaStar,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Website() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [selectedTheme, setSelectedTheme] = useState("CrimsonLight");
  const [selectedSection, setSelectedSection] = useState("section-0");
  const [primaryColor, setPrimaryColor] = useState("#C8322F");
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");
  const [activeTabs, setActiveTabs] = useState("configuration");
  const [focusedField, setFocusedField] = useState(null);
  const [promotionData, setPromotionData] = useState({
    type: "discount_on_cart",
    name: "",
    description: "",
    stores: "",
  });

  const sectionIcons = {
    "Hero Section": <FaImage className="text-gray-500" />,
    "About Section": <FaInfoCircle className="text-gray-500" />,
    "Featured Food": <FaUtensils className="text-gray-500" />,
    "Why Choose Us": <FaStar className="text-gray-500" />,
    Newsletter: <FaEnvelope className="text-gray-500" />,
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPromotionData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const themes = {
    CrimsonLight: {
      primary: "#C8322F",
      secondary: "#FFFFFF",
      name: "Crimson Light",
    },
    SunsetGlow: {
      primary: "#FF7E5F",
      secondary: "#FEB47B",
      name: "Sunset Glow",
    },
    Custom: {
      primary: "#3A86FF",
      secondary: "#8338EC",
      name: "Custom",
    },
  };

  const handleThemeSelect = (theme) => {
    if (themes[theme]) {
      // Only update if theme exists
      setSelectedTheme(theme);
      setPrimaryColor(themes[theme].primary);
      setSecondaryColor(themes[theme].secondary);
    }
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Website</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Customize website
          </span>
        </div>
        <div className="flex items-center space-x-4 border border-gray-300 dark:border-gray-600 rounded-md p-2">
          <img
            src="https://www.app.menutigr.com/static/media/copy.f4a907cfacfdd8f91d823668cd6856bb.svg"
            alt="Copy Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
            alt="QR Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <button
            className="bg-primary text-white px-5 py-2 rounded-md flex items-center hover:bg-teal-700 transition-colors duration-200 cursor-pointer"
            onClick={() => alert("Open App clicked!")}
          >
            <FaUtensils className="mr-2" />
            Open App
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {/* Tabs with icons */}
        <div className="flex border-b border-gray-300 dark:border-gray-600 mb-6">
          <button
            className={`flex items-center px-4 py-2 font-medium cursor-pointer ${
              activeTab === "homepage"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("homepage")}
          >
            <FaHome className="mr-2" />
            Homepage
          </button>
          <button
            className={`flex items-center px-4 py-2 font-medium cursor-pointer ${
              activeTab === "colors"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("colors")}
          >
            <FaPalette className="mr-2" />
            Colors
            <span className="ml-2 bg-yellow-300 text-black text-xs px-2 py-1.5 rounded-full">
              New
            </span>
          </button>
          <button
            className={`flex items-center px-4 py-2 font-medium cursor-pointer ${
              activeTab === "themes"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("themes")}
          >
            <FaPaintBrush className="mr-2" />
            Themes
            <span className="ml-2 bg-yellow-300 text-black text-xs px-2 py-1.5 rounded-full">
              New
            </span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "homepage" && (
          <div className="space-y-6">
            {/* Main content area */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side - Section selection */}
              <div className="w-full md:w-1/3 space-y-4">
                {[
                  "Hero Section",
                  "About Section",
                  "Featured Food",
                  "Why Choose Us",
                  "Newsletter",
                ].map((section, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                      selectedSection === `section-${index}`
                        ? "border-primary-200 bg-gray-100 dark:bg-gray-700"
                        : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedSection(`section-${index}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500">
                        {sectionIcons[section]}
                      </div>
                      <span>{section}</span>
                    </div>
                    <FaChevronRight className="text-gray-400 text-sm" />
                  </div>
                ))}
              </div>

              {/* Right side - Section preview */}
              <div className="w-full md:w-2/3">
                {selectedSection === "section-0" && (
                  <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                    {/* Top header with title and save button */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-sm px-3 py-3 font-semibold dark:border dark:border-gray-500">
                        Hero Section
                      </h3>
                      <button className="bg-secondary hover:bg-primary cursor-pointer text-white px-4 py-3 rounded-sm font-medium hover:bg-opacity-90 transition">
                        Save
                      </button>
                    </div>
                    {/* Configuration and Localize tabs */}
                    <div className="border-b border-gray-200 dark:border-gray-600">
                      <div className="border-b border-gray-200 dark:border-gray-600">
                        <div className="flex">
                          <button
                            onClick={() => setActiveTabs("configuration")}
                            className={`px-4 py-2 font-medium cursor-pointer ${
                              activeTabs === "configuration"
                                ? "border-b-2 border-primary text-primary"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            Configuration
                          </button>
                          <button
                            onClick={() => setActiveTabs("localize")}
                            className={`px-4 py-2 font-medium cursor-pointer ${
                              activeTabs === "localize"
                                ? "border-b-2 border-primary text-primary"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            Localize
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Tab content areas */}
                    <div className="p-4">
                      {/* Configuration tab content would go here */}
                      {activeTabs === "configuration" && (
                        <div className="max-w-sm space-y-4">
                          <div className="flex flex-row items-center justify-between px-4 py-2 border border-gray-300 rounded-md">
                            <span className="">Button Link</span>
                            <FaChevronRight className="text-gray-400 text-sm" />
                          </div>
                          <div className="space-y-4">
                            <div
                              className={`flex items-center border ${
                                focusedField === "stores"
                                  ? "border-primary"
                                  : "border-gray-300 dark:border-gray-600"
                              } rounded-md transition-colors`}
                            >
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                                Redirect to{" "}
                                <span className="text-red-500">*</span>
                              </span>
                              <select
                                name="stores"
                                value={promotionData.stores}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus("stores")}
                                onBlur={handleBlur}
                                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                              >
                                <option value="">Default(Website menu)</option>
                                <option value="all">Custom URL</option>
                              </select>
                            </div>
                            <div
                              className={`flex items-center border ${
                                focusedField === "name"
                                  ? "border-primary"
                                  : "border-gray-300 dark:border-gray-600"
                              } rounded-md transition-colors`}
                            >
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                                Heading <span className="text-red-500">*</span>
                              </span>
                              <input
                                type="text"
                                name="name"
                                value={promotionData.name}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus("name")}
                                onBlur={handleBlur}
                                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                                placeholder="Enter promotion name"
                              />
                            </div>
                            {/* Description */}
                            <div
                              className={`flex flex-col border ${
                                focusedField === "description"
                                  ? "border-primary"
                                  : "border-gray-300 dark:border-gray-600"
                              } rounded-md transition-colors`}
                            >
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                                Description{" "}
                                <span className="text-red-500">*</span>
                              </span>
                              <textarea
                                name="description"
                                value={promotionData.description}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus("description")}
                                onBlur={handleBlur}
                                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md"
                                placeholder="Enter description"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Localize tab content would go here */}
                      {activeTabs === "localize" && (
                        <div>
                          <div className="flex flex-row items-center gap-4">
                            <span>Text localization </span>
                            <FaQuestionCircle className="text-primary mr-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {selectedSection === "section-1" && (
                  <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-sm px-3 py-3 font-semibold dark:border dark:border-gray-500">
                        Hero Section
                      </h3>
                      <button className="bg-secondary hover:bg-primary cursor-pointer text-white px-4 py-3 rounded-sm font-medium hover:bg-opacity-90 transition">
                        Save
                      </button>
                    </div>
                    {/* Configuration and Localize tabs */}
                    <div className="border-b border-gray-200 dark:border-gray-600">
                      <div className="flex">
                        <button
                          onClick={() => setActiveTabs("configuration")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "configuration"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Configuration
                        </button>
                        <button
                          onClick={() => setActiveTabs("localize")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "localize"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Localize
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      {activeTabs === "configuration" && (
                        <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                          <h3 className="text-lg text-gray-500 mb-4">
                            Image <span className="text-red-400">*</span>
                          </h3>
                          <div className="flex flex-col md:flex-col gap-6">
                            <div className="md:w-1/2">
                              <img
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                                alt="Restaurant"
                                className="rounded-lg h-52 w-full object-cover"
                              />
                            </div>
                            <div className="md:w-1/2 space-y-4">
                              <div
                                className={`flex items-center border ${
                                  focusedField === "name"
                                    ? "border-primary"
                                    : "border-gray-300 dark:border-gray-600"
                                } rounded-md transition-colors`}
                              >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                                  Heading{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                                <input
                                  type="text"
                                  name="name"
                                  value={promotionData.name}
                                  onChange={handleInputChange}
                                  onFocus={() => handleFocus("name")}
                                  onBlur={handleBlur}
                                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                                  placeholder="Enter promotion name"
                                />
                              </div>
                              {/* Description */}
                              <div
                                className={`flex flex-col border ${
                                  focusedField === "description"
                                    ? "border-primary"
                                    : "border-gray-300 dark:border-gray-600"
                                } rounded-md transition-colors`}
                              >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                                  Description{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                                <textarea
                                  name="description"
                                  value={promotionData.description}
                                  onChange={handleInputChange}
                                  onFocus={() => handleFocus("description")}
                                  onBlur={handleBlur}
                                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md"
                                  placeholder="Enter description"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTabs === "localize" && (
                        <div>
                          <div className="flex flex-row items-center gap-4">
                            <span>Text localization </span>
                            <FaQuestionCircle className="text-primary mr-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedSection === "section-2" && (
                  <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-sm px-3 py-3 font-semibold dark:border dark:border-gray-500">
                        Hero Section
                      </h3>
                      <button className="bg-secondary hover:bg-primary cursor-pointer text-white px-4 py-3 rounded-sm font-medium hover:bg-opacity-90 transition">
                        Save
                      </button>
                    </div>
                    {/* Configuration and Localize tabs */}
                    {/* Configuration and Localize tabs */}
                    <div className="border-b border-gray-200 dark:border-gray-600">
                      <div className="flex">
                        <button
                          onClick={() => setActiveTabs("configuration")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "configuration"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Configuration
                        </button>
                        <button
                          onClick={() => setActiveTabs("localize")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "localize"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Localize
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      {activeTabs === "configuration" && (
                        <div className="md:w-1/2 space-y-4">
                          <div
                            className={`flex items-center border ${
                              focusedField === "name"
                                ? "border-primary"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-md transition-colors`}
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                              Heading <span className="text-red-500">*</span>
                            </span>
                            <input
                              type="text"
                              name="name"
                              value={promotionData.name}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("name")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                              placeholder="Enter promotion name"
                            />
                          </div>
                          {/* Description */}
                          <div
                            className={`flex flex-col border ${
                              focusedField === "description"
                                ? "border-primary"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-md transition-colors`}
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                              Description{" "}
                              <span className="text-red-500">*</span>
                            </span>
                            <textarea
                              name="description"
                              value={promotionData.description}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("description")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md"
                              placeholder="Enter description"
                              rows={3}
                            />
                          </div>
                        </div>
                      )}
                      {activeTabs === "localize" && (
                        <div>
                          <div className="flex flex-row items-center gap-4">
                            <span>Text localization </span>
                            <FaQuestionCircle className="text-primary mr-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedSection === "section-3" && (
                  <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-sm px-3 py-3 font-semibold dark:border dark:border-gray-500">
                        Hero Section
                      </h3>
                      <button className="bg-secondary hover:bg-primary cursor-pointer text-white px-4 py-3 rounded-sm font-medium hover:bg-opacity-90 transition">
                        Save
                      </button>
                    </div>
                    {/* Configuration and Localize tabs */}
                    {/* Configuration and Localize tabs */}
                    <div className="border-b border-gray-200 dark:border-gray-600">
                      <div className="flex">
                        <button
                          onClick={() => setActiveTabs("configuration")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "configuration"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Configuration
                        </button>
                        <button
                          onClick={() => setActiveTabs("localize")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "localize"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Localize
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      {activeTabs === "configuration" && (
                        <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4">
                          <h3 className="text-lg text-gray-500 mb-4">
                            Image <span className="text-red-400">*</span>
                          </h3>
                          <div className="flex flex-col md:flex-col gap-6">
                            <div className="md:w-1/2">
                              <img
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                                alt="Restaurant"
                                className="rounded-lg h-52 w-full object-cover"
                              />
                            </div>
                            <div className="md:w-1/2 space-y-4">
                              <div
                                className={`flex items-center border ${
                                  focusedField === "name"
                                    ? "border-primary"
                                    : "border-gray-300 dark:border-gray-600"
                                } rounded-md transition-colors`}
                              >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                                  Heading{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                                <input
                                  type="text"
                                  name="name"
                                  value={promotionData.name}
                                  onChange={handleInputChange}
                                  onFocus={() => handleFocus("name")}
                                  onBlur={handleBlur}
                                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                                  placeholder="Enter promotion name"
                                />
                              </div>
                              {/* Description */}
                              <div
                                className={`flex flex-col border ${
                                  focusedField === "description"
                                    ? "border-primary"
                                    : "border-gray-300 dark:border-gray-600"
                                } rounded-md transition-colors`}
                              >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                                  Description{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                                <textarea
                                  name="description"
                                  value={promotionData.description}
                                  onChange={handleInputChange}
                                  onFocus={() => handleFocus("description")}
                                  onBlur={handleBlur}
                                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md"
                                  placeholder="Enter description"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTabs === "localize" && (
                        <div>
                          <div className="flex flex-row items-center gap-4">
                            <span>Text localization </span>
                            <FaQuestionCircle className="text-primary mr-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedSection === "section-4" && (
                  <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-sm px-3 py-3 font-semibold dark:border dark:border-gray-500">
                        Hero Section
                      </h3>
                      <button className="bg-secondary hover:bg-primary cursor-pointer text-white px-4 py-3 rounded-sm font-medium hover:bg-opacity-90 transition">
                        Save
                      </button>
                    </div>
                    {/* Configuration and Localize tabs */}
                    {/* Configuration and Localize tabs */}
                    <div className="border-b border-gray-200 dark:border-gray-600">
                      <div className="flex">
                        <button
                          onClick={() => setActiveTabs("configuration")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "configuration"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Configuration
                        </button>
                        <button
                          onClick={() => setActiveTabs("localize")}
                          className={`px-4 py-2 font-medium cursor-pointer ${
                            activeTabs === "localize"
                              ? "border-b-2 border-primary text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Localize
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      {activeTabs === "configuration" && (
                        <div className="md:w-1/2 space-y-4">
                          <div
                            className={`flex items-center border ${
                              focusedField === "name"
                                ? "border-primary"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-md transition-colors`}
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                              Heading <span className="text-red-500">*</span>
                            </span>
                            <input
                              type="text"
                              name="name"
                              value={promotionData.name}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("name")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                              placeholder="Enter promotion name"
                            />
                          </div>
                          {/* Description */}
                          <div
                            className={`flex flex-col border ${
                              focusedField === "description"
                                ? "border-primary"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-md transition-colors`}
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                              Description{" "}
                              <span className="text-red-500">*</span>
                            </span>
                            <textarea
                              name="description"
                              value={promotionData.description}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("description")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md"
                              placeholder="Enter description"
                              rows={3}
                            />
                          </div>
                        </div>
                      )}
                      {activeTabs === "localize" && (
                        <div>
                          <div className="flex flex-row items-center gap-4">
                            <span>Text localization </span>
                            <FaQuestionCircle className="text-primary mr-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "colors" && (
          <div className="space-y-6">
            {/* Top section with "Colors" text and Save button */}
            <div className="flex justify-between items-center">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md">
                <span className="font-medium">Colors</span>
              </div>
              <button className="bg-secondary cursor-pointer text-white px-4 py-3 rounded-md flex items-center hover:bg-primary transition-colors">
                <FaCheck className="mr-2" />
                Save
              </button>
            </div>

            {/* Divider line */}
            <div className="border-b border-gray-300 dark:border-gray-600"></div>

            {/* Main content area */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side - Theme selection */}
              <div className="w-full md:w-1/2 space-y-6 border border-gray-300 rounded-md p-4">
                <div>
                  <h3 className="font-medium mb-3">Select theme</h3>
                  <div className="flex gap-4">
                    {Object.keys(themes).map((theme) => (
                      <div
                        key={theme}
                        className="flex flex-row gap-2 items-center cursor-pointer group"
                        onClick={() => handleThemeSelect(theme)}
                      >
                        <div className="relative">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              selectedTheme === theme
                                ? "border-primary"
                                : "border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500"
                            }`}
                          ></div>
                          {selectedTheme === theme && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span
                          className={`mt-2 text-sm ${
                            selectedTheme === theme
                              ? "text-primary font-medium"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {themes[theme].name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 flex flex-row gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Primary</h3>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <span className="font-mono">{primaryColor}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Secondary</h3>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                      <span className="font-mono">{secondaryColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Preview */}
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div
                    className="h-12 rounded-md flex items-center px-4 text-white font-medium"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {themes[selectedTheme]?.name || "Custom Theme"}{" "}
                    {/* Fallback if theme not found */}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Content preview</h3>
                  <div
                    className="border rounded-md p-4"
                    style={{
                      backgroundColor: secondaryColor,
                      borderColor: primaryColor,
                    }}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{ color: primaryColor }}
                    >
                      Section Title
                    </h4>
                    <p className="text-sm" style={{ color: primaryColor }}>
                      This is how the secondary color looks in a section. The
                      text uses the primary color for contrast.
                    </p>
                    <button
                      className="mt-3 px-3 py-1 rounded text-sm"
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                      }}
                    >
                      Sample Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "themes" && (
          <div className="space-y-6">
            {/* Top section with "Themes" text and Save button */}
            <div className="flex justify-between items-center">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md">
                <span className="font-medium">Choose a theme</span>
              </div>
              <button className="bg-secondary cursor-pointer text-white px-4 py-3 rounded-md flex items-center hover:bg-primary transition-colors">
                <FaCheck className="mr-2" />
                Save
              </button>
            </div>

            {/* Divider line */}
            <div className="border-b border-gray-300 dark:border-gray-600"></div>

            {/* Main content area */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side - Theme selection */}
              <div className="w-full md:w-1/3 space-y-4">
                <div className="flex flex-row gap-4 items-center">
                  <h3 className="font-medium">Choose a theme </h3>
                  <FaQuestionCircle className="text-primary mr-2" />
                </div>

                {[1, 2, 3, 4].map((themeNum) => (
                  <div
                    key={themeNum}
                    className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer ${
                      selectedTheme === `theme-${themeNum}`
                        ? "border-primary bg-gray-100 dark:bg-gray-700"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedTheme(`theme-${themeNum}`)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
              ${
                selectedTheme === `theme-${themeNum}`
                  ? "border-primary bg-primary"
                  : "border-gray-400"
              }`}
                    >
                      {selectedTheme === `theme-${themeNum}` && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>Choose a theme {themeNum}</span>
                  </div>
                ))}
              </div>

              {/* Right side - Theme preview */}
              <div className="w-full md:w-2/3 flex items-center justify-center">
                <div>
                  {selectedTheme === "theme-1" && (
                    <img
                      src="https://www.app.menutigr.com/static/media/theme-1.b7b0418ccc92d58a1163.jpg"
                      alt="Theme 1"
                      className="h-64 object-contain cursor-pointer rounded-md"
                    />
                  )}
                  {selectedTheme === "theme-2" && (
                    <img
                      src="https://www.app.menutigr.com/static/media/default-theme.2f52c112484ee3e1970e.png"
                      alt="Theme 2"
                      className="h-64 object-contain cursor-pointer rounded-md"
                    />
                  )}
                  {selectedTheme === "theme-3" && (
                    <img
                      src="https://www.app.menutigr.com/static/media/theme-3.ea28d9238b6d357bbe24.jpg"
                      alt="Theme 3"
                      className="h-64 object-contain cursor-pointer rounded-md"
                    />
                  )}
                  {selectedTheme === "theme-4" && (
                    <img
                      src="https://www.app.menutigr.com/static/media/theme-4.4811d6fd54457c2c4ad8.jpg"
                      alt="Theme 4"
                      className="h-64 object-contain cursor-pointer rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Website;
