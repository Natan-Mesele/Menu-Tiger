import React, { useState } from "react";
import { FaRocket, FaListUl, FaTags, FaArchive } from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import MenusTab from "./MenusTab";
import ModifiersTab from "./ModifiersTab";
import ArchiveTab from "./ArchiveTab";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../commons/ToastProvider";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("Menus");

  const tabs = [
    { name: "Menus", icon: <FaListUl className="mr-2" /> },
    { name: "Modifiers", icon: <FaTags className="mr-2" /> },
    { name: "Archive", icon: <FaArchive className="mr-2" /> },
  ];

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Menu</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Craft Your Digital Menu
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Main Content Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tabs Section */}
        <div className="flex space-x-6 border-b border-gray-300 dark:border-gray-700 px-6 pt-6 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`pb-2 px-4 font-semibold flex items-center cursor-pointer ${
                activeTab === tab.name
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "Menus" && <MenusTab />}
          {activeTab === "Modifiers" && <ModifiersTab />}
          {activeTab === "Archive" && <ArchiveTab />}
        </div>
      </div>
      <ToastProvider />
    </div>
  );
};

export default Menu;
