import React from "react";
import SaveButton from "../../commons/SaveButton";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../commons/ToastProvider";

function ColorsTab({
  selectedTheme,
  primaryColor,
  secondaryColor,
  setSelectedTheme,
  setPrimaryColor,
  setSecondaryColor,
}) {
  const themes = {
    CrimsonLight: {
      primary: "#000000", // Black
      secondary: "#FFD700", // Yellow (Gold-like vibrant yellow)
      name: "Crimson Light",
    },
    SunsetGlow: {
      primary: "#000000", // Black
      secondary: "#FFD700", // Yellow (Gold-like vibrant yellow)
      name: "Sunset Glow",
    },
    Custom: {
      primary: "#3A86FF",
      secondary: "#8338EC",
      name: "Custom",
    },
  };

  const handleThemeSelect = (theme) => {
    if (themes[theme]) {
      setSelectedTheme(theme);
      setPrimaryColor(themes[theme].primary);
      setSecondaryColor(themes[theme].secondary);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Saving colors:", {
        theme: selectedTheme,
        primaryColor,
        secondaryColor,
      });

      toast.success("Colors saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Failed to save colors:", error);
      toast.error("Failed to save colors", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top section with "Colors" text and Save button */}
      <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-md shadow-md">
          <span className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
            Colors
          </span>
        </div>
        <SaveButton onClick={handleSave} />
      </div>

      {/* Divider line */}
      <div className="border-b border-gray-300 dark:border-gray-600"></div>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 min-w-0">
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 border border-gray-300 rounded-md p-2 sm:p-4">
          <div>
            <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
              Select theme
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {Object.keys(themes).map((theme) => (
                <div
                  key={theme}
                  className="flex flex-row gap-2 items-center cursor-pointer group"
                  onClick={() => handleThemeSelect(theme)}
                >
                  <div className="relative">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedTheme === theme
                          ? "border-primary"
                          : "border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500"
                      }`}
                    >
                      {selectedTheme === theme && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-sm ${
                      selectedTheme === theme
                        ? "text-primary font-medium"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {themes[theme].name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Only show color selection for Custom theme */}
          {selectedTheme === "Custom" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                {/* Primary Color */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 sm:gap-3 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1">
                    <h3 className="font-medium w-16 sm:w-20 text-sm sm:text-base">
                      Primary
                    </h3>
                    <div className="flex items-center bg-gray-200 min-w-0">
                      <span className="font-mono px-1 sm:px-2 text-xs sm:text-sm truncate">
                        {primaryColor}
                      </span>
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-4 h-4 rounded-sm border border-gray-300 flex-shrink-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 sm:gap-3 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1">
                    <h3 className="font-medium w-16 sm:w-20 text-sm sm:text-base">
                      Secondary
                    </h3>
                    <div className="flex items-center bg-gray-200 min-w-0">
                      <span className="font-mono px-1 sm:px-2 text-xs sm:text-sm truncate">
                        {secondaryColor}
                      </span>
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-4 h-4 rounded-sm border border-gray-300 flex-shrink-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Preview */}
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
          <div>
            <h3 className="font-medium mb-2 px-1 text-sm sm:text-base">
              Preview
            </h3>
            <div
              className="h-16 rounded-sm flex items-center text-sm px-4 sm:px-8 text-white font-medium shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              {themes[selectedTheme]?.name || "Custom Theme"}
            </div>
          </div>

          <div className="px-1">
            <h3 className="font-medium mb-2 text-sm sm:text-base">
              Content preview
            </h3>
            <div className="space-y-2">
              <span className="text-black block text-sm sm:text-base">
                This is how the secondary color looks in a section.
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastProvider />
    </div>
  );
}

export default ColorsTab;
