import React, { useState } from "react";
import { FaRocket, FaList } from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import CreateHotActions from "./CreateHotActions";
import HotActionsRequests from "./HotActionsRequests";

function HotActions() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header - unchanged */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Hot Actions</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Create and view customer requested hot actions
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Tabs Navigation - increased size */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-0 bg-[#fafcff] rounded-md dark:bg-gray-800">
        <button
          className={`flex items-center cursor-pointer px-5 py-3 text-base font-medium border-b-2 transition-all duration-200 ${
            activeTab === "create"
              ? "text-primary border-primary"
              : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("create")}
        >
          <img
            src="https://www.app.menutigr.com/static/media/hot-actions-selected.ce5ab478b4446f64ed692c3777c18ded.svg"
            alt=""
            className="mr-3 w-6 h-6"
          />
          Create Hot Actions
        </button>
        <button
          className={`flex items-center cursor-pointer px-5 py-3 text-base font-medium border-b-2 transition-all duration-200 ${
            activeTab === "requests"
              ? "text-primary border-primary"
              : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          <FaList className="mr-3 text-lg" />{" "}
          {/* Increased from default size and mr-2 */}
          Hot Actions Requests
        </button>
      </div>

      {/* Content Area - unchanged */}
      <div className="mt-0 pt-6 bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow">
        {activeTab === "create" ? <CreateHotActions /> : <HotActionsRequests />}
      </div>
    </div>
  );
}

export default HotActions;
