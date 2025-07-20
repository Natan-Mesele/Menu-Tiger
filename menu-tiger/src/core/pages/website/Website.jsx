import React, { useState } from "react";
import { FaHome, FaPalette, FaPaintBrush, FaRocket } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomepageTab from "./HomepageTab";
import ColorsTab from "./ColorsTab";
import ThemesTab from "./ThemesTab";
import OpenAppPanel from "../../commons/OpenAppPanel";
import ToastProvider from "../../commons/ToastProvider";

function Website() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [selectedTheme, setSelectedTheme] = useState("CrimsonLight");
  const [primaryColor, setPrimaryColor] = useState("#C8322F");
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");

  const tabs = [
    {
      name: "Homepage",
      icon: <FaHome className="mr-2" />,
      value: "homepage",
    },
    {
      name: "Colors",
      icon: <FaPalette className="mr-2" />,
      value: "colors",
    },
    {
      name: "Themes",
      icon: <FaPaintBrush className="mr-2" />,
      value: "themes",
    },
  ];

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
        <OpenAppPanel />
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tabs Section */}
        <div className="flex space-x-6 border-b border-gray-300 dark:border-gray-700 px-6 pt-6 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`relative pb-2 px-4 font-semibold flex items-center cursor-pointer ${
                activeTab === tab.value
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              <span className="mr-2 text-xl">{tab.icon}</span>
              {tab.name}
              {(tab.value === "colors" || tab.value === "themes") && (
                <span className="ml-2 text-xs bg-yellow-300 text-black font-medium px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "homepage" && <HomepageTab />}
          {activeTab === "colors" && (
            <ColorsTab
              selectedTheme={selectedTheme}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              setSelectedTheme={setSelectedTheme}
              setPrimaryColor={setPrimaryColor}
              setSecondaryColor={setSecondaryColor}
            />
          )}
          {activeTab === "themes" && (
            <ThemesTab
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
            />
          )}
        </div>
      </div>
      <ToastProvider />
    </div>
  );
}

export default Website;
