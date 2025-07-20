import React, { useState } from "react";
import {
  FaRocket,
  FaCalendarAlt,
  FaEnvelope,
  FaCommentAlt,
} from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import SchedulerTab from "./SchedulerTab";
import NewslettersTab from "./NewslettersTab.js";
import FeedbackTab from "./FeedbackTab.js.jsx";

function Reports() {
  const [activeTab, setActiveTab] = useState("scheduler");

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header - unchanged */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Scheduler</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Organize Task
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Tabs - modified text and icon size */}
      <div className="bg-gray-100 dark:bg-gray-800 px-6 pt-2 flex space-x-6 border-b border-gray-300 dark:border-gray-700 shadow-md rounded-t-lg">
        {[
          {
            key: "scheduler",
            label: "Scheduler",
            icon: <FaCalendarAlt className="mr-2 text-lg" />, // Added text-lg
          },
          {
            key: "newsletters",
            label: "Newsletters Signup",
            icon: <FaEnvelope className="mr-2 text-lg" />, // Added text-lg
          },
          {
            key: "feedback",
            label: "Feedback",
            icon: <FaCommentAlt className="mr-2 text-lg" />, // Added text-lg
          },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`pb-3 pt-2 text-base font-semibold flex items-center cursor-pointer ${
              activeTab === key
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content - unchanged */}
      <div className="dark:bg-gray-800 p-6 rounded-b-lg shadow-lg bg-white">
        {activeTab === "scheduler" && <SchedulerTab />}
        {activeTab === "newsletters" && <NewslettersTab />}
        {activeTab === "feedback" && <FeedbackTab />}
      </div>
    </div>
  );
}

export default Reports;
