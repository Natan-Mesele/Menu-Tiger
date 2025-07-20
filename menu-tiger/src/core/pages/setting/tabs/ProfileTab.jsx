import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { FaQuestionCircle, FaTimes, FaTrash } from "react-icons/fa";
import SaveButton from "../../../commons/SaveButton";

function ProfileTab() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    profileImage: null,
    previewImage: null,
  });

  const [focusedField, setFocusedField] = useState(null);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    if (!profileData.firstName.trim()) {
      toast.error("First name is required", {
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
      });
      return false;
    }

    if (!profileData.lastName.trim()) {
      toast.error("Last name is required", {
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
      });
      return false;
    }

    if (!profileData.description.trim()) {
      toast.error("Description is required", {
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
      });
      return false;
    }

    if (!profileData.previewImage) {
      toast.error("Profile photo is required", {
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
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Simulate API call
    setTimeout(() => {
      console.log("Saving profile data:", profileData);
      toast.success("Profile saved successfully!", {
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
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const removePhoto = () => {
    setProfileData((prev) => ({
      ...prev,
      profileImage: null,
      previewImage: null,
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
          Profile Settings
        </h2>

        <SaveButton onClick={handleSave} />
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

      {/* Upload Section */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 w-full max-w-md">
        <div className="flex flex-col w-full">
          <label className="text-md text-gray-500 font-medium dark:text-gray-300 mb-4">
            Logo <span className="text-red-500">*</span>
          </label>
          {!profileData.previewImage ? (
            <div
              className="w-full h-[220px] bg-gray-50 dark:bg-gray-800 border-4 border-dashed border-primary dark:border-gray-600 rounded-xl flex items-center justify-center relative cursor-pointer hover:border-primary"
              onClick={triggerFileInput}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <div className="flex flex-col items-center text-center px-4">
                <img
                  src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                  alt="Upload"
                  className="w-12 h-12 mb-3"
                />
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Click to upload photo
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Recommended: 300x150px
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-[220px] bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center relative">
              <img
                src={profileData.previewImage}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto();
                }}
                className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-md shadow-md hover:bg-gray-100"
                aria-label="Remove photo"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-6 w-full max-w-md">
        {/* First Name */}
        <div
          className={`flex flex-col sm:flex-row items-stretch border ${
            focusedField === "firstName"
              ? "border-primary"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md transition-colors`}
        >
          <label className="w-full sm:w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("firstName")}
            onBlur={() => setFocusedField(null)}
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
          <label className="w-full sm:w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("lastName")}
            onBlur={() => setFocusedField(null)}
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
          <label className="w-full sm:w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 sm:pt-3 border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-left">
            Description <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("description")}
            onBlur={() => setFocusedField(null)}
            placeholder="Enter description"
            rows={3}
            className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md sm:rounded-b-none sm:rounded-r-md resize-none"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;
