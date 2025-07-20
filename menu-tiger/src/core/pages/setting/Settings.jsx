import React, { useState, useRef, useEffect } from "react";
import {
  FaRocket,
  FaUser,
  FaUtensils,
  FaBell,
  FaCog,
  FaTools,
  FaCreditCard,
  FaQrcode,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OpenAppPanel from "../../commons/OpenAppPanel";
import ProfileTab from "./tabs/ProfileTab";
import RestaurantTab from "./tabs/RestaurantTab";
import NotificationTab from "./tabs/NotificationTab";
import OrderTab from "./tabs/OrderTab";
import DeveloperTab from "./tabs/DeveloperTab";
import BillingTab from "./tabs/BillingTab";
import QRTab from "./tabs/QRTab";
import ToastProvider from "../../commons/ToastProvider";

function Settings() {
  const [currentPage, setCurrentPage] = useState("profile");
  const tabs = [
    { id: "profile", name: "Profile", icon: <FaUser /> },
    { id: "restaurant", name: "Restaurant", icon: <FaUtensils /> },
    { id: "notification", name: "Notification", icon: <FaBell /> },
    { id: "order", name: "Order Settings", icon: <FaCog /> },
    { id: "developer", name: "Developer", icon: <FaTools /> },
    { id: "billing", name: "Billing", icon: <FaCreditCard /> },
    { id: "qr", name: "Restaurant QR Code", icon: <FaQrcode /> },
  ];

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleTabsCount, setVisibleTabsCount] = useState(5);
  const containerRef = useRef(null);
  const tabsRef = useRef([]);

  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const minTabWidth = 160; // Increased to accommodate long labels
      const count = Math.floor(containerWidth / minTabWidth);
      setVisibleTabsCount(Math.max(1, Math.min(count, tabs.length)));
    };

    calculateVisibleTabs();
    window.addEventListener("resize", calculateVisibleTabs);

    return () => {
      window.removeEventListener("resize", calculateVisibleTabs);
    };
  }, [tabs.length]);

  const handleTabChange = (tabId) => {
    setCurrentPage(tabId);
  };

  const scrollTabs = (direction) => {
    if (direction === "left") {
      setVisibleStartIndex(Math.max(0, visibleStartIndex - 1));
    } else {
      setVisibleStartIndex(
        Math.min(tabs.length - visibleTabsCount, visibleStartIndex + 1)
      );
    }
  };

  const renderTabContent = () => {
    switch (currentPage) {
      case "profile":
        return <ProfileTab />;
      case "restaurant":
        return <RestaurantTab />;
      case "notification":
        return <NotificationTab />;
      case "order":
        return <OrderTab />;
      case "developer":
        return <DeveloperTab />;
      case "billing":
        return <BillingTab />;
      case "qr":
        return <QRTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="p-6 w-full max-w-[100vw] bg-gray-200 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg w-full">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold dark:text-gray-300">Settings</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            General Settings
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Tabs and Content Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full">
        <div className="relative border-b border-gray-200 dark:border-gray-700 w-full bg-gray-100 dark:bg-gray-700">
          <div className="flex items-center w-full">
            {/* Left Arrow Button */}
            <button
              className={`px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary ${
                visibleStartIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={() => scrollTabs("left")}
              disabled={visibleStartIndex === 0}
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>

            {/* Tabs Container */}
            <div
              ref={containerRef}
              className="flex justify-between overflow-x-hidden w-full"
            >
              {tabs
                .slice(visibleStartIndex, visibleStartIndex + visibleTabsCount)
                .map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(el) => (tabsRef.current[index] = el)}
                    className={`flex-1 px-4 py-3 font-medium text-sm sm:text-md flex items-center justify-center ${
                      currentPage === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <span className="mr-2 text-xl">{tab.icon}</span>
                    <span className="text-base whitespace-nowrap overflow-hidden text-ellipsis">
                      {tab.name}
                    </span>
                  </button>
                ))}
            </div>

            {/* Right Arrow Button */}
            <button
              className={`px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary ${
                visibleStartIndex + visibleTabsCount >= tabs.length
                  ? "opacity-30 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => scrollTabs("right")}
              disabled={visibleStartIndex + visibleTabsCount >= tabs.length}
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 w-full">{renderTabContent()}</div>
      </div>
      <ToastProvider />
    </div>
  );
}

export default Settings;
