import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoUpload from "../components/LogoUpload";
import PatternSelection from "../components/PatternSelection";
import EyeStyleSection from "../components/EyeStyleSection";
import ColorSelection from "../components/ColorSelection";
import FrameSelection from "../components/FrameSelection";
import QRPreviewSection from "../components/QRPreviewSection";
import BackButton from "../../../commons/BackButton";
import SaveButton from "../../../commons/SaveButton";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import ToastProvider from "../../../commons/ToastProvider";

function QRTab() {
  // QR Customization State
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedEyeStyle, setSelectedEyeStyle] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [activeDesignTab, setActiveDesignTab] = useState(null);

  // Design Tabs Configuration
  const designTabs = [
    {
      id: "logo",
      label: "Logo",
      icon: (
        <img
          src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
          alt="Logo"
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "pattern",
      label: "Pattern",
      icon: (
        <img
          src="https://www.app.menutigr.com/static/media/pattern.62d6582682a7206bf0326194d262a1c1.svg"
          alt="Pattern"
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "eyes",
      label: "Eye Style",
      icon: (
        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
      ),
    },
    {
      id: "color",
      label: "Colors",
      icon: (
        <img
          src="https://www.app.menutigr.com/static/media/colors.a1cca20a2aa82f4a5c7dbb292497b6b0.svg"
          alt="Colors"
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "frame",
      label: "Frame",
      icon: <div className="w-5 h-5 border-2 border-primary rounded-sm"></div>,
    },
  ];

  const handleSave = () => {
    const qrSettings = {
      logo: selectedLogo,
      pattern: selectedPattern,
      eyeStyle: selectedEyeStyle,
      color: selectedColor,
      frame: selectedFrame,
    };

    console.log("Saving QR settings:", qrSettings);
    toast.success("QR settings saved successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#0d9488",
        color: "#f8fafc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      },
    });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 w-full">
        <div className="flex items-center space-x-2">
          <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md shadow-md select-none">
            <span>Customize QR code</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-primary dark:border-primary rounded-md text-sm text-gray-700 dark:text-gray-300">
            <FaQuestionCircle className="text-primary" />
            <span>Customize your QR code for Restaurant</span>
          </div>
        </div>
        <SaveButton onClick={handleSave} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-2">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Customization Options */}
          <div className="p-6 md:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="space-y-3">
              {designTabs.map((tab) => (
                <div key={tab.id} className="transition-all">
                  <div
                    className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${
                      activeDesignTab === tab.id
                        ? "border border-gray-200 rounded-sm bg-gray-50 dark:bg-gray-700"
                        : "border border-gray-200 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setActiveDesignTab(
                        activeDesignTab === tab.id ? null : tab.id
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {activeDesignTab === tab.id ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>

                  {activeDesignTab === tab.id && (
                    <div className="py-4 px-2 animate-fadeIn">
                      {tab.id === "logo" && (
                        <LogoUpload
                          selectedLogo={selectedLogo}
                          setSelectedLogo={setSelectedLogo}
                        />
                      )}
                      {tab.id === "pattern" && (
                        <PatternSelection
                          selectedPattern={selectedPattern}
                          setSelectedPattern={setSelectedPattern}
                        />
                      )}
                      {tab.id === "eyes" && (
                        <EyeStyleSection
                          selectedEyeStyle={selectedEyeStyle}
                          setSelectedEyeStyle={setSelectedEyeStyle}
                        />
                      )}
                      {tab.id === "color" && (
                        <ColorSelection
                          selectedColor={selectedColor}
                          setSelectedColor={setSelectedColor}
                        />
                      )}
                      {tab.id === "frame" && (
                        <FrameSelection
                          selectedFrame={selectedFrame}
                          setSelectedFrame={setSelectedFrame}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* QR Preview */}
          <div className="p-6 md:w-1/2 sticky top-4">
            {" "}
            {/* Added sticky positioning here */}
            <QRPreviewSection
              selectedLogo={selectedLogo}
              selectedPattern={selectedPattern}
              selectedEyeStyle={selectedEyeStyle}
              selectedColor={selectedColor}
              selectedFrame={selectedFrame}
            />
          </div>
        </div>
      </div>
      <ToastProvider />
    </div>
  );
}

export default QRTab;
