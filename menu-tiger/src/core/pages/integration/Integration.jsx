import React, { useState, useEffect } from "react";
import {
  FaCreditCard,
  FaPaintRoller,
  FaPrint,
  FaCashRegister,
  FaRocket,
  FaChevronLeft,
  FaChevronRight,
  FaLock,
} from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import PaymentIntegration from "./PaymentIntegration";
import PointOfSale from "./PointOfSale";

function Integration() {
  const [activeTab, setActiveTab] = useState("payment");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Define tabs
  const tabs = [
    {
      id: "payment",
      label: "Payment Integration",
      icon: <FaCreditCard className="mr-2 text-2xl" />,
      isLocked: false,
    },
    {
      id: "whiteLabel",
      label: "White Label",
      icon: <FaPaintRoller className="mr-2 text-2xl" />,
      isLocked: true,
    },
    {
      id: "printers",
      label: "Printers",
      icon: <FaPrint className="mr-2 text-2xl" />,
      isLocked: true,
    },
    {
      id: "pos",
      label: "Point of Sale",
      icon: <FaCashRegister className="mr-2 text-2xl" />,
      isLocked: false,
    },
  ];

  // Update visible tab count on screen resize
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(4); // Large screen (desktop)
      } else if (width >= 768) {
        setVisibleCount(3); // Tablet
      } else {
        setVisibleCount(2); // Mobile
      }
      setVisibleStartIndex(0); // Reset scroll on resize
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const endIndex = visibleStartIndex + visibleCount;
  const visibleTabs = tabs.slice(visibleStartIndex, endIndex);

  const scrollTabs = (direction) => {
    if (direction === "left" && visibleStartIndex > 0) {
      setVisibleStartIndex((prev) => prev - 1);
    } else if (
      direction === "right" &&
      visibleStartIndex + visibleCount < tabs.length
    ) {
      setVisibleStartIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
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

      {/* Tabs */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center border-b border-gray-300 dark:border-gray-700 relative">
          <button
            onClick={() => scrollTabs("left")}
            className={`px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary ${
              visibleStartIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={visibleStartIndex === 0}
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-grow relative min-w-0">
            <div className="flex w-full">
              {visibleTabs.map((tab) => (
                <div
                  key={tab.id}
                  className="relative inline-block flex-shrink-0"
                >
                  <button
                    data-tab-id={tab.id}
                    className={`flex items-center text-gray-600 font-medium px-4 py-3 max-[639px]:px-3 max-[639px]:py-2 text-base max-[639px]:text-xs whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : tab.isLocked
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer"
                    }`}
                    onClick={() => !tab.isLocked && setActiveTab(tab.id)}
                    onMouseEnter={() => tab.isLocked && setHoveredTab(tab.id)}
                    onMouseLeave={() => tab.isLocked && setHoveredTab(null)}
                  >
                    {React.cloneElement(tab.icon, {
                      className: "mr-2 text-2xl sm:text-xl",
                    })}
                    {tab.label}
                    {tab.isLocked}
                  </button>

                  {/* Tooltip for locked tab */}
                  {hoveredTab === tab.id && (
                    <div
                      style={{
                        position: "fixed",
                        top: `${
                          document
                            .querySelector(`[data-tab-id="${tab.id}"]`)
                            ?.getBoundingClientRect().bottom +
                          window.scrollY +
                          5
                        }px`,
                        left: `clamp(10px, calc(${
                          document
                            .querySelector(`[data-tab-id="${tab.id}"]`)
                            ?.getBoundingClientRect().left +
                          window.scrollX +
                          (document
                            .querySelector(`[data-tab-id="${tab.id}"]`)
                            ?.getBoundingClientRect().width || 0) /
                            2
                        }px - 250px), calc(100vw - 510px))`,
                        width: "min(500px, 85vw)",
                        maxWidth: "95vw",
                        maxHeight: "90vh",
                        overflow: "auto",
                        zIndex: 50,
                      }}
                      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                      onMouseEnter={() => setHoveredTab(tab.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                    >
                      <div className="text-sm max-[639px]:text-xs text-gray-700 dark:text-gray-300 text-left">
                        <div className="flex items-start justify-start mb-4">
                          <h3 className="text-lg max-[639px]:text-base font-semibold text-gray-800 dark:text-white">
                            Access Denied
                          </h3>
                        </div>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                          You do not have permission to use this feature due to
                          plan limitations. Please upgrade to gain access.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button className="w-full border border-primary text-primary dark:border dark:hover:border-secondary px-5 py-2 rounded-sm hover:bg-primary-dark text-base max-[639px]:text-xs shadow-md whitespace-nowrap">
                            Compare Plans
                          </button>
                          <button className="w-full bg-secondary text-white shadow-md dark:text-white px-5 py-2 rounded-sm hover:bg-primary text-base max-[639px]:text-xs whitespace-nowrap">
                            Upgrade Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollTabs("right")}
            className={`px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary ${
              visibleStartIndex + visibleCount >= tabs.length
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
            disabled={visibleStartIndex + visibleCount >= tabs.length}
          >
            <FaChevronRight className="h-5 w-5" />
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
