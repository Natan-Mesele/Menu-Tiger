import React, { useState } from "react";
import {
  FaCreditCard,
  FaPaintRoller,
  FaPrint,
  FaCashRegister,
  FaRocket,
} from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import PaymentIntegration from "./PaymentIntegration";
import PointOfSale from "./PointOfSale";

function Integration() {
  const [activeTab, setActiveTab] = useState("payment");
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Integrations</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Manage integrations
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Body with Tabs */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 relative">
          {/* Payment Integration Tab */}
          <button
            className={`px-6 py-3 font-medium text-md flex items-center cursor-pointer ${
              activeTab === "payment"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            <FaCreditCard className="mr-2 text-2xl" />
            Payment Integration
          </button>

          {/* White Label Tab */}
          <div className="relative">
            <button
              className={`px-6 py-3 font-medium text-md flex items-center ${
                activeTab === "whiteLabel"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 dark:text-gray-400"
              } cursor-not-allowed opacity-70`}
              onMouseEnter={() => setHoveredTab("whiteLabel")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <FaPaintRoller className="mr-2 text-2xl" />
              White Label
            </button>

            {/* Access Denied Popup */}
            {hoveredTab === "whiteLabel" && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[70vw] sm:w-[500px] z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-5"
                onMouseEnter={() => setHoveredTab("whiteLabel")}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-3 text-lg">
                    Access Denied
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    You do not have permission to use this feature due to
                    limitations in your current plan. Please upgrade or adjust
                    your plan to gain access.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <button
                      className="px-5 py-2 text-primary border border-primary cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Compare Plans
                    </button>
                    <button
                      className="px-5 py-2 bg-secondary dark:bg-gray-700 cursor-pointer text-white dark:text-gray-200 rounded hover:bg-primary dark:hover:bg-gray-600 transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Upgrade your Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Printers Tab */}
          <div className="relative">
            <button
              className={`px-6 py-3 font-medium text-md flex items-center ${
                activeTab === "printers"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 dark:text-gray-400"
              } cursor-not-allowed opacity-70`}
              onMouseEnter={() => setHoveredTab("printers")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <FaPrint className="mr-2 text-2xl" />
              Printers
            </button>

            {/* Access Denied Popup */}
            {hoveredTab === "printers" && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[70vw] sm:w-[500px] z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-5"
                onMouseEnter={() => setHoveredTab("printers")}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-3 text-lg">
                    Access Denied
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    You do not have permission to use this feature due to
                    limitations in your current plan. Please upgrade or adjust
                    your plan to gain access.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <button
                      className="px-5 py-2 text-primary border border-primary dark:bg-gray-700 hover:text-secondary dark:text-gray-200 rounded-sm cursor-pointer dark:hover:bg-gray-600 transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Compare Plans
                    </button>
                    <button
                      className="px-5 py-2 bg-secondary dark:bg-gray-700 text-white dark:text-gray-200 rounded hover:bg-primary dark:hover:bg-gray-600 cursor-pointer transition-colors text-sm w-40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Upgrade your Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Point of Sale Tab */}
          <button
            className={`px-6 py-3 font-medium text-md flex items-center cursor-pointer ${
              activeTab === "pos"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("pos")}
          >
            <FaCashRegister className="mr-2 text-2xl" />
            Point of Sale
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-0">
          {activeTab === "payment" && <PaymentIntegration />}
          {activeTab === "pos" && <PointOfSale />}
        </div>
      </div>
    </div>
  );
}

export default Integration;
