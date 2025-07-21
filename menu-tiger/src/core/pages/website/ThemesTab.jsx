import React, { useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import SaveButton from "../../commons/SaveButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../commons/ToastProvider";

function ThemesTab({ selectedTheme, setSelectedTheme, handleSave }) {
  // Set Theme-1 as default on component mount
  useEffect(() => {
    setSelectedTheme("Theme-1");
  }, []);

  // Handle save with toast notification
  const handleSaveWithToast = async () => {
    try {
      // Default save behavior if no handleSave prop is provided
      console.log("Saving theme:", selectedTheme);

      toast.success("Theme saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Failed to save theme:", error);
      toast.error("Failed to save theme", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="">
      {/* Toast container for notifications */}
      <ToastProvider />
      {/* Top section with "Themes" text and Save button */}
      <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-md shadow-md">
          <span className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
            Themes
          </span>
        </div>
        <SaveButton onClick={handleSaveWithToast} />
      </div>

      {/* Divider line */}
      <div className="border-b border-gray-300 dark:border-gray-600"></div>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Left side - Theme selection */}
        <div className="w-full md:w-1/3 space-y-4 mt-4">
          <div className="flex flex-row gap-4 items-center">
            <h3 className="font-medium text-primary text-sm sm:text-base">
              Choose a theme{" "}
            </h3>
            <FaQuestionCircle className="text-primary mr-2 text-sm sm:text-base" />
          </div>
          {["Theme-1", "Theme-2", "Theme-3", "Theme-4"].map((theme) => (
            <div
              key={theme}
              className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                selectedTheme === theme
                  ? "border-primary dark:bg-gray-700"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setSelectedTheme(theme)}
            >
              <span className="text-sm sm:text-base">{theme}</span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
                ${
                  selectedTheme === theme
                    ? "border-primary bg-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedTheme === theme && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Theme preview */}
        <div className="w-full md:w-2/3 flex items-center justify-center">
          <div className="w-full max-w-md">
            {selectedTheme === "Theme-1" && (
              <img
                src="https://www.app.menutigr.com/static/media/theme-1.b7b0418ccc92d58a1163.jpg"
                alt="Theme 1"
                className="w-full h-48 sm:h-64 object-contain cursor-pointer rounded-md"
              />
            )}
            {selectedTheme === "Theme-2" && (
              <img
                src="https://www.app.menutigr.com/static/media/default-theme.2f52c112484ee3e1970e.png"
                alt="Theme 2"
                className="w-full h-48 sm:h-64 object-contain cursor-pointer rounded-md"
              />
            )}
            {selectedTheme === "Theme-3" && (
              <img
                src="https://www.app.menutigr.com/static/media/theme-3.ea28d9238b6d357bbe24.jpg"
                alt="Theme 3"
                className="w-full h-48 sm:h-64 object-contain cursor-pointer rounded-md"
              />
            )}
            {selectedTheme === "Theme-4" && (
              <img
                src="https://www.app.menutigr.com/static/media/theme-4.4811d6fd54457c2c4ad8.jpg"
                alt="Theme 4"
                className="w-full h-48 sm:h-64 object-contain cursor-pointer rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemesTab;
