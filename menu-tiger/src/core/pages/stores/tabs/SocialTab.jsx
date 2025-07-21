import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import SaveButton from "../../../commons/SaveButton";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../../commons/ToastProvider";

function SocialTab() {
  const [isSaving, setIsSaving] = useState(false);
  const [socialData, setSocialData] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    snapchat: "",
    pinterest: "",
    foursquare: "",
    tripadvisor: "",
    zomato: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialData((prev) => {
      const updated = { ...prev, [name]: value };
      console.log("Updated socialData:", updated);
      return updated;
    });
  };

  const handleSave = () => {
    setIsSaving(true);

    const hasAnyInput = Object.values(socialData).some(
      (url) => url.trim() !== ""
    );

    if (!hasAnyInput) {
      toast.error("Please enter at least one social media link.");
      setIsSaving(false);
      return;
    }

    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    for (const [platform, url] of Object.entries(socialData)) {
      if (url.trim() !== "" && !urlPattern.test(url)) {
        toast.error(`Invalid URL format for ${platform}`);
        setIsSaving(false);
        return;
      }
    }

    console.log("Saved Social Data:", socialData);
    toast.success("Social media links saved successfully!");
    setIsSaving(false);
  };

  const socialPlatforms = [
    {
      name: "facebook",
      label: "Facebook",
      icon: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
      placeholder: "https://facebook.com/yourpage",
    },
    {
      name: "twitter",
      label: "Twitter (X)",
      icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png",
      placeholder: "https://twitter.com/yourhandle",
    },
    {
      name: "instagram",
      label: "Instagram",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
      placeholder: "https://instagram.com/yourprofile",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      placeholder: "https://linkedin.com/company/yourpage",
    },
    {
      name: "youtube",
      label: "YouTube",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174883.png",
      placeholder: "https://youtube.com/yourchannel",
    },
    {
      name: "tiktok",
      label: "TikTok",
      icon: "https://cdn-icons-png.flaticon.com/512/3046/3046126.png",
      placeholder: "https://tiktok.com/@yourusername",
    },
    {
      name: "snapchat",
      label: "Snapchat",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733622.png",
      placeholder: "https://www.snapchat.com/add/yourusername",
    },
    {
      name: "pinterest",
      label: "Pinterest",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174863.png",
      placeholder: "https://www.pinterest.com/yourusername",
    },
    {
      name: "foursquare",
      label: "Foursquare",
      icon: "https://cdn-icons-png.flaticon.com/512/3670/3670151.png",
      placeholder: "https://foursquare.com/yourpage",
    },
    {
      name: "tripadvisor",
      label: "Tripadvisor",
      icon: "https://cdn-icons-png.flaticon.com/512/3536/3536669.png",
      placeholder: "https://www.tripadvisor.com/Profile/yourprofile",
    },
    {
      name: "zomato",
      label: "Zomato",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968841.png",
      placeholder: "https://www.zomato.com/yourpage",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex flex-row items-center gap-2 sm:gap-3 min-w-0">
          <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-md shadow-md select-none">
            <span>Social Accounts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border border-primary dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300">
            <FaQuestionCircle className="text-primary" />
            <span>Add your social accounts</span>
          </div>
        </div>
        <SaveButton onClick={handleSave} disabled={isSaving} />
      </div>

      {/* Social Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPlatforms.map((social) => (
          <div
            key={social.name}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-2 border border-gray-200 dark:border-gray-600">
                <img
                  src={social.icon}
                  alt={social.label}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-medium text-xl">{social.label}</h4>
            </div>
            <input
              type="text"
              name={social.name}
              placeholder={social.placeholder}
              value={socialData[social.name]}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-base"
            />
          </div>
        ))}
      </div>
      <ToastProvider />
    </div>
  );
}

export default SocialTab;
