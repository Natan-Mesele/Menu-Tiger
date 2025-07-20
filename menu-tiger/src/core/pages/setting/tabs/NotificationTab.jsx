import React, { useState } from "react";
import { FaBell, FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import SaveButton from "../../../commons/SaveButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotificationTab() {
  const [isOrderSoundEnabled, setIsOrderSoundEnabled] = useState(false);
  const [isFeedbackSoundEnabled, setIsFeedbackSoundEnabled] = useState(false);
  const [isHotActionSoundEnabled, setIsHotActionSoundEnabled] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [orderSoundValue, setOrderSoundValue] = useState("");
  const [isFeedbackDropdownOpen, setIsFeedbackDropdownOpen] = useState(false);
  const [feedbackSoundValue, setFeedbackSoundValue] = useState("");
  const [isHotActionDropdownOpen, setIsHotActionDropdownOpen] = useState(false);
  const [hotActionSoundValue, setHotActionSoundValue] = useState("");

  const handleSave = () => {
    const notificationSettings = {
      orderSound: {
        enabled: isOrderSoundEnabled,
        selectedSound: orderSoundValue || "Default Sound",
      },
      feedbackSound: {
        enabled: isFeedbackSoundEnabled,
        selectedSound: feedbackSoundValue || "Sound 1",
      },
      hotActionSound: {
        enabled: isHotActionSoundEnabled,
        selectedSound: hotActionSoundValue || "Sound 2",
      },
    };

    setTimeout(() => {
      console.log("Saving notification settings:", notificationSettings);
      toast.success("Notification settings saved successfully!");
    }, 1000);

    return notificationSettings;
  };

  return (
    <div>
      {/* Header with Save Button (right-aligned) */}
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
              Notification Settings
            </h2>
            <div className="flex items-center px-4 py-3 border border-primary rounded-md">
              <FaQuestionCircle className="text-primary mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Manage your notifications sounds
              </span>
            </div>
          </div>
          <SaveButton onClick={handleSave} />
        </div>
      </div>

      {/* Divider Line (full width) */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

      {/* Notification Settings Content (left-aligned) */}
      <div className="max-w-md space-y-6">
        {/* Order Notification Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Order notification sound
          </h3>

          <div className="flex flex-col space-y-4">
            {/* Toggle switch */}
            <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
              <span className="text-sm">Enable</span>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isOrderSoundEnabled}
                  onChange={() => setIsOrderSoundEnabled(!isOrderSoundEnabled)}
                />
                <div className="relative w-12 h-4 overflow-visible">
                  <div
                    className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                      isOrderSoundEnabled
                        ? "bg-primary/20"
                        : "bg-gray-400 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`absolute -top-[6px] ${
                      isOrderSoundEnabled
                        ? "left-[26px] bg-primary border-primary/50"
                        : "left-0 bg-white border-gray-100 shadow-lg"
                    } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Custom Dropdown */}
            <div className="relative">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  Sound <span className="text-red-500">*</span>
                </label>
                <div
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md cursor-pointer flex justify-between items-center"
                  onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
                >
                  <span>{orderSoundValue || "Default Sound"}</span>
                  <FaChevronDown
                    className={`transition-transform ${
                      isOrderDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {isOrderDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                  {["Default Sound", "Sound 1", "Sound 2"].map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                        orderSoundValue === option ? "bg-primary/10" : ""
                      }`}
                      onClick={() => {
                        setOrderSoundValue(option);
                        setIsOrderDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Notification Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Feedback notification sound
          </h3>

          <div className="flex flex-col space-y-4">
            {/* Toggle switch */}
            <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
              <span className="text-sm">Enable</span>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isFeedbackSoundEnabled}
                  onChange={() =>
                    setIsFeedbackSoundEnabled(!isFeedbackSoundEnabled)
                  }
                />
                <div className="relative w-12 h-4 overflow-visible">
                  <div
                    className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                      isFeedbackSoundEnabled
                        ? "bg-primary/20"
                        : "bg-gray-400 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`absolute -top-[6px] ${
                      isFeedbackSoundEnabled
                        ? "left-[26px] bg-primary border-primary/50"
                        : "left-0 bg-white border-gray-100 shadow-lg"
                    } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Custom Dropdown */}
            <div className="relative">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  Sound <span className="text-red-500">*</span>
                </label>
                <div
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md cursor-pointer flex justify-between items-center"
                  onClick={() =>
                    setIsFeedbackDropdownOpen(!isFeedbackDropdownOpen)
                  }
                >
                  <span>{feedbackSoundValue || "Sound 1"}</span>
                  <FaChevronDown
                    className={`transition-transform ${
                      isFeedbackDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {isFeedbackDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                  {["Sound 1", "Default Sound", "Sound 2"].map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                        feedbackSoundValue === option ? "bg-primary/10" : ""
                      }`}
                      onClick={() => {
                        setFeedbackSoundValue(option);
                        setIsFeedbackDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hot-action Notification Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Hot-action notification sound
          </h3>

          <div className="flex flex-col space-y-4">
            {/* Toggle switch */}
            <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
              <span className="text-sm">Enable</span>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isHotActionSoundEnabled}
                  onChange={() =>
                    setIsHotActionSoundEnabled(!isHotActionSoundEnabled)
                  }
                />
                <div className="relative w-12 h-4 overflow-visible">
                  <div
                    className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                      isHotActionSoundEnabled
                        ? "bg-primary/20"
                        : "bg-gray-400 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`absolute -top-[6px] ${
                      isHotActionSoundEnabled
                        ? "left-[26px] bg-primary border-primary/50"
                        : "left-0 bg-white border-gray-100 shadow-lg"
                    } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Custom Dropdown */}
            <div className="relative">
              {isHotActionDropdownOpen && (
                <div className="absolute z-10 w-full bottom-full mb-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                  {["Sound 2", "Default Sound", "Sound 1"].map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                        hotActionSoundValue === option ? "bg-primary/10" : ""
                      }`}
                      onClick={() => {
                        setHotActionSoundValue(option);
                        setIsHotActionDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  Sound <span className="text-red-500">*</span>
                </label>
                <div
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md cursor-pointer flex justify-between items-center"
                  onClick={() =>
                    setIsHotActionDropdownOpen(!isHotActionDropdownOpen)
                  }
                >
                  <span>{hotActionSoundValue || "Sound 2"}</span>
                  <FaChevronDown
                    className={`transition-transform ${
                      isHotActionDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationTab;
