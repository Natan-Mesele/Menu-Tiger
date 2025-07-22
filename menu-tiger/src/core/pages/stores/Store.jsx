import React, { useState, useRef, useEffect } from "react";
import {
  FaRocket,
  FaTable,
  FaUsers,
  FaClock,
  FaShareAlt,
  FaWifi,
  FaMapMarkerAlt,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaLock,
  FaEllipsisV,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import TablesTab from "./tabs/TablesTab";
import UsersTab from "./tabs/UsersTab";
import HoursTab from "./tabs/HoursTab";
import SocialTab from "./tabs/SocialTab";
import LocationTab from "./tabs/LocationTab";
import SettingsTab from "./tabs/SettingsTab";
import WifiTab from "./tabs/WifiTab";

function Store() {
  const [currentPage, setCurrentPage] = useState("tables");
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleTabsCount, setVisibleTabsCount] = useState(4);
  const [users, setUsers] = useState([]);
  const [savedSchedulers, setSavedSchedulers] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showWifiPopup, setShowWifiPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState(null);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const containerRef = useRef(null);
  const tabsRef = useRef([]);
  const menuRef = useRef(null);
  const wifiTabRef = useRef(null);

  const tabs = [
    { id: "tables", name: "Tables", icon: <FaTable className="h-5 w-5" /> },
    { id: "users", name: "Users", icon: <FaUsers className="h-5 w-5" /> },
    {
      id: "opening-hours",
      name: "Opening Hours",
      icon: <FaClock className="h-5 w-5" />,
    },
    {
      id: "social-accounts",
      name: "Social Accounts",
      icon: <FaShareAlt className="h-5 w-5" />,
    },
    { id: "wifi", name: "Wifi", icon: <FaWifi className="h-5 w-5" /> },
    {
      id: "location-details",
      name: "Location Details",
      icon: <FaMapMarkerAlt className="h-5 w-5" />,
    },
    { id: "settings", name: "Settings", icon: <FaCog className="h-5 w-5" /> },
  ];

  const tabContent = {
    tables: (
      <TablesTab
        savedSchedulers={savedSchedulers}
        setSavedSchedulers={setSavedSchedulers}
        setItemToDelete={setItemToDelete}
        setDeleteType={setDeleteType}
        showDeletePopup={showDeletePopup}
        setShowDeletePopup={setShowDeletePopup}
        itemToDelete={itemToDelete}
        deleteType={deleteType}
      />
    ),
    users: (
      <UsersTab
        users={users}
        setUsers={setUsers}
        setItemToDelete={setItemToDelete}
        setDeleteType={setDeleteType}
        setShowDeletePopup={setShowDeletePopup}
      />
    ),
    "opening-hours": <HoursTab />,
    "social-accounts": <SocialTab />,
    wifi: <WifiTab />,
    "location-details": <LocationTab />,
    settings: <SettingsTab />,
  };

  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const minTabWidth = 160; // Use a fixed larger value like in working version
      const count = Math.floor(containerWidth / minTabWidth);
      setVisibleTabsCount(Math.max(1, Math.min(count, tabs.length)));
    };
    calculateVisibleTabs();
    window.addEventListener("resize", calculateVisibleTabs);

    return () => {
      window.removeEventListener("resize", calculateVisibleTabs);
    };
  }, [tabs.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollTabs = (direction) => {
    if (direction === "left") {
      setVisibleStartIndex(Math.max(0, visibleStartIndex - 1));
    } else {
      setVisibleStartIndex(
        Math.min(tabs.length - visibleTabsCount, visibleStartIndex + 1)
      );
    }
  };

  const getPopupStyle = () => {
    if (!wifiTabRef.current) return {};
    const rect = wifiTabRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;
    const popupWidth = isMobile ? Math.min(320, window.innerWidth * 0.9) : 500;
    const popupHeight = isMobile ? "auto" : "auto";
    const leftPosition = rect.left + window.scrollX;
    const clampedLeft = Math.max(
      8,
      Math.min(leftPosition, window.innerWidth - popupWidth - 8)
    );
    return {
      position: "absolute",
      top: `${rect.bottom + window.scrollY + 8}px`,
      left: `${clampedLeft}px`,
      width: `${popupWidth}px`,
      maxHeight: isMobile ? "80vh" : "none",
      overflowY: "auto",
    };
  };

  const popupStyle = getPopupStyle();

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen">
      {/* Add custom styles to hide scrollbar */}
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Original Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold dark:text-gray-300">Stores</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Manage your branches and stores
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-200px)]">
        {/* Sidebar - Moved to top on smaller screens */}
        <div className="w-full md:w-64 md:min-w-[220px] md:max-w-[220px] bg-white dark:bg-gray-800 border-b md:border-r md:border-b-0 border-gray-200 dark:border-gray-700 flex flex-col items-center pt-6 pb-4 md:pb-0">
          <div className="flex flex-row md:flex-row justify-between items-center w-full px-4 md:px-6">
            <div className="flex-1 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md overflow-hidden bg-white dark:bg-gray-700">
              <span className="text-sm sm:text-base text-gray-800 dark:text-gray-100 font-medium whitespace-nowrap">
                Stores
              </span>
            </div>
            <div className="ml-2 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md p-2 border border-gray-200 dark:border-gray-600">
              <FaLock className="text-lg sm:text-xl text-gray-700 dark:text-gray-200" />
            </div>
          </div>

          <div className="w-full px-4 mt-4">
            <div className="w-full relative" ref={menuRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between cursor-pointer w-full text-gray-500 dark:text-gray-300 hover:text-primary border border-gray-300 dark:border-gray-600 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
              >
                <span>Tiger</span>
                <FaEllipsisV className="text-lg" />
              </button>

              {isOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-500">
                  <button
                    onClick={() => {
                      const itemToEdit = savedSchedulers[0];
                      if (itemToEdit) {
                        setCurrentPage("tables");
                      }
                      setIsOpen(false);
                    }}
                    className="flex items-center px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <FaEdit className="mr-2 text-primary" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const itemToEdit = savedSchedulers[0];
                      if (itemToEdit) {
                        setItemToDelete(itemToEdit.id);
                        setDeleteType("scheduler");
                        setShowDeletePopup(true);
                      }
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs and Content Container */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Tabs Navigation */}
          <div className="relative border-b border-gray-200 dark:bg-gray-700 bg-gray-100 dark:bg-gray-700">
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
              {/* Tabs Container - with hidden scrollbar and gap */}
              <div
                ref={containerRef}
                className="flex flex-1 overflow-x-auto w-full hide-scrollbar gap-2 sm:gap-4"
              >
                {tabs
                  .slice(
                    visibleStartIndex,
                    visibleStartIndex + visibleTabsCount
                  )
                  .map((tab, index) =>
                    tab.id === "wifi" ? (
                      <WifiTab
                        key={tab.id}
                        ref={(el) => {
                          tabsRef.current[index + visibleStartIndex] = el;
                          wifiTabRef.current = el;
                        }}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        onMouseEnter={() => {
                          if (popupTimeout) {
                            clearTimeout(popupTimeout);
                            setPopupTimeout(null);
                          }
                          setShowWifiPopup(true);
                        }}
                        onMouseLeave={() => {
                          const timeout = setTimeout(() => {
                            if (!isPopupHovered) setShowWifiPopup(false);
                          }, 300);
                          setPopupTimeout(timeout);
                        }}
                      />
                    ) : (
                      <button
                        key={tab.id}
                        ref={(el) =>
                          (tabsRef.current[index + visibleStartIndex] = el)
                        }
                        className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-md flex items-center justify-center min-w-[100px] sm:min-w-[160px] whitespace-nowrap ${
                          currentPage === tab.id
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setCurrentPage(tab.id)}
                      >
                        <span className="mr-2 text-base sm:text-lg">
                          {tab.icon}
                        </span>
                        <span>{tab.name}</span>
                      </button>
                    )
                  )}
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
          <div className="p-4 sm:p-6 overflow-auto">
            {tabContent[currentPage]}
          </div>
        </div>
      </div>

      {/* WiFi Access Denied Popup */}
      {showWifiPopup && wifiTabRef.current && (
        <div
          className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          style={{
            position: "fixed",
            top: `${
              wifiTabRef.current?.getBoundingClientRect().bottom +
              window.scrollY +
              5
            }px`,
            left: `max(10px, min(85vw - 500px, ${
              wifiTabRef.current?.getBoundingClientRect().left + window.scrollX
            }px))`,
            width: "min(500px, 85vw)",
            maxWidth: "95vw",
            zIndex: 50,
          }}
          onMouseEnter={() => {
            setIsPopupHovered(true);
            if (popupTimeout) {
              clearTimeout(popupTimeout);
              setPopupTimeout(null);
            }
          }}
          onMouseLeave={() => {
            setIsPopupHovered(false);
            const timeout = setTimeout(() => {
              setShowWifiPopup(false);
            }, 300);
            setPopupTimeout(timeout);
          }}
          role="tooltip"
        >
          <div className="text-sm max-[639px]:text-xs text-gray-700 dark:text-gray-300 text-left">
            <div className="flex items-start justify-start mb-4">
              <h3 className="text-lg max-[639px]:text-base font-semibold text-gray-800 dark:text-white">
                Access Denied
              </h3>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-400">
              You do not have permission to use this feature due to limitations
              in your current plan. Please upgrade or adjust your plan to gain
              access.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setCurrentPage("settings");
                  setShowWifiPopup(false);
                }}
                className="w-full border border-primary text-primary dark:border dark:hover:border-secondary px-5 py-2 rounded-sm hover:bg-primary-dark text-base max-[639px]:text-xs shadow-md whitespace-nowrap"
              >
                Compare Plans
              </button>
              <button
                onClick={() => setShowWifiPopup(false)}
                className="w-full bg-secondary text-white shadow-md dark:text-white px-5 py-2 rounded-sm hover:bg-primary text-base max-[639px]:text-xs whitespace-nowrap"
              >
                Upgrade Your Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
