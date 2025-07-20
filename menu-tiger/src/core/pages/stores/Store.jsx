import React, { useState, useRef, useEffect } from "react";
import {
  FaRocket,
  FaUtensils,
  FaUser,
  FaBell,
  FaCog,
  FaTools,
  FaCreditCard,
  FaQrcode,
  FaLock,
  FaEllipsisV,
  FaChevronLeft,
} from "react-icons/fa";
import OpenAppPanel from "../../../core/commons/OpenAppPanel";
import TablesTab from "./tabs/TablesTab";
import UsersTab from "./tabs/UsersTab";
import HoursTab from "./tabs/HoursTab";
import SocialTab from "./tabs/SocialTab";
import LocationTab from "./tabs/LocationTab";
import SettingsTab from "./tabs/SettingsTab";
import WifiTab from "./tabs/WifiTab";
import DeleteModal from "../../../core/pages/stores/components/DeleteModal";

function Stores() {
  const [currentPage, setCurrentPage] = useState("tables");
  const [popupTimeout, setPopupTimeout] = useState(null);
  const [savedSchedulers, setSavedSchedulers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showWifiPopup, setShowWifiPopup] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const menuRef = useRef(null);
  const tabsRef = useRef([]);
  const containerRef = useRef(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleTabsCount, setVisibleTabsCount] = useState(5);

  const tabs = [
    { id: "tables", name: "Tables", icon: <FaUser /> },
    { id: "users", name: "Users", icon: <FaUtensils /> },
    { id: "hours", name: "Opening Hours", icon: <FaBell /> },
    { id: "social", name: "Social Accounts", icon: <FaCog /> },
    { id: "wifi", name: "WiFi", icon: <FaTools /> },
    { id: "location", name: "Location Details", icon: <FaCreditCard /> },
    { id: "settings", name: "Settings", icon: <FaQrcode /> },
  ];

  // Handle click outside to close dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate visible tabs based on container width
  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const minTabWidth = window.innerWidth < 640 ? 120 : 160; // Smaller min width on mobile
      const count = Math.floor(containerWidth / minTabWidth);
      setVisibleTabsCount(Math.max(1, Math.min(count, tabs.length)));
    };

    calculateVisibleTabs();
    window.addEventListener("resize", calculateVisibleTabs);

    return () => {
      window.removeEventListener("resize", calculateVisibleTabs);
    };
  }, []);

  // Calculate popup position
  const wifiTabRef =
    tabsRef.current[tabs.findIndex((tab) => tab.id === "wifi")];
  let popupStyle = {};
  if (wifiTabRef) {
    const tabRect = wifiTabRef.getBoundingClientRect();
    const popupWidth = window.innerWidth < 640 ? window.innerWidth * 0.9 : 500; // 90% of viewport on mobile
    const screenPadding = 16;
    const windowWidth = window.innerWidth;

    // Calculate left position to center popup under the tab
    let left =
      tabRect.left + window.scrollX + tabRect.width / 2 - popupWidth / 2;

    // Ensure popup stays within screen boundaries
    if (left + popupWidth > windowWidth - screenPadding) {
      left = windowWidth - popupWidth - screenPadding;
    }
    if (left < screenPadding) {
      left = screenPadding;
    }

    popupStyle = {
      top: tabRect.bottom + window.scrollY + 8,
      left,
      position: "absolute",
      maxWidth: windowWidth - 2 * screenPadding,
      width: popupWidth,
    };
  }

  // Handle delete action for schedulers and users
  const handleDelete = (id) => {
    if (deleteType === "scheduler") {
      setSavedSchedulers(savedSchedulers.filter((item) => item.id !== id));
    } else if (deleteType === "user") {
      setUsers(users.filter((user) => user.id !== id));
    }
    setShowDeletePopup(false);
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6 bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg rounded-lg">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold">Stores</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Manage your branches and stores
          </span>
        </div>
        <div className="w-full sm:w-auto">
          <OpenAppPanel />
        </div>
      </div>

      {/* Unified Container with Responsive Layout */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-48 p-3 flex flex-col space-y-4 sm:space-y-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex-1 border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-md overflow-hidden">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">
                Stores
              </span>
            </div>
            <div className="ml-2 flex-shrink-0 bg-gray-200 dark:bg-gray-800 rounded-md p-2 sm:p-3 dark:border dark:border-gray-600">
              <FaLock className="text-lg sm:text-xl text-gray-500 dark:text-gray-200" />
            </div>
          </div>

          <div className="w-full relative" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between cursor-pointer w-full text-gray-500 dark:text-gray-300 hover:text-primary border border-gray-300 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
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
                  className="flex items-center w-full px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaTrash className="mr-2 text-red-500" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="flex-1 w-full">
          {/* Tabs */}
          <div className="relative border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center w-full">
              <button
                className="px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary disabled:opacity-30"
                disabled={visibleStartIndex === 0}
                onClick={() =>
                  setVisibleStartIndex(Math.max(0, visibleStartIndex - 1))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                ref={containerRef}
                className="flex flex-1 overflow-x-auto w-full"
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
                        ref={(el) =>
                          (tabsRef.current[index + visibleStartIndex] = el)
                        }
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
                        className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-md flex items-center justify-center min-w-[120px] sm:min-w-[160px] whitespace-nowrap ${
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

              <button
                className="px-2 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary disabled:opacity-30"
                disabled={visibleStartIndex + visibleTabsCount >= tabs.length}
                onClick={() =>
                  setVisibleStartIndex(
                    Math.min(
                      tabs.length - visibleTabsCount,
                      visibleStartIndex + 1
                    )
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 w-full">
            {currentPage === "tables" && (
              <TablesTab
                savedSchedulers={savedSchedulers}
                setSavedSchedulers={setSavedSchedulers}
                setItemToDelete={setItemToDelete}
                setDeleteType={setDeleteType}
                setShowDeletePopup={setShowDeletePopup}
              />
            )}
            {currentPage === "users" && (
              <UsersTab
                users={users}
                setUsers={setUsers}
                setItemToDelete={setItemToDelete}
                setDeleteType={setDeleteType}
                setShowDeletePopup={setShowDeletePopup}
              />
            )}
            {currentPage === "hours" && <HoursTab />}
            {currentPage === "social" && <SocialTab />}
            {currentPage === "location" && <LocationTab />}
            {currentPage === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>

      {/* WiFi Access Denied Popup */}
      {showWifiPopup && wifiTabRef && (
        <div
          className="z-50 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-md transition-opacity duration-200 w-[90vw] sm:w-[500px]"
          style={popupStyle}
          onMouseEnter={() => {
            setIsPopupHovered(true);
            if (popupTimeout) {
              clearTimeout(popupTimeout);
              setPopupTimeout(null);
            }
          }}
          onMouseLeave={() => {
            setIsPopupHovered(false);
            setShowWifiPopup(false);
          }}
          role="tooltip"
        >
          <div className="absolute inset-0 rounded-md shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.2)]"></div>
          <div className="relative text-sm sm:text-base text-gray-700 dark:text-gray-300 text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Access Denied
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              You do not have permission to use this feature due to limitations
              in your current plan. Please upgrade or adjust your plan to gain
              access.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setCurrentPage("billing");
                  setShowWifiPopup(false);
                }}
                className="w-full border border-primary text-primary px-3 sm:px-5 py-2 rounded-sm hover:bg-primary hover:text-white transition-colors"
              >
                Compare Plans
              </button>
              <button
                onClick={() => setShowWifiPopup(false)}
                className="w-full bg-secondary dark:bg-gray-700 text-white dark:text-white px-3 sm:px-5 py-2 rounded-sm hover:bg-primary dark:hover:bg-gray-600 transition-colors"
              >
                Upgrade Your Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeletePopup && (
        <DeleteModal
          deleteType={deleteType}
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={() => handleDelete(itemToDelete)}
        />
      )}
    </div>
  );
}

export default Stores;
