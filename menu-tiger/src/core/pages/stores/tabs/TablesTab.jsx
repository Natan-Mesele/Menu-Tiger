import React, { useState } from "react";
import {
  FaChevronLeft,
  FaQuestionCircle,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import DeleteModal from "../components/DeleteModal";
import QRPreviewSection from "../components/QRPreviewSection";
import LogoUpload from "../components/LogoUpload";
import PatternSelection from "../components/PatternSelection";
import EyeStyleSection from "../components/EyeStyleSection";
import ColorSelection from "../components/ColorSelection";
import FrameSelection from "../components/FrameSelection";
import AddNewButton from "../../../commons/AddNewButton";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../../commons/BackButton";
import SaveButton from "../../../commons/SaveButton";
import ToastProvider from "../../../commons/ToastProvider";

function TablesTab({
  savedSchedulers,
  setSavedSchedulers,
  setItemToDelete,
  setDeleteType,
  setShowDeletePopup,
}) {
  const [showTableForm, setShowTableForm] = useState(false);
  const [showQRCustomization, setShowQRCustomization] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    id: null,
  });
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedEyeStyle, setSelectedEyeStyle] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [activeDesignTab, setActiveDesignTab] = useState(null);

  const designTabs = [
    {
      id: "logo",
      label: "Logo",
      icon: (
        <img
          src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
          alt="Logo"
          className="w-4 sm:w-5 h-4 sm:h-5"
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
          className="w-4 sm:w-5 h-4 sm:h-5"
        />
      ),
    },
    {
      id: "eyes",
      label: "Eye Style",
      icon: (
        <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 border-primary flex items-center justify-center">
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
          className="w-4 sm:w-5 h-4 sm:h-5"
        />
      ),
    },
    {
      id: "frame",
      label: "Frame",
      icon: (
        <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-primary rounded-sm"></div>
      ),
    },
  ];

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a valid name!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (formData.id) {
      setSavedSchedulers(
        savedSchedulers.map((item) =>
          item.id === formData.id
            ? { ...item, name: formData.name.trim() }
            : item
        )
      );
      toast.success("Scheduler updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const newItem = {
        id: Date.now(),
        name: formData.name.trim(),
      };
      setSavedSchedulers([...savedSchedulers, newItem]);
      toast.success("Scheduler added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setShowTableForm(false);
    setFormData({ name: "", id: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
    const itemToEdit = savedSchedulers.find((item) => item.id === id);
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        id: itemToEdit.id,
      });
      setShowTableForm(true);
    }
  };

  return (
    <div className="max-w-full">
      {showTableForm ? (
        <div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-4 sm:mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 w-full overflow-x-auto gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-3 mb-2 sm:mb-0">
              <BackButton onClick={() => setShowTableForm(false)} />
              <div className="text-gray-900 dark:text-gray-100 text-sm sm:text-md bg-gray-100 dark:bg-gray-700 px-3 sm:px-4 py-2 rounded-md select-none">
                <span>Scheduler</span> <span className="text-gray-400">/</span>{" "}
                <span className="text-primary">
                  {formData.id ? "Edit scheduler" : "Add scheduler"}
                </span>
              </div>
            </div>
            <div className="min-w-fit">
              <SaveButton onClick={handleSave} />
            </div>
          </div>

          <div className="space-y-6 w-full sm:max-w-sm">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
              <label className="w-24 sm:w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 focus-within:border-primary transition-colors">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      ) : showQRCustomization ? (
        <div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-2 mb-4 sm:mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 w-full overflow-x-auto">
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 mb-2 sm:mb-0 gap-2 sm:gap-4">
              <BackButton onClick={() => setShowQRCustomization(false)} />
              <div className="text-gray-900 dark:text-gray-100 text-sm sm:text-md bg-gray-100 dark:bg-gray-700 px-3 sm:px-4 py-2 rounded-md select-none">
                <span>Tables </span> <span className="text-gray-400">/</span>{" "}
                <span className="text-primary">Customize QR code</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-primary dark:border-primary rounded-md text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px] sm:max-w-none">
                <FaQuestionCircle className="text-primary flex-shrink-0" />
                <span>Customize your QR code for store tables</span>
              </div>
            </div>
            <div className="min-w-fit">
              <SaveButton
                onClick={() => {
                  const qrSettings = {
                    logo: selectedLogo,
                    pattern: selectedPattern,
                    eyeStyle: selectedEyeStyle,
                    color: selectedColor,
                    frame: selectedFrame,
                  };
                  console.log("QR Settings Saved:", qrSettings);
                  toast.success("QR settings saved successfully!");
                }}
              />
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto mt-2">
            <div className="flex flex-col md:flex-row">
              <div className="p-4 sm:p-6 md:w-1/2">
                <div className="space-y-3">
                  {designTabs.map((tab) => (
                    <div key={tab.id} className="transition-all">
                      <div
                        className={`flex justify-between items-center p-3 cursor-pointer transition-colors ${
                          activeDesignTab === tab.id
                            ? "border border-gray-200 rounded-sm"
                            : "border border-gray-200 rounded-sm"
                        }`}
                        onClick={() =>
                          setActiveDesignTab(
                            activeDesignTab === tab.id ? null : tab.id
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg">
                            {tab.icon}
                          </span>
                          <span className="font-medium text-sm sm:text-base">
                            {tab.label}
                          </span>
                        </div>
                        {activeDesignTab === tab.id ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </div>

                      {activeDesignTab === tab.id && (
                        <div className="py-4 px-2 bg-white animate-fadeIn">
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

              <div className="p-4 sm:p-6 md:w-1/2">
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
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 border-b border-gray-200 pb-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-0">
              <AddNewButton
                onClick={() => {
                  setFormData({ name: "", id: null });
                  setShowTableForm(true);
                }}
                label="Add New"
              />
              <button
                className="cursor-pointer px-3 sm:px-4 py-2 sm:py-3 rounded-md flex items-center bg-secondary hover:bg-primary dark:hover:bg-gray-700 text-white dark:text-white text-sm sm:text-base"
                onClick={() => setShowQRCustomization(true)}
              >
                <img
                  src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
                  alt="QR Icon"
                  className="w-4 h-4 mr-2 filter brightness-0 invert"
                />
                Customize QR Code
              </button>
            </div>
          </div>

          {savedSchedulers.length > 0 ? (
            <div className="space-y-4 w-full">
              {savedSchedulers.map((item) => (
                <div
                  key={item.id}
                  className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-md flex flex-col sm:flex-row justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium text-sm sm:text-base">
                    {item.name}
                  </span>
                  <div className="flex space-x-4 sm:space-x-6 mt-2 sm:mt-0">
                    <button
                      className="text-gray-500 hover:text-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit className="h-4 w-4 text-primary" />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => {
                        setItemToDelete(item.id);
                        setDeleteType("scheduler");
                        setShowDeletePopup(true);
                      }}
                    >
                      <FaTrash className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-48 sm:h-64">
              <img
                src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                alt="Empty state"
                className="w-12 sm:w-16 h-12 sm:h-16 mb-4"
              />
              <p className="text-sm sm:text-base">No schedulers added yet</p>
            </div>
          )}
        </>
      )}
      <ToastProvider />
    </div>
  );
}

export default TablesTab;
