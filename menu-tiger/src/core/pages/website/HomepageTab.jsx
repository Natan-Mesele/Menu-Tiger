import React, { useState } from "react";
import {
  FaImage,
  FaInfoCircle,
  FaUtensils,
  FaStar,
  FaEnvelope,
  FaChevronRight,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SaveButton from "../../commons/SaveButton";
import ToastProvider from "../../commons/ToastProvider";

const HomepageTab = () => {
  const [selectedSection, setSelectedSection] = useState("section-0");
  const [activeTabs, setActiveTabs] = useState("configuration");
  const [focusedField, setFocusedField] = useState(null);
  const [isEditing1, setIsEditing1] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [promotionData, setPromotionData] = useState({
    name: "",
    description: "",
    stores: "",
    imageUrl: "", // Add this line
  });

  const sectionIcons = {
    "Hero Section": <FaImage className="text-gray-500" />,
    "About Section": <FaInfoCircle className="text-gray-500" />,
    "Featured Food": <FaUtensils className="text-gray-500" />,
    "Why Choose Us": <FaStar className="text-gray-500" />,
    Newsletter: <FaEnvelope className="text-gray-500" />,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const handleSave = () => {
    toast.success("Section settings saved successfully!");
    console.log("Saved data:", { [selectedSection]: promotionData });
  };

  const handleFileUpload = (file) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPromotionData((prev) => ({
      ...prev,
      imageUrl,
      imageFile: file,
    }));
    setShowUploadArea(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Section selection */}
        <div className="w-full md:w-1/3 space-y-4">
          {[
            "Hero Section",
            "About Section",
            "Featured Food",
            "Why Choose Us",
            "Newsletter",
          ].map((section, index) => (
            <div
              key={index}
              className={`flex items-center justify-between gap-3 p-3 rounded-md border cursor-pointer ${
                selectedSection === `section-${index}`
                  ? "border-primary-200 bg-fifth dark:bg-gray-700"
                  : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setSelectedSection(`section-${index}`)}
            >
              <div className="flex items-center gap-3">
                {React.cloneElement(sectionIcons[section], {
                  className: `${
                    selectedSection === `section-${index}`
                      ? "text-primary"
                      : "text-gray-500"
                  } text-xl`, // ✅ Increased from text-base to text-xl
                })}
                <span>{section}</span>
              </div>
              <FaChevronRight
                className={`text-sm ${
                  selectedSection === `section-${index}`
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Right side - Section preview */}
        <div className="w-full">
          {/* Repeat similar structure for other sections (1-4) */}
          <div className="w-full">
            {selectedSection === "section-0" && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                {/* Top header with title and save button */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <h3 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
                      Hero Section
                    </h3>
                    {/* Toggle Switch */}
                    <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isEditing1}
                        onChange={() => setIsEditing1(!isEditing1)}
                      />
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          isEditing1
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          isEditing1
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                      />
                    </label>
                  </div>

                  {/* Save Button */}
                  <SaveButton onClick={handleSave} />
                </div>

                {/* Configuration and Localize tabs */}
                <div className="border-b border-gray-200 dark:border-gray-600">
                  <div className="border-b border-gray-200 dark:border-gray-600">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTabs("configuration")}
                        className={`px-4 py-2 font-medium cursor-pointer ${
                          activeTabs === "configuration"
                            ? "border-b-2 border-primary text-primary"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        Configuration
                      </button>
                      <button
                        onClick={() => setActiveTabs("localize")}
                        className={`px-4 py-2 font-medium cursor-pointer ${
                          activeTabs === "localize"
                            ? "border-b-2 border-primary text-primary"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        Localize
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tab content areas */}
                <div className="p-4">
                  {/* Configuration tab content would go here */}
                  {activeTabs === "configuration" && (
                    <div className="max-w-sm space-y-4">
                      <div className="flex flex-row items-center justify-between px-4 py-2 border border-gray-300 rounded-md">
                        <span className="">Button Link</span>
                        <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isEditing2}
                            onChange={() => setIsEditing2(!isEditing2)}
                          />
                          <div
                            className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                              isEditing2
                                ? "bg-primary/20"
                                : "bg-gray-400 dark:bg-gray-700"
                            }`}
                          ></div>
                          <div
                            className={`absolute -top-[6px] ${
                              isEditing2
                                ? "left-[26px] bg-primary border-primary/50"
                                : "left-0 bg-white border-gray-100 shadow-lg"
                            } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                          />
                        </label>
                      </div>
                      <div className="space-y-4">
                        <div
                          className={`flex rounded-md overflow-hidden ${
                            focusedField === "name"
                              ? "ring-1 ring-primary"
                              : "ring-1 ring-gray-300 dark:ring-gray-600"
                          }`}
                        >
                          <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              Heading <span className="text-red-500">*</span>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={promotionData.name}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("name")}
                            onBlur={handleBlur}
                            className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                            placeholder="Enter promotion name"
                          />
                        </div>
                        {/* Description */}
                        <div
                          className={`flex rounded-md overflow-hidden ${
                            focusedField === "description"
                              ? "ring-1 ring-primary"
                              : "ring-1 ring-gray-300 dark:ring-gray-600"
                          }`}
                        >
                          <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              Description{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </div>
                          <textarea
                            name="description"
                            value={promotionData.description}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("description")}
                            onBlur={handleBlur}
                            className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                            placeholder="Enter description"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Localize tab content would go here */}
                  {activeTabs === "localize" && (
                    <div>
                      <div className="flex flex-row items-center gap-4">
                        <span>Text localization </span>
                        <FaQuestionCircle className="text-primary mr-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedSection === "section-1" && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <h3 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
                      About section
                    </h3>

                    {/* Toggle Switch */}
                    <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isEditing1}
                        onChange={() => setIsEditing1(!isEditing1)}
                      />
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          isEditing1
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          isEditing1
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                      />
                    </label>
                  </div>

                  {/* Save Button */}
                  <SaveButton onClick={handleSave} />
                </div>
                {/* Configuration and Localize tabs */}
                <div className="border-b border-gray-200 dark:border-gray-600">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTabs("configuration")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "configuration"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Configuration
                    </button>
                    <button
                      onClick={() => setActiveTabs("localize")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "localize"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Localize
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {activeTabs === "configuration" && (
                    <div className=" px-4 py-2">
                      <h3 className="text-md text-gray-500 mb-4">
                        Image <span className="text-red-400">*</span>
                      </h3>
                      <div className="flex flex-col md:flex-col gap-6">
                        <div className="md:w-1/2 relative">
                          {!showUploadArea ? (
                            <div className="relative">
                              <img
                                src={
                                  promotionData.imageUrl ||
                                  "https://menutigr-resources.s3.us-west-2.amazonaws.com/restaurant/about/61f26299074a0b5f3fce2fab.jpg"
                                }
                                alt="Restaurant"
                                className="rounded-lg h-40 w-full object-cover"
                              />
                              <button
                                onClick={() => setShowUploadArea(true)}
                                className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow text-gray-600 dark:text-gray-300 hover:text-red-500"
                                title="Delete"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <p className="text-red-500 mb-2 text-sm">
                                Image is required
                              </p>
                              <div
                                className="rounded-md h-52 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 px-4 py-6 dark:bg-gray-800 relative"
                                style={{
                                  border: "2px dashed",
                                  borderColor: "#fca5a5",
                                  borderImageSource:
                                    "repeating-linear-gradient(45deg, #fca5a5, #fca5a5 5px, transparent 5px, transparent 10px)",
                                  borderImageSlice: 1,
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const files = e.dataTransfer.files;
                                  if (files && files[0]) {
                                    handleFileUpload(files[0]);
                                  }
                                }}
                              >
                                <input
                                  type="file"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleFileUpload(e.target.files[0]);
                                    }
                                  }}
                                  accept="image/*"
                                />
                                <img
                                  src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                                  alt="Upload"
                                  className="w-16 h-16 mb-4 mx-auto"
                                />
                                <p className="text-sm mb-2">
                                  Preferred size is 400px * 300px
                                </p>
                                <p className="text-sm">
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Inputs */}
                        <div className="md:w-1/2 space-y-4">
                          {/* Heading Input */}
                          <div
                            className={`flex rounded-md overflow-hidden ${
                              focusedField === "name"
                                ? "ring-1 ring-primary"
                                : "ring-1 ring-gray-300 dark:ring-gray-600"
                            }`}
                          >
                            <div className="flex items-center  dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                Heading <span className="text-red-500">*</span>
                              </span>
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={promotionData.name}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("name")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                              placeholder="Enter promotion name"
                            />
                          </div>

                          {/* Description Textarea */}
                          <div
                            className={`flex rounded-md overflow-hidden ${
                              focusedField === "description"
                                ? "ring-1 ring-primary"
                                : "ring-1 ring-gray-300 dark:ring-gray-600"
                            }`}
                          >
                            <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                Description{" "}
                                <span className="text-red-500">*</span>
                              </span>
                            </div>
                            <textarea
                              name="description"
                              value={promotionData.description}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("description")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                              placeholder="Enter description"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTabs === "localize" && (
                    <div>
                      <div className="flex flex-row items-center gap-4">
                        <span>Text localization </span>
                        <FaQuestionCircle className="text-primary mr-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedSection === "section-2" && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <h3 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
                      Featured food section
                    </h3>
                    {/* Toggle Switch */}
                    <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isEditing1}
                        onChange={() => setIsEditing1(!isEditing1)}
                      />
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          isEditing1
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          isEditing1
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                      />
                    </label>
                  </div>

                  {/* Save Button */}
                  <SaveButton onClick={handleSave} />
                </div>

                {/* Configuration and Localize tabs */}
                <div className="border-b border-gray-200 dark:border-gray-600">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTabs("configuration")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "configuration"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Configuration
                    </button>
                    <button
                      onClick={() => setActiveTabs("localize")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "localize"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Localize
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {activeTabs === "configuration" && (
                    <div className="md:w-1/2 space-y-4">
                      {/* Heading Input */}
                      <div
                        className={`flex rounded-md overflow-hidden ${
                          focusedField === "name"
                            ? "ring-1 ring-primary"
                            : "ring-1 ring-gray-300 dark:ring-gray-600"
                        }`}
                      >
                        <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Heading <span className="text-red-500">*</span>
                          </span>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={promotionData.name}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={handleBlur}
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                          placeholder="Enter promotion name"
                        />
                      </div>

                      {/* Description Textarea */}
                      <div
                        className={`flex rounded-md overflow-hidden ${
                          focusedField === "description"
                            ? "ring-1 ring-primary"
                            : "ring-1 ring-gray-300 dark:ring-gray-600"
                        }`}
                      >
                        <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Description <span className="text-red-500">*</span>
                          </span>
                        </div>
                        <textarea
                          name="description"
                          value={promotionData.description}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus("description")}
                          onBlur={handleBlur}
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                          placeholder="Enter description"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                  {activeTabs === "localize" && (
                    <div>
                      <div className="flex flex-row items-center gap-4">
                        <span>Text localization </span>
                        <FaQuestionCircle className="text-primary mr-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedSection === "section-3" && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <h3 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
                      Why choose us section
                    </h3>
                    {/* Toggle Switch */}
                    <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isEditing1}
                        onChange={() => setIsEditing1(!isEditing1)}
                      />
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          isEditing1
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          isEditing1
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                      />
                    </label>
                  </div>

                  {/* Save Button */}
                  <SaveButton onClick={handleSave} />
                </div>
                {/* Configuration and Localize tabs */}
                <div className="border-b border-gray-200 dark:border-gray-600">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTabs("configuration")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "configuration"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Configuration
                    </button>
                    <button
                      onClick={() => setActiveTabs("localize")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "localize"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Localize
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {activeTabs === "configuration" && (
                    <div className=" px-4 py-2">
                      <h3 className="text-md text-gray-500 mb-4">
                        Image <span className="text-red-400">*</span>
                      </h3>
                      <div className="flex flex-col md:flex-col gap-6">
                        <div className="md:w-1/2 relative">
                          {!showUploadArea ? (
                            <div className="relative">
                              <img
                                src={
                                  promotionData.imageUrl ||
                                  "https://menutigr-resources.s3.us-west-2.amazonaws.com/restaurant/about/61f26299074a0b5f3fce2fab.jpg"
                                }
                                alt="Restaurant"
                                className="rounded-lg h-40 w-full object-cover"
                              />
                              <button
                                onClick={() => setShowUploadArea(true)}
                                className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow text-gray-600 dark:text-gray-300 hover:text-red-500"
                                title="Delete"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <p className="text-red-500 mb-2 text-sm">
                                Image is required
                              </p>
                              <div
                                className="rounded-md h-52 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 px-4 py-6 dark:bg-gray-800 relative"
                                style={{
                                  border: "2px dashed",
                                  borderColor: "#fca5a5",
                                  borderImageSource:
                                    "repeating-linear-gradient(45deg, #fca5a5, #fca5a5 5px, transparent 5px, transparent 10px)",
                                  borderImageSlice: 1,
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const files = e.dataTransfer.files;
                                  if (files && files[0]) {
                                    handleFileUpload(files[0]);
                                  }
                                }}
                              >
                                <input
                                  type="file"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleFileUpload(e.target.files[0]);
                                    }
                                  }}
                                  accept="image/*"
                                />
                                <img
                                  src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                                  alt="Upload"
                                  className="w-16 h-16 mb-4 mx-auto"
                                />
                                <p className="text-sm mb-2">
                                  Preferred size is 400px * 300px
                                </p>
                                <p className="text-sm">
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Inputs */}
                        <div className="md:w-1/2 space-y-4">
                          {/* Heading Input */}
                          <div
                            className={`flex rounded-md overflow-hidden ${
                              focusedField === "name"
                                ? "ring-1 ring-primary"
                                : "ring-1 ring-gray-300 dark:ring-gray-600"
                            }`}
                          >
                            <div className="flex items-center  dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                Heading <span className="text-red-500">*</span>
                              </span>
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={promotionData.name}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("name")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                              placeholder="Enter promotion name"
                            />
                          </div>

                          {/* Description Textarea */}
                          <div
                            className={`flex rounded-md overflow-hidden ${
                              focusedField === "description"
                                ? "ring-1 ring-primary"
                                : "ring-1 ring-gray-300 dark:ring-gray-600"
                            }`}
                          >
                            <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                Description{" "}
                                <span className="text-red-500">*</span>
                              </span>
                            </div>
                            <textarea
                              name="description"
                              value={promotionData.description}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus("description")}
                              onBlur={handleBlur}
                              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                              placeholder="Enter description"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTabs === "localize" && (
                    <div>
                      <div className="flex flex-row items-center gap-4">
                        <span>Text localization </span>
                        <FaQuestionCircle className="text-primary mr-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedSection === "section-4" && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-md">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <h3 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
                      Newsletter
                    </h3>
                    {/* Toggle Switch */}
                    <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isEditing1}
                        onChange={() => setIsEditing1(!isEditing1)}
                      />
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          isEditing1
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[6px] ${
                          isEditing1
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                      />
                    </label>
                  </div>

                  {/* Save Button */}
                  <SaveButton onClick={handleSave} />
                </div>

                {/* Configuration and Localize tabs */}
                <div className="border-b border-gray-200 dark:border-gray-600">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTabs("configuration")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "configuration"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Configuration
                    </button>
                    <button
                      onClick={() => setActiveTabs("localize")}
                      className={`px-4 py-2 font-medium cursor-pointer ${
                        activeTabs === "localize"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Localize
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {activeTabs === "configuration" && (
                    <div className="md:w-1/2 space-y-4">
                      {/* Heading Input */}
                      <div
                        className={`flex rounded-md overflow-hidden ${
                          focusedField === "name"
                            ? "ring-1 ring-primary"
                            : "ring-1 ring-gray-300 dark:ring-gray-600"
                        }`}
                      >
                        <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Heading <span className="text-red-500">*</span>
                          </span>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={promotionData.name}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={handleBlur}
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                          placeholder="Enter promotion name"
                        />
                      </div>

                      {/* Description Textarea */}
                      <div
                        className={`flex rounded-md overflow-hidden ${
                          focusedField === "description"
                            ? "ring-1 ring-primary"
                            : "ring-1 ring-gray-300 dark:ring-gray-600"
                        }`}
                      >
                        <div className="flex items-center dark:bg-gray-700 px-3 border-r border-gray-300 dark:border-gray-600">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Description <span className="text-red-500">*</span>
                          </span>
                        </div>
                        <textarea
                          name="description"
                          value={promotionData.description}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus("description")}
                          onBlur={handleBlur}
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                          placeholder="Enter description"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                  {activeTabs === "localize" && (
                    <div>
                      <div className="flex flex-row items-center gap-4">
                        <span>Text localization </span>
                        <FaQuestionCircle className="text-primary mr-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastProvider />
    </div>
  );
};

export default HomepageTab;
