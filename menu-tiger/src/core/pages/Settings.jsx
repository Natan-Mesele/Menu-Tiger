import React, { useState, useRef, useEffect } from "react";
import {
  FaRocket,
  FaUtensils,
  FaCog,
  FaUser,
  FaTools,
  FaBell,
  FaCreditCard,
  FaQrcode,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function Settings() {
  const [currentPage, setCurrentPage] = useState("profile");
  const [focusedField, setFocusedField] = useState(null);
  const tabs = [
    { id: "profile", name: "Profile", icon: <FaUser /> },
    { id: "restaurant", name: "Restaurant", icon: <FaUtensils /> },
    { id: "notification", name: "Notification", icon: <FaBell /> },
    { id: "order", name: "Order Settings", icon: <FaCog /> },
    { id: "developer", name: "Developer", icon: <FaTools /> },
    { id: "billing", name: "Billing", icon: <FaCreditCard /> },
    { id: "qr", name: "Restaurant QR Code", icon: <FaQrcode /> },
  ];
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    description: "",
  });
  const [visibleTabs, setVisibleTabs] = useState([...tabs]);
  const [hiddenTabs, setHiddenTabs] = useState([]);
  const tabsRef = useRef([]);
  const containerRef = useRef(null);
  const moreButtonRef = useRef(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleTabsCount, setVisibleTabsCount] = useState(5);
  const [showQRCustomization, setShowQRCustomization] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedEyeStyle, setSelectedEyeStyle] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [activeDesignTab, setActiveDesignTab] = useState(null);

  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < tabs.length; i++) {
        const tabWidth = tabsRef.current[i]?.offsetWidth || 120;
        if (totalWidth + tabWidth <= containerWidth) {
          totalWidth += tabWidth;
          count++;
        } else {
          break;
        }
      }

      setVisibleTabsCount(Math.max(1, count));
    };

    calculateVisibleTabs();
    window.addEventListener("resize", calculateVisibleTabs);

    return () => {
      window.removeEventListener("resize", calculateVisibleTabs);
    };
  }, []);

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

  const handleBlur = () => {
    setFocusedField(null);
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Saving profile data:", {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      description: profileData.description,
      profileImage: profileData.profileImage,
    });

    // For demo purposes, we'll just show an alert
    alert("Profile saved successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: file,
          previewImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const QRPreviewSection = () => (
    <div className="mb-6 flex flex-col items-center">
      <h4 className="font-medium mb-3 text-gray-700">QR Code Preview</h4>
      <div className="p-4 bg-white rounded-lg">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com&margin=10"
          alt="QR Code Preview"
          className="w-48 h-48"
        />
      </div>
      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
        Download QR Code
      </button>
    </div>
  );

  const ScanReminderSection = () => (
    <div className="bg-yellow-50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            Always test your QR code
          </h4>
          <p className="text-sm text-gray-600">
            Scan with multiple devices to ensure it works properly before
            distribution.
            <span className="block mt-1 text-blue-600 hover:underline cursor-pointer">
              Learn more about testing →
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const LogoUploadSection = () => (
    <div>
      <label className="block text-sm font-medium mb-2">
        Upload Center Logo
      </label>
      <input
        type="file"
        id="logo-upload"
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setSelectedLogo(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      <label
        htmlFor="logo-upload"
        className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        {selectedLogo ? (
          <img
            src={selectedLogo}
            alt="Selected Logo"
            className="h-full object-contain"
          />
        ) : (
          <>
            <span className="text-gray-400 text-4xl">+</span>
            <span className="text-gray-500 text-sm">PNG, JPG (max 2MB)</span>
          </>
        )}
      </label>
      {selectedLogo && (
        <div className="mt-3 flex gap-2">
          <button
            className="text-xs px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setSelectedLogo(null)}
          >
            Remove Logo
          </button>
        </div>
      )}
    </div>
  );

  const PatternSelectionSection = () => (
    <div>
      <label className="block text-sm font-medium mb-2">
        Select Pattern Style
      </label>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            id: "1",
            img: "https://www.app.menutigr.com/static/media/8.ba2bfc7f49910aab84b34dde0776d9c5.svg",
          },
          {
            id: "2",
            img: "https://www.app.menutigr.com/static/media/7.94f99087a78ad181db272a3d1dd557a2.svg",
          },
          {
            id: "3",
            img: "https://www.app.menutigr.com/static/media/1.c02ba2e1bd3b115050d37b2f9d7b132d.svg",
          },
        ].map((pattern) => (
          <div
            key={pattern.id}
            className="flex flex-col items-center gap-1"
            onClick={() => setSelectedPattern(pattern.id)}
          >
            <div
              className={`w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer p-2 ${
                selectedPattern === pattern.id
                  ? "border-2 border-primary"
                  : "border border-gray-300"
              }`}
            >
              <img
                src={pattern.img}
                alt={`Pattern ${pattern.id}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EyeStyleSection = () => (
    <div>
      <label className="block text-sm font-medium mb-2">
        Corner Eye Design
      </label>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            id: "square",
            label: "Square",
            img: "https://www.app.menutigr.com/static/media/4.3824d19bacf087be79a128b280199228.svg",
          },
          {
            id: "rounded",
            label: "Rounded",
            img: "https://www.app.menutigr.com/static/media/2.1183160711ab9f9167dad1854ece2660.svg",
          },
          {
            id: "circle",
            label: "Circle",
            img: "https://www.app.menutigr.com/static/media/1.3bdf90cf728437198ce1109f9d560c32.svg",
          },
        ].map((eye) => (
          <div
            key={eye.id}
            className="flex flex-col items-center"
            onClick={() => setSelectedEyeStyle(eye.id)}
          >
            <div
              className={`w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer p-2 ${
                selectedEyeStyle === eye.id
                  ? "border-2 border-primary"
                  : "border border-gray-300"
              }`}
            >
              <img
                src={eye.img}
                alt={`${eye.label} eye style`}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xs mt-1 text-gray-600">{eye.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const ColorSelectionSection = () => (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Foreground</label>
          <div className="flex gap-2">
            {["#000000", "#3B82F6", "#EF4444"].map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  selectedColor === color ? "border-2 border-gray-400" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>
        {/* Background color selection would go here */}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          className="w-8 h-8 cursor-pointer"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <span className="text-sm text-gray-600">Custom color picker</span>
      </div>
    </div>
  );

  const FrameSelectionSection = () => (
    <div>
      <label className="block text-sm font-medium mb-2">Frame Style</label>
      <div className="grid grid-cols-2 gap-3">
        {["None", "Simple", "Rounded", "Ornamental"].map((frame) => (
          <div
            key={frame}
            className="flex flex-col items-center gap-1"
            onClick={() => setSelectedFrame(frame)}
          >
            <div
              className={`w-full aspect-square rounded flex items-center justify-center cursor-pointer ${
                selectedFrame === frame
                  ? "border-2 border-blue-400"
                  : "border border-gray-300"
              }`}
            >
              {frame !== "None" && (
                <div className="w-3/4 h-3/4 border-2 border-gray-400"></div>
              )}
            </div>
            <span className="text-xs text-gray-600">{frame}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 w-full max-w-[100vw] bg-gray-200 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold dark:text-gray-300">Settings</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            General Settings
          </span>
        </div>
        <div className="flex items-center space-x-4 border border-gray-300 dark:border-gray-600 rounded-md p-2">
          <img
            src="https://www.app.menutigr.com/static/media/copy.f4a907cfacfdd8f91d823668cd6856bb.svg"
            alt="Copy Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
            alt="QR Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <button
            className="bg-primary text-white px-5 py-2 rounded-md flex items-center hover:bg-teal-700 transition-colors duration-200 cursor-pointer"
            onClick={() => alert("Open App clicked!")}
          >
            <FaUtensils className="mr-2" />
            Open App
          </button>
        </div>
      </div>

      {/* Tabs and Content Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {/* Left Arrow Button */}
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

            {/* Tabs Container */}
            <div
              ref={containerRef}
              className="flex flex-1 overflow-x-hidden w-full"
            >
              {tabs
                .slice(visibleStartIndex, visibleStartIndex + visibleTabsCount)
                .map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(el) => (tabsRef.current[index] = el)}
                    className={`px-4 py-3 font-medium text-sm cursor-pointer flex-shrink-0 flex items-center ${
                      currentPage === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setCurrentPage(tab.id)}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
            </div>

            {/* Right Arrow Button */}
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
        <div className="p-6">
          {/* Profile Tab */}
          {currentPage === "profile" && (
            <div className="w-full max-w-screen-lg mx-auto px-4">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Profile Settings
                </h2>
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              {/* Upload Section */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 w-full">
                <div className="flex flex-col w-full sm:w-auto">
                  <label className="text-md text-gray-500 font-medium dark:text-gray-300 mb-4">
                    Logo <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="w-full sm:w-[400px] h-[250px] sm:h-[300px] bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center relative cursor-pointer hover:border-primary transition"
                    onClick={triggerFileInput}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                    {profileData.previewImage ? (
                      <img
                        src={profileData.previewImage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-center px-4">
                        <img
                          src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                          alt="Upload"
                          className="w-12 h-12 mb-3"
                        />
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          Drag 'n' drop some files here,
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          or click to select files
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Preferred size: 400x300px
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-6 w-full max-w-2xl">
                {/* First Name */}
                <div
                  className={`flex flex-col sm:flex-row items-stretch border ${
                    focusedField === "firstName"
                      ? "border-primary"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md transition-colors`}
                >
                  <label className="w-full sm:w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("firstName")}
                    onBlur={handleBlur}
                    placeholder="Enter first name"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md sm:rounded-b-none sm:rounded-r-md"
                    required
                  />
                </div>

                {/* Last Name */}
                <div
                  className={`flex flex-col sm:flex-row items-stretch border ${
                    focusedField === "lastName"
                      ? "border-primary"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md transition-colors`}
                >
                  <label className="w-full sm:w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("lastName")}
                    onBlur={handleBlur}
                    placeholder="Enter last name"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md sm:rounded-b-none sm:rounded-r-md"
                    required
                  />
                </div>

                {/* Description */}
                <div
                  className={`flex flex-col sm:flex-row border ${
                    focusedField === "description"
                      ? "border-primary"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md transition-colors`}
                >
                  <label className="w-full sm:w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-center">
                    Description <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={profileData.description}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("description")}
                    onBlur={handleBlur}
                    placeholder="Enter description"
                    rows={3}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md sm:rounded-b-none sm:rounded-r-md resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          {/* Restaurant Tab */}
          {currentPage === "restaurant" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Restaurant Settings
                </h2>
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>

              {/* Divider Line (full width) */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              <div className="max-w-md">
                {/* Cover Image Upload */}
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                  <div className="flex flex-col w-full">
                    <label className="text-md text-gray-500 font-medium dark:text-gray-300 mb-4">
                      Cover image <span className="text-red-500">*</span>
                    </label>
                    <div
                      className="w-full h-[200px] bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center relative cursor-pointer hover:border-primary transition"
                      onClick={triggerFileInput}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      {profileData.previewImage ? (
                        <img
                          src={profileData.previewImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-center px-4">
                          <img
                            src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                            alt="Upload"
                            className="w-12 h-12 mb-3"
                          />
                          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            Drag 'n' drop cover image here,
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            or click to select files
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Restaurant Information */}
                <div className="space-y-6">
                  {/* Restaurant Name */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "restaurantName"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      value="natila"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("restaurantName")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "address"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("address")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "email"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value="huluale12@gmail.com"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    />
                  </div>

                  {/* Contact Number */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "contactNumber"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("contactNumber")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                    />
                  </div>

                  {/* Default Language */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "defaultLanguage"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Language <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="defaultLanguage"
                      value="english"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("defaultLanguage")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "currency"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Currency <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="currency"
                      value="usd"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("currency")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="jpy">JPY (¥)</option>
                    </select>
                  </div>

                  {/* Default Food Image Toggle */}
                  <div className="flex items-center justify-between py-3 border border-gray-300 dark:border-gray-600 rounded-md px-4">
                    <h3 className="font-medium text-sm">Default food image</h3>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Tab */}
          {currentPage === "notification" && (
            <div>
              {/* Header with Save Button (right-aligned) */}
              <div className="">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      Notification Settings
                    </h2>
                    <div className="flex items-center px-4 py-3 border border-primary rounded-sm">
                      <FaQuestionCircle className="text-primary mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400 ">
                        Manage your notifications sounds
                      </span>
                    </div>
                  </div>
                  <button
                    className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                    onClick={handleSave}
                  >
                    Save
                  </button>
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
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span className="text-sm">Enable</span>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Sound <span className="text-red-500">*</span>
                      </label>
                      <select className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md">
                        <option>Default Sound</option>
                        <option>Sound 1</option>
                        <option>Sound 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Feedback Notification Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Feedback notification sound
                  </h3>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span className="text-sm">Enable</span>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Sound <span className="text-red-500">*</span>
                      </label>
                      <select className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md">
                        <option>Sound 1</option>
                        <option>Default Sound</option>
                        <option>Sound 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Hot-action Notification Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Hot-action notification sound
                  </h3>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span className="text-sm">Enable</span>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Sound <span className="text-red-500">*</span>
                      </label>
                      <select className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md">
                        <option>Sound 2</option>
                        <option>Default Sound</option>
                        <option>Sound 1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Order Settings Tab */}
          {currentPage === "order" && (
            <div>
              {/* Header with Save Button (full width) */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Order Settings
                </h2>
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>

              {/* Divider Line (full width) */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              {/* Content with restricted width */}
              <div className="max-w-md">
                {/* Customers Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 mb-6">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Customers
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span>Enable Customer Tip</span>
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span>Enable Cancel Order</span>
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Invoice Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Invoice
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Invoice ID Prefix{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value="INVOICE"
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Developer Tab */}
          {currentPage === "developer" && (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Developer Settings
                </h2>
              </div>

              {/* Divider Line */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              {/* Content */}
              <div className="max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">
                    Personal Access Tokens
                  </h3>
                  <button className="text-white text-sm font-medium bg-[#D84343] hover:bg-[#C62828] px-4 py-2 rounded-sm">
                    Revoke All
                  </button>
                </div>

                {/* Token Creation Form */}
                <div className="bg-gray-100 p-6 mb-8">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md mb-4">
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                      Token name
                    </label>
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      placeholder="Enter token name"
                    />
                  </div>

                  <div className="flex justify-center mb-4">
                    <span className="text-gray-500 bg-gray-300 px-4 py-3 rounded-sm">
                      Generate New Token
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tokens you have generated that can be used to access
                    Menutiger API
                  </p>
                </div>

                {/* Tokens List */}
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                    alt="No tokens"
                    className="h-24 w-24 mb-4"
                  />
                  <p className="text-gray-500 dark:text-gray-400">
                    No records available
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {currentPage === "billing" && (
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm sm:text-md px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-sm text-primary dark:bg-gray-700 dark:text-gray-300">
                  Billing & Plans
                </h2>
              </div>

              {/* Parallel Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* Current Plan Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 sm:p-6">
                  <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    Current Plan
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-200 px-3 sm:px-4 py-4 sm:py-6">
                    <div className="flex flex-row gap-2 sm:gap-4 items-center">
                      <span className="text-lg sm:text-xl font-semibold text-primary">
                        FREEMIUM
                      </span>
                      <span className="py-1 px-2 sm:px-3 text-xs bg-secondary hover:bg-primary text-white dark:bg-green-900 dark:text-green-200 rounded-2xl">
                        Active
                      </span>
                    </div>
                    <button className="bg-secondary hover:bg-primary text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-2 text-white rounded-sm shadow-md mt-2 sm:mt-0 w-full sm:w-auto text-center">
                      Manage
                    </button>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 sm:p-6">
                  <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    Payment method
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-200 px-3 sm:px-4 py-4 sm:py-6">
                    <span className="text-sm sm:text-md text-gray-400">
                      No payment method added
                    </span>
                    <button className="bg-secondary hover:bg-primary text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-2 text-white rounded-sm shadow-md mt-2 sm:mt-0 w-full sm:w-auto text-center">
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-end my-2 text-sm sm:text-base">
                <span>Looking to cancel subscription?</span>
                <button className="border border-red-400 px-3 sm:px-4 py-1 rounded-sm text-xs sm:text-sm text-red-400 font-medium w-full sm:w-auto text-center">
                  Cancel Subscription
                </button>
              </div>

              {/* Upcoming Bill Section */}
              <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 sm:p-6 mb-6">
                <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                  Upcoming Bill
                </h3>
                <div className="w-full overflow-x-auto scrollbar border border-gray-200 dark:border-gray-700 rounded-lg">
                  <table className="w-full min-w-[600px] text-sm">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700 w-1/2">
                          Subscription
                        </td>
                        <td className="p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          1 × Freemium (at $0.00 / month)
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700">
                          Total
                        </td>
                        <td className="p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          $0.00
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700">
                          Due on
                        </td>
                        <td className="p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Jul 17, 2025
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Past Invoices Section */}
                <div className="mt-4">
                  <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    Past Invoices
                  </h3>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <div className="overflow-x-auto scrollbar">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                            >
                              <div className="flex items-center">
                                ID
                                <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-up"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                            >
                              <div className="flex items-center">
                                Date
                                <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-up"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                            >
                              <div className="flex items-center justify-end">
                                Amount (USD)
                                <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-up"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                            >
                              <div className="flex items-center justify-end">
                                Status
                                <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-up"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                              <a
                                href="#"
                                className="text-xs sm:text-sm text-primary hover:underline dark:text-primary-300 truncate block max-w-[120px] sm:max-w-none"
                              >
                                in_1Rb4u9BlBJOreIXbfGxIPxBiextenal-link
                              </a>
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              Jun 17, 2025
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              $0
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right">
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                                Paid
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Restaurant QR Code Tab */}
          {currentPage === "qr" && (
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 w-full">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
                    <span>Customize QR code </span>{" "}
                    <span className="text-primary">Customize QR code</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border border-primary dark:border-primary rounded-sm text-sm text-gray-700 dark:text-gray-300">
                    <FaQuestionCircle className="text-primary" />
                    <span>Customize your QR code for Restaurant</span>
                  </div>
                </div>
                <button
                  className="bg-secondary text-white px-4 py-2 rounded-sm hover:bg-primary transition cursor-pointer"
                  onClick={() => {
                    const qrSettings = {
                      logo: selectedLogo,
                      pattern: selectedPattern,
                      eyeStyle: selectedEyeStyle,
                      color: selectedColor,
                      frame: selectedFrame,
                    };
                    console.log("QR Settings Saved:", qrSettings);
                    alert("QR settings saved successfully!");
                  }}
                >
                  Save
                </button>
              </div>
              <div className="max-w-4xl mx-auto mt-10">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 md:w-1/2">
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
                            <div className="p-4 bg-white animate-fadeIn">
                              {tab.id === "logo" && <LogoUploadSection />}
                              {tab.id === "pattern" && (
                                <PatternSelectionSection />
                              )}
                              {tab.id === "eyes" && <EyeStyleSection />}
                              {tab.id === "color" && <ColorSelectionSection />}
                              {tab.id === "frame" && <FrameSelectionSection />}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 md:w-1/2 bg-gray-50">
                    <QRPreviewSection />
                    <ScanReminderSection />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
