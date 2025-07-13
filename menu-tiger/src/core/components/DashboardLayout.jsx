import React, { useState, useEffect, useRef } from "react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaFlag,
  FaChevronDown,
  FaBars,
  FaCog,
  FaCheckCircle,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
  FaTimes,
} from "react-icons/fa";
import Dashboard from "../pages/Dashboard";
import Menu from "../pages/Menu";
import Orders from "../pages/Orders";
import Store from "../pages/Store";
import Integration from "../pages/Integration";
import Website from "../pages/Website";
import Customer from "../pages/Customer";
import FAQ from "../pages/FAQ";
import Settings from "../pages/Settings";
import Surveys from "../pages/Surveys";
import Taxation from "../pages/Taxation";
import Promotion from "../pages/Promotion";
import HotActions from "../pages/HotActions";
import Reports from "../pages/Reports";
import logo from "../../assets/img/download.png";
import { TbLanguage } from "react-icons/tb";
import HelpChat from "./HelpChat";

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
  collapsed,
  className,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-fifth hover:text-secondary dark:hover:bg-gray-700 rounded-md ${
      active ? "bg-fifth text-secondary font-medium dark:bg-gray-700" : ""
    } ${className || ""}`}
  >
    <img src={icon} alt={label} className={`w-5 h-5 ${active ? "" : ""}`} />
    {!collapsed && <span>{label}</span>}
  </div>
);

const Sidebar = ({
  activePage,
  setActivePage,
  sidebarCollapsed,
  isMobile,
  setShowVideoPopup,
  forceShowOnMobile,
  setForceShowOnMobile,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Hide on mobile unless forced to show
  if (isMobile && !forceShowOnMobile) return null;

  return (
    <aside
      className={`transition-[width] duration-300 ${
        sidebarCollapsed && !isMobile ? "w-20" : "w-64"
      } bg-white dark:bg-gray-800 p-4 space-y-3 pt-6 h-full overflow-y-auto main-content-scroll ${
        isMobile
          ? "fixed z-50 border-t border-gray-200 dark:border-gray-700"
          : ""
      }`}
    >
      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/dashboard-selected.ea80f23ead1a505ffd35e3370bb3cfd8.svg"
        label="Dashboard"
        active={activePage === "Dashboard"}
        onClick={() => setActivePage("Dashboard")}
        collapsed={sidebarCollapsed}
      />
      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/menus.65e983353342f7fac1c48fcb1506c431.svg"
        label="Menu"
        active={activePage === "Menu"}
        onClick={() => setActivePage("Menu")}
        collapsed={sidebarCollapsed}
      />
      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/orders.8bbe8fad28e57e4add01ef75de89cfff.svg"
        label="Orders"
        active={activePage === "Orders"}
        onClick={() => setActivePage("Orders")}
        collapsed={sidebarCollapsed}
      />
      <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

      {/* Store Dropdown */}
      <div>
        <div
          className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-fifth dark:hover:bg-gray-700 rounded-md ${
            openDropdown === "Store" ? "text-primary font-medium bg-fifth" : ""
          }`}
          onClick={() => toggleDropdown("Store")}
        >
          <div className="flex items-center gap-3">
            <img
              src="https://www.app.menutigr.com/static/media/manage-stores.76de79aba6c6a99f6a6d435935e97643.svg"
              alt="Store"
              className="w-5 h-5"
            />
            {!sidebarCollapsed && <span>Stores</span>}
          </div>
          {!sidebarCollapsed && (
            <FaChevronDown
              className={`transform transition text-gray-400 ${
                openDropdown === "Store" ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>
        {!sidebarCollapsed && openDropdown === "Store" && (
          <div className="ml-8 space-y-3 relative pl-1">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"></div>

            <div
              onClick={() => setActivePage("Store")}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md hover:text-primary ${
                activePage === "Store" ? "font-medium text-primary" : ""
              }`}
            >
              <span>•</span>
              <span>Store</span>
            </div>
            <div
              onClick={() => setActivePage("Taxation")}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md hover:text-primary ${
                activePage === "Taxation" ? "font-medium text-primary" : ""
              }`}
            >
              <span>•</span>
              <span>Taxation</span>
            </div>
          </div>
        )}
      </div>

      {/* Marketing Dropdown */}
      <div>
        <div
          className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-fifth dark:hover:bg-gray-700 rounded-md ${
            openDropdown === "Marketing"
              ? "text-primary font-medium bg-fifth"
              : ""
          }`}
          onClick={() => toggleDropdown("Marketing")}
        >
          <div className="flex items-center gap-3">
            <img
              src="https://www.app.menutigr.com/static/media/announce.2f4f8f3e04c7b2ebd758702a6cf77070.svg"
              alt="Marketing"
              className="w-5 h-5"
            />
            {!sidebarCollapsed && (
              <div className="flex flex-col leading-tight">
                <span>Marketing</span>
                <div className="flex justify-start mt-1">
                  <span className="text-sm bg-[#FFE57F] px-2 py-0.5 rounded-full text-black font-normal inline-flex items-center">
                    New
                  </span>
                </div>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <FaChevronDown
              className={`transform transition text-gray-400 ${
                openDropdown === "Marketing" ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>
        {!sidebarCollapsed && openDropdown === "Marketing" && (
          <div className="ml-8 space-y-3 relative pl-1">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"></div>

            <div
              onClick={() => setActivePage("Website")}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md hover:text-primary ${
                activePage === "Website" ? "font-medium text-primary" : ""
              }`}
            >
              <span>•</span>
              <span>Website</span>
              <span className="text-sm bg-[#FFE57F] px-2 py-0.5 rounded-full text-gray-600 font-normal inline-flex items-center">
                New
              </span>
            </div>
            <div
              onClick={() => setActivePage("Promotion")}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md hover:text-primary ${
                activePage === "Promotion" ? "font-medium text-primary" : ""
              }`}
            >
              <span>•</span>
              <span>Promotion</span>
            </div>
            <div
              onClick={() => setActivePage("Surveys")}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md hover:text-primary ${
                activePage === "Surveys" ? "font-medium text-primary" : ""
              }`}
            >
              <span>•</span>
              <span>Surveys</span>
            </div>
            <div
              onClick={() => setActivePage("Customer")}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md hover:text-primary ${
                activePage === "Customer" ? "font-medium text-primary" : ""
              }`}
            >
              <span>•</span>
              <span>Customers</span>
            </div>
          </div>
        )}
      </div>
      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/hot-actions.e42627ee91e9ea6e0052cc56385a658e.svg"
        label="Hot Actions"
        active={activePage === "Hot Actions"}
        onClick={() => setActivePage("Hot Actions")}
        collapsed={sidebarCollapsed}
      />
      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/reports.76de79aba6c6a99f6a6d435935e97643.svg"
        label="Reports"
        active={activePage === "Reports"}
        onClick={() => setActivePage("Reports")}
        collapsed={sidebarCollapsed}
      />
      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/faq.6964d233624dd577e627d27843ddbece.svg"
        label="FAQ"
        active={activePage === "FAQ"}
        onClick={() => setActivePage("FAQ")}
        collapsed={sidebarCollapsed}
      />

      <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/integrations.1a8ee2afe7be8398e82ee2224e4c46ef.svg"
        label="Integration"
        active={activePage === "Integration"}
        onClick={() => setActivePage("Integration")}
        collapsed={sidebarCollapsed}
      />
      <SidebarItem
        icon="https://www.app.menutigr.com/static/media/settings.0e5dc15e8f7496563edb99d1089a6fd2.svg"
        label="Settings"
        active={activePage === "Settings"}
        onClick={() => setActivePage("Settings")}
        collapsed={sidebarCollapsed}
      />

      <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

      <div className="relative overflow-hidden">
        {/* Decorative half-circle only if sidebar is NOT collapsed */}
        {!sidebarCollapsed && (
          <div className="absolute top-0 right-0 w-16 h-14 bg-[#8591A1] dark:bg-[#5a6475] rounded-bl-full z-10 -translate-y-1" />
        )}
        <SidebarItem
          icon="https://www.app.menutigr.com/static/media/video.94336a2d515ea2a96b401489f0034543.svg"
          label={
            <div className="text-left leading-tight">
              <div className="font-medium text-md dark:text-gray-200">
                Onboarding
              </div>
              <div className="text-sm opacity-80 text-gray-500 dark:text-gray-400">
                Video
              </div>
            </div>
          }
          active={activePage === "Onboarding Video"}
          onClick={() => setShowVideoPopup(true)}
          collapsed={sidebarCollapsed}
          className={`py-4 ${
            !sidebarCollapsed
              ? "bg-[#E2E5E8] dark:bg-blue-900/30"
              : "bg-transparent"
          }`}
        />
      </div>

      <div className="relative overflow-hidden">
        {/* Decorative half-circle only if sidebar is NOT collapsed */}
        {!sidebarCollapsed && (
          <div className="absolute top-0 right-0 w-16 h-14 bg-[#8591A1] dark:bg-[#5a6475] rounded-bl-full z-10 -translate-y-1" />
        )}
        <SidebarItem
          icon="https://www.app.menutigr.com/static/media/video.94336a2d515ea2a96b401489f0034543.svg"
          label={
            <div className="text-left leading-tight">
              <div className="font-medium text-md dark:text-gray-200">
                Download
              </div>
              <div className="text-sm opacity-80 text-gray-500 dark:text-gray-400">
                E-book
              </div>
            </div>
          }
          active={activePage === "Download E-book"}
          onClick={() => {
            window.open("https://www.menutiger.com/ebooks", "_blank");
            setActivePage("Download E-book");
          }}
          collapsed={sidebarCollapsed}
          className={`py-4 ${
            !sidebarCollapsed
              ? "bg-[#E2E5E8] dark:bg-green-900/30"
              : "bg-transparent"
          }`}
        />
      </div>
    </aside>
  );
};

const DashboardLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [showStep, setShowStep] = useState("welcome");
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showHelpChat, setShowHelpChat] = useState(false);
  const [language, setLanguage] = useState("EN");
  const selectLanguage = (lang) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };
  const [updates, setUpdates] = useState([
    {
      id: 1,
      type: "New",
      date: "July 11, 2023",
      title: "How to Customize a Menu QR Code: An Easy & User-friendly Guide",
      image: "https://example.com/qr-code-guide.jpg",
      description:
        "Learn the customization guide and image update for your menu QR codes.",
    },
  ]);
  const [showProductTour, setShowProductTour] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [forceShowOnMobile, setForceShowOnMobile] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        forceShowOnMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("header") // Don't close if clicking header
      ) {
        setForceShowOnMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, forceShowOnMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleLanguageDropdown = () =>
    setShowLanguageDropdown(!showLanguageDropdown);

  const filteredUpdates =
    activeFilter === "All"
      ? updates
      : updates.filter(
          (update) => update.type.toLowerCase() === activeFilter.toLowerCase()
        );

  const languages = [
    { code: "EN", name: "English" },
    { code: "FR", name: "Français" },
    { code: "ES", name: "Español" },
    { code: "AR", name: "العربية" },
    { code: "DE", name: "Deutsch" },
    { code: "IT", name: "Italiano" },
    { code: "PT", name: "Português" },
    { code: "RU", name: "Русский" },
    { code: "ZH", name: "中文" },
    { code: "JA", name: "日本語" },
    { code: "KO", name: "한국어" },
    { code: "HI", name: "हिन्दी" },
    { code: "BN", name: "বাংলা" },
    { code: "TR", name: "Türkçe" },
    { code: "UR", name: "اردو" },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Menu":
        return <Menu />;
      case "Orders":
        return <Orders />;
      case "Store":
        return <Store />;
      case "Integration":
        return <Integration />;
      case "Website":
        return <Website />;
      case "Customer":
        return <Customer />;
      case "FAQ":
        return <FAQ />;
      case "Settings":
        return <Settings />;
      case "Surveys":
        return <Surveys />;
      case "Taxation":
        return <Taxation />;
      case "Promotion":
        return <Promotion />;
      case "Hot Actions":
        return <HotActions />;
      case "Reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex flex-col w-screen h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md z-20">
          <div className="flex items-center gap-20">
            <img
              src={logo}
              alt="Logo"
              className="h-8 ml-4 hidden md:block dark:invert"
            />
            <FaBars
              className="text-xl cursor-pointer"
              onClick={() => {
                if (isMobile) {
                  // Toggle sidebar on mobile
                  setForceShowOnMobile((prev) => !prev);
                  setSidebarCollapsed(false);
                } else {
                  // Toggle collapsed state on desktop
                  setSidebarCollapsed(!sidebarCollapsed);
                }
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative flex items-center justify-between cursor-pointer w-16 h-6 rounded-full p-1 transition-colors duration-100 focus:outline-none ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="absolute inset-0 w-full h-0.5 bg-gray-400 dark:bg-gray-500 rounded-full m-auto opacity-20"></span>
                <span
                  className={`relative z-10 w-10 h-10 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                    darkMode
                      ? "translate-x-6 bg-secondary text-white"
                      : "translate-x-0 bg-secondary text-white"
                  }`}
                >
                  {darkMode ? (
                    <FaMoon size={12} className="opacity-90" />
                  ) : (
                    <FaSun size={14} className="opacity-90" />
                  )}
                </span>
              </button>
            </div>
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center justify-center cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-md p-2 hover:bg-secondary hover:text-white w-10 h-10"
                title="Select language"
              >
                <TbLanguage
                  size={20}
                  className={darkMode ? "text-gray-300" : "text-gray-700"}
                />
              </button>

              {showLanguageDropdown && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto scrollbar-thin"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: `${
                      darkMode ? "#6b7280 #374151" : "#9ca3af #e5e7eb"
                    }`,
                  }}
                >
                  <style>{`
      div::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      div::-webkit-scrollbar-track {
        background: ${darkMode ? "#374151" : "#e5e7eb"};
        border-radius: 4px;
      }
      div::-webkit-scrollbar-thumb {
        background-color: ${darkMode ? "#6b7280" : "#9ca3af"};
        border-radius: 4px;
      }
    `}</style>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={`flex items-center w-full px-4 py-3 text-sm ${
                        language === lang.code
                          ? "bg-fifth dark:bg-gray-700 text-primary dark:text-teal-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-fifth dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="flex-1 text-center">{lang.name}</span>
                      {language === lang.code && (
                        <span className="ml-2 text-primary dark:text-teal-300">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              title="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-700 dark:text-gray-300 bg-fifth dark:bg-gray-700 rounded-md p-2 hover:bg-secondary hover:text-white cursor-pointer"
            >
              <FaBell size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div
                className="fixed inset-0 z-50 bg-gray-900/30"
                onClick={() => setShowNotifications(false)}
              >
                <div
                  className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Notifications
                    </h2>
                    <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded-full">
                      0
                    </span>
                  </div>

                  <div className="mb-6 space-y-4">
                    <div className="relative">
                      <select className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                        <option value="unread">All</option>
                        <option value="store-specific">Store-specific</option>
                      </select>
                      <img
                        src="https://www.app.menutigr.com/static/media/store.e0808a2a2a59e39e07e4c4eb3c95ad92.svg"
                        alt="All"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 filter brightness-0 dark:brightness-100 opacity-70"
                        style={{
                          filter:
                            "invert(48%) sepia(79%) saturate(2476%) hue-rotate(130deg) brightness(95%) contrast(96%)",
                        }}
                      />
                    </div>
                    <div className="relative">
                      <select className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                        <option value="all">All notifications</option>
                        <option value="system">System</option>
                        <option value="promotions">Promotions</option>
                        <option value="orders">Orders</option>
                      </select>
                      <svg
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary dark:text-teal-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center mt-12 text-gray-600 dark:text-gray-400">
                    <img
                      src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                      alt="Empty notifications"
                      className="w-36 h-36 mb-6"
                    />
                    <h4 className="text-lg font-medium">
                      You're all caught up!
                    </h4>
                    <p className="mt-2 text-sm">
                      We'll notify you when something new comes up
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowProductTour(true)}
              title="Product Tour"
              className={`text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md p-2 hover:bg-secondary hover:text-white cursor-pointer ${
                isMobile ? "hidden" : "block"
              }`}
            >
              <FaFlag size={24} />
            </button>

            {showProductTour && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30"
                onClick={() => setShowProductTour(false)}
              >
                <div
                  className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowProductTour(false)}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
                    aria-label="Close tour"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="flex justify-center pt-4">
                    <img
                      src="https://www.app.menutigr.com/static/media/rocket.1cfc96bca74214298483fd34670b0c53.svg"
                      alt="Rocket"
                      className="w-40 h-40"
                    />
                  </div>

                  <div className="px-4 pt-4 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      Welcome to the Menu Tiger!
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
                      Let's start with a quick product tour and we will have you
                      up and running in no time!
                    </p>
                    <button
                      onClick={() => setShowStep("checklist")}
                      className="mt-6 w-full py-4 bg-secondary hover:bg-primary text-white font-medium rounded-sm transition-colors shadow-sm text-lg cursor-pointer"
                    >
                      Get tour started
                    </button>
                  </div>

                  <div className="px-4 mt-8">
                    <div className="">
                      <button
                        onClick={() =>
                          setShowStep(
                            showStep === "checklist" ? null : "checklist"
                          )
                        }
                        className="w-full flex flex-col text-left text-gray-800 dark:text-gray-200 font-medium mb-4 focus:outline-none border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        aria-expanded={showStep === "checklist"}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div className="flex items-start space-x-4">
                            <FaCheckCircle className="text-secondary w-6 h-6 mt-1" />
                            <div>
                              <span className="block font-medium text-lg">
                                Onboarding checklist progress
                              </span>
                            </div>
                          </div>

                          <svg
                            className={`w-6 h-6 transition-transform duration-200 ${
                              showStep === "checklist"
                                ? "rotate-180"
                                : "rotate-0"
                            } cursor-pointer`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        <div className="flex items-center justify-between mt-5 space-x-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-secondary h-2.5 rounded-full"
                              style={{ width: "0%" }}
                            ></div>
                          </div>
                          <span className="text-secondary font-semibold text-base ml-2">
                            0%
                          </span>
                        </div>
                      </button>
                    </div>

                    {showStep === "checklist" && (
                      <div className="rounded-lg p-5 bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-start mb-8">
                          <div className="flex-shrink-0 mr-5">
                            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-semibold text-sm cursor-pointer">
                              1
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                              Complete your restaurant details
                            </h4>
                            <p className="text-base text-gray-500 dark:text-gray-400 mt-3">
                              These are the basic information about the
                              restaurant. Contact details, languages, currency
                              and cover image
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start mb-8">
                          <div className="flex-shrink-0 mr-5">
                            <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-200 font-semibold text-sm cursor-pointer">
                              2
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                              Create your first menu
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-start mb-8">
                          <div className="flex-shrink-0 mr-5">
                            <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-200 font-semibold text-sm cursor-pointer">
                              3
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                              Create your first food
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-5">
                            <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-200 font-semibold text-sm cursor-pointer">
                              4
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                              Customize your menu QR and create the first table
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Open Preview */}
            <button
              title="Open Preview"
              className={`text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md p-2 hover:bg-secondary hover:text-white cursor-pointer ${
                isMobile ? "hidden" : "block"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.25 4.5h19.5v15H2.25v-15zM6 17.25v-1.5h12v1.5H6z"
                />
              </svg>
            </button>

            {/* Full Screen */}
            <button
              onClick={toggleFullScreen}
              title="Full Screen"
              className={`text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md p-2 hover:bg-secondary hover:text-white cursor-pointer ${
                isMobile ? "hidden" : "block"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 3A2.25 2.25 0 0 0 3 5.25v4.5a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 0 0-1.5h-4.5Zm13.5 0a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A2.25 2.25 0 0 0 18.75 3h-4.5ZM4.5 13.5a.75.75 0 0 0-1.5 0v4.5A2.25 2.25 0 0 0 5.25 20.25h4.5a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm16.5 0a.75.75 0 0 1 1.5 0v4.5a2.25 2.25 0 0 1-2.25 2.25h-4.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 0 .75-.75v-4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="relative group">
              <button
                onClick={() => {
                  setShowWhatsNew(true);
                  setShowSearchFilters(false);
                  setActiveFilter("All");
                }}
                title="What's New"
                className="relative flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-secondary dark:hover:bg-gray-600 first-letter cursor-pointer"
              >
                <img
                  src="https://www.app.menutigr.com/static/media/manage-stores.76de79aba6c6a99f6a6d435935e97643.svg"
                  alt="What's New"
                  className={`w-6 h-6 group-hover:invert group-hover:brightness-0 group-hover:contrast-200 ${
                    darkMode ? "filter brightness-0 invert" : ""
                  }`}
                />
              </button>
            </div>

            {showWhatsNew && (
              <div
                className="fixed inset-0 z-50 bg-gray-900/30 dark:bg-gray-900/70"
                onClick={() => {
                  setShowWhatsNew(false);
                  setShowSearchFilters(false);
                }}
              >
                <div
                  className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div
                    className={`flex items-center mb-6 px-6 py-4 -mx-6 -mt-6 ${
                      showSearchFilters
                        ? "bg-white dark:bg-gray-800"
                        : "bg-primary dark:bg-gray-900"
                    }`}
                  >
                    {showSearchFilters ? (
                      <button
                        onClick={() => setShowSearchFilters(false)}
                        className="mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                      >
                        <FaChevronLeft className="h-5 w-5" />
                      </button>
                    ) : null}

                    {showSearchFilters ? (
                      <input
                        type="text"
                        placeholder="Search in this feed"
                        className="flex-grow text-sm px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-none focus:outline-none focus:ring-0 focus:border-none"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-white dark:text-gray-200 flex-grow">
                        What's New on MENU TIGER
                      </h2>
                    )}

                    {!showSearchFilters && (
                      <button
                        onClick={() => setShowSearchFilters(true)}
                        className="text-white dark:text-gray-200 hover:text-gray-100 dark:hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {/* Content */}
                  {!showSearchFilters ? (
                    /* Updates List */
                    <div className="space-y-4">
                      {filteredUpdates.map((update) => (
                        <div
                          key={update.id}
                          className="bg-fifth dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-secondary dark:text-teal-300 mr-2">
                                {update.type}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {update.date}
                              </span>
                            </div>
                            <img
                              src="https://app.getbeamer.com/images/social/share.svg"
                              alt="Share"
                              className="h-4 w-4 opacity-70 hover:opacity-100 cursor-pointer"
                            />
                          </div>
                          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            {update.title}
                          </h3>
                          {update.image && (
                            <div className="bg-white dark:bg-gray-600 rounded-md overflow-hidden mb-3">
                              <img
                                src={update.image}
                                alt={update.title}
                                className="w-full h-auto"
                              />
                            </div>
                          )}
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {update.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Search Filters */
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {["All", "Announcement", "Improvement", "New"].map(
                          (filter) => (
                            <button
                              key={filter}
                              onClick={() => {
                                setActiveFilter(filter);
                                setShowSearchFilters(false);
                              }}
                              className={`flex items-center w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 text-left rounded-md ${
                                activeFilter === filter
                                  ? "text-gray-600 dark:text-gray-200"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              <span className="mr-2">•</span>
                              <span>{filter}</span>
                            </button>
                          )
                        )}
                      </div>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          MENU TIGER feed by Beamer
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="fixed bottom-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      We are ⚡by Beamer
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="group flex items-center space-x-2 rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 hover:bg-secondary hover:text-white cursor-pointer"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                <img
                  src="https://www.app.menutigr.com/static/media/user-round.13b5a31bebd2cc6016d6db2cac8e92d1.svg"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <FaCog
                  size={24}
                  className="text-primary dark:text-teal-300 group-hover:text-white"
                />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-600">
                  {/* Header */}
                  <div className="px-4 pt-3 pb-2">
                    <p className="text-lg sm:text-md font-medium text-gray-800 dark:text-gray-200">
                      Good afternoon Cinematic Highlights,
                    </p>
                  </div>

                  {/* Upgrade Plan Section */}
                  <div className="mx-4 mb-6 px-4 py-4 space-y-4 bg-[#FFF8E1] dark:bg-[#2a2118] rounded-md">
                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-300">
                      Upgrade your plan
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-200 mt-1">
                      Up to 8% discount for yearly subscription
                    </p>
                    <button className="mt-3 w-fit bg-[#FFE57F] hover:bg-[#FFC107] text-gray-800 dark:text-gray-900 text-sm sm:text-base font-semibold py-2 px-4 rounded-md">
                      Check Plans
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-600 mx-4 my-4"></div>

                  {/* Menu Items */}
                  <div className="px-3 pb-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePage("Settings");
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-3 text-sm sm:text-[0.95rem] text-gray-700 dark:text-gray-300 hover:bg-[#F3F4F6] dark:hover:bg-gray-600 rounded-md"
                    >
                      <FaCog
                        size={16}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      Restaurant Settings
                    </a>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePage("Settings");
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-3 text-sm sm:text-[0.95rem] text-gray-700 dark:text-gray-300 hover:bg-[#F3F4F6] dark:hover:bg-gray-600 rounded-md"
                    >
                      <FaUser
                        size={16}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      Profile Settings
                    </a>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setUserMenuOpen(false);
                        window.location.href = "/";
                      }}
                      className="flex items-center gap-3 px-3 py-3 text-sm sm:text-[0.95rem] text-gray-700 dark:text-gray-300 hover:bg-[#F3F4F6] dark:hover:bg-gray-600 rounded-md"
                    >
                      <FaSignOutAlt
                        size={16}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 w-full h-full overflow-hidden">
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            sidebarCollapsed={sidebarCollapsed}
            isMobile={isMobile}
            setShowVideoPopup={setShowVideoPopup}
            forceShowOnMobile={forceShowOnMobile}
            setForceShowOnMobile={setForceShowOnMobile}
          />
          <main className="flex-1 overflow-auto main-content-scroll bg-gray-50 dark:bg-gray-900 h-full">
            {renderContent()}
          </main>
        </div>
        {showVideoPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 dark:bg-gray-900/70 backdrop-blur-sm">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Close Button Inside */}
              <button
                onClick={() => setShowVideoPopup(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm"
                aria-label="Close video"
              >
                <FaTimes size={20} />
              </button>

              {/* Video Container with Background */}
              <div className="relative bg-gray-100 dark:bg-gray-900 p-4">
                <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-[500px]"
                    src="https://www.youtube.com/embed/wQyaIzP8190?autoplay=1&mute=1"
                    title="Menu Tiger Onboarding Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Video Info with Background */}
              <div className="bg-gray-50 dark:bg-gray-800/80 p-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Welcome to Menu Tiger
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Watch this video to learn how to get started with Menu Tiger
                  and make the most of our platform.
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FaCheckCircle className="mr-2 text-green-500" />
                  <span>Duration: 5 minutes</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <HelpChat
        darkMode={darkMode}
        showHelpChat={showHelpChat}
        setShowHelpChat={setShowHelpChat}
      />
    </div>
  );
};

export default DashboardLayout;
