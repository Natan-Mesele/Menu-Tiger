import React, { useState } from "react";
import { FaQuestionCircle, FaChevronRight } from "react-icons/fa";
import SaveButton from "../../../commons/SaveButton";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../../commons/ToastProvider";

function SettingsTab() {
  const [takeawayEnabled, setTakeawayEnabled] = useState(true);
  const [dineInEnabled, setDineInEnabled] = useState(true);
  const [allowSpecialInstructions, setAllowSpecialInstructions] =
    useState(true);
  const [displayFullFoodName, setDisplayFullFoodName] = useState(true);
  const [storeMenu, setStoreMenu] = useState("Default Menu");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSaveSettings = () => {
    const settingsData = {
      contactlessMenu: {
        takeawayEnabled: takeawayEnabled,
        dineInEnabled: dineInEnabled,
      },
      foodAppearance: {
        allowSpecialInstructions: allowSpecialInstructions,
        displayFullFoodName: displayFullFoodName,
      },
      storeMenu: storeMenu,
    };

    console.log("Saving settings:", settingsData);
    toast.success("Settings saved successfully!");
  };

  return (
    <div>
      {/* Settings Header Section */}
      <div className="flex flex-col sm:flex-col md:flex-row justify-between gap-4 md:gap-6 items-start md:items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md shadow-md select-none w-full md:w-auto">
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border border-primary dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 w-full md:w-auto">
            <FaQuestionCircle className="text-primary mt-0.5" />
            <span className="leading-snug">Manage your store settings</span>
          </div>
        </div>
        <SaveButton onClick={handleSaveSettings} />
      </div>

      {/* Settings Content */}
      <div className="space-y-6 w-full md:w-3/4 lg:w-1/2">
        {/* First Border Section - Contactless Menu */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <div className="flex items-center justify-between mb-4 border border-primary px-4 py-3 rounded-md">
            {/* Left side: question icon and text */}
            <div className="flex items-center gap-2">
              <FaQuestionCircle className="text-primary text-lg" />
              <h4 className="text-gray-900 dark:text-gray-100">
                How to make a contactless view-only menu with no order and pay
                option?
              </h4>
            </div>

            {/* Right side: read more */}
            <span className="text-primary font-medium flex items-center gap-2 cursor-pointer">
              Read more
              <img
                src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                alt="Edit Icon"
                className="w-5 h-5"
              />
            </span>
          </div>

          <div className="space-y-4">
            {/* Enable Takeaway */}
            <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-md">
              <div className="flex items-center gap-2 text-gray-500">
                <span>Enable takeaway</span>
                <FaQuestionCircle className="text-primary text-sm" />
              </div>
              <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={takeawayEnabled}
                  onChange={() => setTakeawayEnabled(!takeawayEnabled)}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                    takeawayEnabled
                      ? "bg-primary/20"
                      : "bg-gray-400 dark:bg-gray-700"
                  }`}
                ></div>
                <div
                  className={`absolute -top-[6px] ${
                    takeawayEnabled
                      ? "left-[26px] bg-primary border-primary/50"
                      : "left-0 bg-white border-gray-100 shadow-lg"
                  } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                ></div>
              </label>
            </div>

            {/* Enable Dine In */}
            <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-md">
              <div className="flex items-center gap-2 text-gray-500">
                <span>Enable dine in</span>
                <FaQuestionCircle className="text-primary text-sm" />
              </div>
              <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={dineInEnabled}
                  onChange={() => setDineInEnabled(!dineInEnabled)}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                    dineInEnabled
                      ? "bg-primary/20"
                      : "bg-gray-400 dark:bg-gray-700"
                  }`}
                ></div>
                <div
                  className={`absolute -top-[6px] ${
                    dineInEnabled
                      ? "left-[26px] bg-primary border-primary/50"
                      : "left-0 bg-white border-gray-100 shadow-lg"
                  } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                ></div>
              </label>
            </div>
          </div>
        </div>

        {/* Second Border Section - Food Appearance */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <div className="flex items-center gap-2 mb-4 border border-primary px-4 py-3 rounded-md">
            <FaQuestionCircle className="text-primary text-lg" />
            <h4 className="text-gray-900 dark:text-gray-100">
              Customize your food appearance
            </h4>
          </div>

          <div className="space-y-4">
            {/* Allow Special Instructions */}
            <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-md">
              <div className="flex items-center gap-2 text-gray-500">
                <span>Allow special instructions</span>
                <FaQuestionCircle className="text-primary text-sm" />
              </div>
              <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={allowSpecialInstructions}
                  onChange={() =>
                    setAllowSpecialInstructions(!allowSpecialInstructions)
                  }
                />
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                    allowSpecialInstructions
                      ? "bg-primary/20"
                      : "bg-gray-400 dark:bg-gray-700"
                  }`}
                ></div>
                <div
                  className={`absolute -top-[6px] ${
                    allowSpecialInstructions
                      ? "left-[26px] bg-primary border-primary/50"
                      : "left-0 bg-white border-gray-100 shadow-lg"
                  } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                ></div>
              </label>
            </div>

            {/* Display Full Food Name */}
            <div className="flex items-center justify-between border border-gray-300 px-4 py-3 rounded-md">
              <div className="flex items-center gap-2 text-gray-500">
                <span>Display full food name</span>
                <FaQuestionCircle className="text-primary text-sm" />
              </div>
              <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={displayFullFoodName}
                  onChange={() => setDisplayFullFoodName(!displayFullFoodName)}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                    displayFullFoodName
                      ? "bg-primary/20"
                      : "bg-gray-400 dark:bg-gray-700"
                  }`}
                ></div>
                <div
                  className={`absolute -top-[6px] ${
                    displayFullFoodName
                      ? "left-[26px] bg-primary border-primary/50"
                      : "left-0 bg-white border-gray-100 shadow-lg"
                  } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                ></div>
              </label>
            </div>
          </div>
        </div>

        {/* Third Border Section - Store Menu */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
          <div className="flex items-center gap-2 mb-4 border border-primary px-4 py-3 rounded-md">
            <FaQuestionCircle className="text-primary text-lg" />
            <h4 className="text-gray-900 dark:text-gray-100">
              Select a restaurant menu for your store
            </h4>
          </div>

          <div className="relative">
            <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden focus-within:border-primary transition-colors">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                  Store Menu *
                </span>
                <div
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none flex justify-between items-center cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span>{storeMenu || "Select menu"}</span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {isMenuOpen && (
              <div className="absolute z-10 w-full bottom-full mb-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                {[
                  "Default Menu",
                  "Premium Menu",
                  "Vegetarian Menu",
                  "Fast Food Menu",
                  "Fine Dining Menu",
                ].map((menu) => (
                  <div
                    key={menu}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      storeMenu === menu ? "bg-fifth " : ""
                    }`}
                    onClick={() => {
                      setStoreMenu(menu);
                      setIsMenuOpen(false);
                    }}
                  >
                    {menu}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastProvider />
    </div>
  );
}

export default SettingsTab;
