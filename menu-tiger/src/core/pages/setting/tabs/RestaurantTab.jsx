import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import SaveButton from "../../../commons/SaveButton";
import { FaTrash } from "react-icons/fa";

function RestaurantTab() {
  const [formData, setFormData] = useState({
    restaurantName: "Tiger",
    address: "",
    email: "huluale12@gmail.com",
    contactNumber: "",
    defaultLanguage: "english",
    currency: "usd",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isDefaultImage, setIsDefaultImage] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [logoData, setLogoData] = useState({
    logoImage: null,
    logoPreview: null,
  });
  const [coverData, setCoverData] = useState({
    coverImage: null,
    coverPreview:
      "https://menutigr-resources.s3.us-west-2.amazonaws.com/restaurant/coverimage/61f26299074a0b5f3fce2fab.jpeg",
  });
  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleSave = () => {
    // Validate all fields
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    const isDefaultImageChecked = isDefaultImage;

    if (!isFormValid || !isDefaultImageChecked) {
      toast.error(
        "Please fill all required fields and enable Default Food Image.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: "#ef4444",
            color: "#f8fafc",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          },
        }
      );
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Saving restaurant settings:", {
        ...formData,
        defaultFoodImage: isDefaultImage,
        logoImage: logoData.logoImage,
        coverImage: coverData.coverImage,
      });
      toast.success("Restaurant settings saved successfully!", {
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
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoData({
          logoImage: file,
          logoPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverData({
          coverImage: file,
          coverPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoInput = () => {
    logoInputRef.current.click();
  };

  const triggerCoverInput = () => {
    coverInputRef.current.click();
  };

  const removeLogo = () => {
    setLogoData({
      logoImage: null,
      logoPreview: null,
    });
  };

  const removeCover = () => {
    setCoverData({
      coverImage: null,
      coverPreview: null,
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
          Restaurant Settings
        </h2>

        <SaveButton onClick={handleSave} />
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

      {/* Logo Upload Section - At the top */}
      <div className="flex flex-col w-full max-w-md">
        <label className="text-md text-gray-500 font-medium dark:text-gray-300 mb-4">
          Restaurant Logo <span className="text-red-500">*</span>
        </label>
        {!logoData.logoPreview ? (
          <div
            className="w-full max-w-md h-[200px] bg-gray-50 dark:bg-gray-800 border-4 border-dashed border-primary dark:border-gray-600 rounded-xl flex items-center justify-center relative cursor-pointer hover:border-primary"
            onClick={triggerLogoInput}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={logoInputRef}
              onChange={handleLogoUpload}
            />
            <div className="flex flex-col items-center text-center px-4">
              <img
                src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                alt="Upload"
                className="w-12 h-12 mb-3"
              />
              <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                Click to upload logo
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md h-[200px] bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center relative">
            <img
              src={logoData.logoPreview}
              alt="Logo Preview"
              className="w-full h-full object-contain rounded-xl p-2"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeLogo();
              }}
              className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-md shadow-md hover:bg-gray-100"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cover Image Section - At the bottom */}
      <div className="flex flex-col w-full max-w-md">
        <label className="text-md text-gray-500 font-medium dark:text-gray-300 my-4">
          Cover Image <span className="text-red-500">*</span>
        </label>
        {!coverData.coverPreview ? (
          <div
            className="w-full max-w-md h-[200px] bg-gray-50 dark:bg-gray-800 border-4 border-dashed border-primary dark:border-gray-600 rounded-xl flex items-center justify-center relative cursor-pointer hover:border-primary"
            onClick={triggerCoverInput}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={coverInputRef}
              onChange={handleCoverUpload}
            />
            <div className="flex flex-col items-center text-center px-4">
              <img
                src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                alt="Upload"
                className="w-12 h-12 mb-3"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                Click to upload cover image
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md h-[200px] bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center relative">
            <img
              src={coverData.coverPreview}
              alt="Cover Preview"
              className="w-full h-full object-cover rounded-xl"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeCover();
              }}
              className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-md shadow-md hover:bg-gray-100"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Restaurant Information */}
      <div className="max-w-md mb-8">
        <div className="space-y-6">
          {/* Restaurant Name */}
          <div
            className={`flex items-center border ${
              focusedField === "restaurantName"
                ? "border-primary"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md transition-colors`}
          >
            <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
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
            <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
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
            <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
            <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              onFocus={() => handleFocus("contactNumber")}
              onBlur={handleBlur}
              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
              required
            />
          </div>

          {/* Default Language */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 transition-colors relative">
            <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
              Language <span className="text-red-500">*</span>
            </label>
            <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 relative">
              <div
                className="w-full bg-transparent text-gray-700 dark:text-gray-100 flex justify-between items-center cursor-pointer"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span>
                  {formData.defaultLanguage.charAt(0).toUpperCase() +
                    formData.defaultLanguage.slice(1)}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 dark:text-gray-300 transition-transform ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {isLanguageOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                  {["english", "spanish", "french", "german"].map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        formData.defaultLanguage === option
                          ? "bg-fifth dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => {
                        setFormData({ ...formData, defaultLanguage: option });
                        setIsLanguageOpen(false);
                      }}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Currency */}
          <div
            className={`flex items-center border ${
              focusedField === "currency"
                ? "border-primary"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md transition-colors relative`}
          >
            <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
              Currency <span className="text-red-500">*</span>
            </label>
            <div
              className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 relative"
              onFocus={() => handleFocus("currency")}
              onBlur={handleBlur}
            >
              <div
                className="w-full bg-transparent text-gray-700 dark:text-gray-100 flex justify-between items-center cursor-pointer"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              >
                <span>
                  {formData.currency === "usd" && "USD ($)"}
                  {formData.currency === "eur" && "EUR (€)"}
                  {formData.currency === "gbp" && "GBP (£)"}
                  {formData.currency === "jpy" && "JPY (¥)"}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 dark:text-gray-300 transition-transform ${
                    isCurrencyOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {isCurrencyOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                  {[
                    { value: "usd", label: "USD ($)" },
                    { value: "eur", label: "EUR (€)" },
                    { value: "gbp", label: "GBP (£)" },
                    { value: "jpy", label: "JPY (¥)" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        formData.currency === option.value
                          ? "bg-fifth dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => {
                        setFormData({ ...formData, currency: option.value });
                        setIsCurrencyOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Default Food Image Toggle */}
          <div className="flex items-center justify-between py-3 border border-gray-300 dark:border-gray-600 rounded-md px-4">
            <h3 className="font-medium text-sm">
              Default food image <span className="text-red-500">*</span>
            </h3>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={isDefaultImage}
                onChange={() => setIsDefaultImage(!isDefaultImage)}
              />
              <div className="relative w-12 h-4 overflow-visible">
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                    isDefaultImage
                      ? "bg-primary/20"
                      : "bg-gray-400 dark:bg-gray-700"
                  }`}
                ></div>
                <div
                  className={`absolute -top-[6px] ${
                    isDefaultImage
                      ? "left-[26px] bg-primary border-primary/50"
                      : "left-0 bg-white border-gray-100 shadow-lg"
                  } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantTab;
