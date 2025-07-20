import React, { useState, useRef } from "react";
import {
  FaBullhorn,
  FaUtensils,
  FaPlus,
  FaQuestion,
  FaArrowUp,
  FaChevronLeft,
  FaTrash,
  FaEdit,
  FaQuestionCircle,
  FaCalendarAlt,
  FaClock,
  FaChevronDown,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OpenAppPanel from "../../commons/OpenAppPanel";
import AddNewButton from "../../commons/AddNewButton";
import BackButton from "../../commons/BackButton";
import SaveButton from "../../commons/SaveButton";
import ToastProvider from "../../commons/ToastProvider";

function Promotion() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [currentTab, setCurrentTab] = useState("promotion");
  const [promotions, setPromotions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [promotionData, setPromotionData] = useState({
    type: "discount_on_cart",
    name: "",
    description: "",
    discount: "",
    minOrderAmount: "",
    stores: "",
    orderType: "",
    customPeriod: false,
    image:
      "https://menutigr-resources.s3.us-west-2.amazonaws.com/default_discount_image.png",
  });
  const [checked, setChecked] = useState(false);
  const [hasCustomPeriod, setHasCustomPeriod] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const startRef = useRef();
  const dropdownRef = useRef(null);
  const endRef = useRef();
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      hasCustomPeriod,
      startDateTime,
      endDateTime,
    });
  };

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Confirm Deletion
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this promotion? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowDeletePopup(false)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setPromotions(
                promotions.filter((promo) => promo.id !== promotionToDelete)
              );
              setShowDeletePopup(false);
              toast.success("Promotion deleted successfully");
            }}
            className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const handleBackClick = () => {
    setIsAddingNew(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPromotionData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    if (
      !promotionData.name ||
      !promotionData.description ||
      !promotionData.discount
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (editingId) {
      // Update existing promotion
      setPromotions(
        promotions.map((promo) =>
          promo.id === editingId ? { ...promotionData, id: editingId } : promo
        )
      );
      toast.success("Promotion updated successfully");
    } else {
      // Add new promotion
      const newPromotion = {
        ...promotionData,
        id: Date.now(),
        status: "Active",
        createdAt: new Date().toLocaleDateString(),
      };
      setPromotions([...promotions, newPromotion]);
      toast.success("Promotion created successfully");
    }

    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const promoToEdit = promotions.find((promo) => promo.id === id);
    if (promoToEdit) {
      setPromotionData(promoToEdit);
      setIsAddingNew(true);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      setPromotions(promotions.filter((promo) => promo.id !== id));
    }
  };

  const togglePromotionStatus = (id) => {
    setPromotions(
      promotions.map((promo) =>
        promo.id === id
          ? {
              ...promo,
              status: promo.status === "Active" ? "Inactive" : "Active",
            }
          : promo
      )
    );
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setPromotionData({
      type: "discount_on_cart",
      name: "",
      description: "",
      discount: "",
      minOrderAmount: "",
      stores: "",
      orderType: "",
      customPeriod: false,
      image:
        "https://menutigr-resources.s3.us-west-2.amazonaws.com/default_discount_image.png",
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPromotionData({ ...promotionData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPromotionData({
      ...promotionData,
      image:
        "https://menutigr-resources.s3.us-west-2.amazonaws.com/default_discount_image.png",
    });
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Promotion</h1>
            <FaBullhorn className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Promotions for marketing
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Body Content */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {isAddingNew ? (
          <>
            {/* Back arrow and save button */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <BackButton onClick={handleBackClick} />
                <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md select-none">
                  <span>Promotions</span>{" "}
                  <span className="text-gray-400">/</span>{" "}
                  <span className="text-primary">Add New</span>
                </div>
              </div>
              <SaveButton onClick={handleSave} />
            </div>

            {/* Divider line */}
            <div className="border-b border-gray-300 dark:border-gray-600 mb-6"></div>

            {/* Tabs */}
            <div className="flex border-b border-gray-300 dark:border-gray-600 mb-6">
              <button
                className={`px-4 py-2 font-medium cursor-pointer ${
                  currentTab === "promotion"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setCurrentTab("promotion")}
              >
                Promotion
              </button>
              <button
                className={`px-4 py-2 font-medium cursor-pointer ${
                  currentTab === "localize"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setCurrentTab("localize")}
              >
                Localize
              </button>
            </div>

            {/* Tab Content */}
            {currentTab === "promotion" ? (
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Info box with ? icon */}
                <div className="border border-primary rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <FaQuestion className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Discount on your total cart value, usually combined with a
                      condition like minimum ordering amount
                    </p>
                  </div>
                </div>

                {/* Promotion form fields - all moved to left side */}
                <div className="space-y-4 max-w-2xl">
                  {/* Promotion type */}
                  <div className="relative w-full" ref={dropdownRef}>
                    <div
                      className={`flex items-center w-full rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 cursor-pointer border ${
                        focusedField === "type"
                          ? "border-primary dark:border-primary"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      onClick={() =>
                        setFocusedField(focusedField === "type" ? null : "type")
                      }
                    >
                      <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
                        Promotion type <span className="text-red-500">*</span>
                      </span>
                      <span className="flex-1 px-3 py-2">
                        {promotionData.type.replace(/_/g, " ")}
                      </span>
                      <FaChevronDown className="mx-3 text-gray-400 dark:text-gray-400" />
                    </div>

                    {focusedField === "type" && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                        {[
                          "discount_on_cart",
                          "free_shipping",
                          "buy_x_get_y",
                        ].map((item) => (
                          <div
                            key={item}
                            onClick={() => {
                              handleInputChange({
                                target: { name: "type", value: item },
                              });
                              setFocusedField(null);
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              promotionData.type === item
                                ? "bg-fifth dark:bg-gray-700 text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {item.replace(/_/g, " ")}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "name"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
                      Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={promotionData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      placeholder="Enter promotion name"
                    />
                  </div>

                  {/* Description */}
                  <div
                    className={`flex items-stretch border-2 ${
                      focusedField === "description"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap flex items-center">
                      Description <span className="text-red-500">*</span>
                    </span>
                    <textarea
                      name="description"
                      value={promotionData.description}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("description")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      placeholder="Enter description"
                      rows={3}
                    />
                  </div>

                  {/* Discount */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "discount"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
                      Discount <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="number"
                      name="discount"
                      value={promotionData.discount}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("discount")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                      placeholder="0"
                    />
                    <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      %
                    </span>
                  </div>

                  {/* Min order amount */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "minOrderAmount"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
                      Min order amount <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="number"
                      name="minOrderAmount"
                      value={promotionData.minOrderAmount}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("minOrderAmount")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none"
                      placeholder="0"
                    />
                    <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      USD
                    </span>
                  </div>

                  {/* Stores */}
                  <div className="relative w-full" ref={dropdownRef}>
                    <div
                      className={`flex items-center w-full rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 cursor-pointer border ${
                        dropdownOpen
                          ? "border-primary dark:border-primary"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
                        Stores <span className="text-red-500">*</span>
                      </span>
                      <span className="flex-1 px-3 py-2">
                        {promotionData.stores === "all"
                          ? "All stores"
                          : promotionData.stores === "main"
                          ? "Main store"
                          : "Select store"}
                      </span>
                      <FaChevronDown
                        className={`mx-3 text-gray-400 dark:text-gray-400 transition-transform ${
                          dropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>

                    {dropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                        {["", "all", "main"].map((item) => (
                          <div
                            key={item}
                            onClick={() => {
                              handleInputChange({
                                target: { name: "stores", value: item },
                              });
                              setDropdownOpen(false);
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              promotionData.stores === item
                                ? "bg-fifth dark:bg-gray-700 text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {item === "all"
                              ? "All stores"
                              : item === "main"
                              ? "Main store"
                              : "Select store"}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Order type */}
                  <div className="relative w-full" ref={dropdownRef}>
                    <div
                      className={`flex items-center w-full rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 cursor-pointer border ${
                        isOpen
                          ? "border-primary dark:border-primary"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap">
                        Order type <span className="text-red-500">*</span>
                      </span>
                      <span className="flex-1 px-3 py-2">
                        {promotionData.orderType === "delivery"
                          ? "Delivery"
                          : promotionData.orderType === "pickup"
                          ? "Pickup"
                          : promotionData.orderType === "both"
                          ? "Both"
                          : "Select order type"}
                      </span>
                      <FaChevronDown
                        className={`mx-3 text-gray-400 dark:text-gray-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                        {["", "delivery", "pickup", "both"].map((item) => (
                          <div
                            key={item}
                            onClick={() => {
                              handleInputChange({
                                target: { name: "orderType", value: item },
                              });
                              setIsOpen(false);
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              promotionData.orderType === item
                                ? "bg-fifth dark:bg-gray-700 text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {item === "delivery"
                              ? "Delivery"
                              : item === "pickup"
                              ? "Pickup"
                              : item === "both"
                              ? "Both"
                              : "Select order type"}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Custom discount period */}
                  <div className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-md">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="h-5 w-5 rounded cursor-pointer border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-gray-400 dark:text-gray-300">
                        Custom discount period
                      </span>
                    </div>
                    <FaQuestionCircle className="text-primary text-lg" />
                  </div>

                  {/* Show Start & End Date when checkbox is checked */}
                  {checked && (
                    <div className="space-y-4 mt-3">
                      {/* Start Date */}
                      <div
                        className={`flex items-stretch border-2 ${
                          focusedField === "startDate"
                            ? "border-primary"
                            : "border-gray-300 dark:border-gray-600"
                        } rounded-md transition-colors relative`}
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap flex items-center">
                          Start Date <span className="text-red-500">*</span>
                        </span>
                        <div className="relative flex-1">
                          <DatePicker
                            ref={startRef}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            onFocus={() => setFocusedField("startDate")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                            placeholderText="MM/DD/YYYY hh:mm aa"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeSelect
                            timeFormat="h:mm aa"
                            timeIntervals={15}
                            popperPlacement="bottom-start"
                            open={focusedField === "startDate"}
                            onClickOutside={() => setFocusedField(null)}
                          />
                          <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => {
                              setFocusedField("startDate");
                              startRef.current.setFocus();
                            }}
                          >
                            <FaCalendarAlt />
                          </div>
                        </div>
                      </div>

                      {/* End Date */}
                      <div
                        className={`flex items-stretch border-2 ${
                          focusedField === "endDate"
                            ? "border-primary"
                            : "border-gray-300 dark:border-gray-600"
                        } rounded-md transition-colors relative`}
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 whitespace-nowrap flex items-center">
                          End Date <span className="text-red-500">*</span>
                        </span>
                        <div className="relative flex-1">
                          <DatePicker
                            ref={endRef}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            onFocus={() => setFocusedField("endDate")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                            placeholderText="MM/DD/YYYY hh:mm aa"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeSelect
                            timeFormat="h:mm aa"
                            timeIntervals={15}
                            minDate={startDate}
                            popperPlacement="bottom-start"
                            open={focusedField === "endDate"}
                            onClickOutside={() => setFocusedField(null)}
                          />
                          <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => {
                              setFocusedField("endDate");
                              endRef.current.setFocus();
                            }}
                          >
                            <FaCalendarAlt />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Image upload */}
                  <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Image <span className="text-red-500">*</span>
                    </span>
                    <div className="mt-2">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={promotionData.image}
                            alt="Promotion"
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          {promotionData.image !==
                            "https://menutigr-resources.s3.us-west-2.amazonaws.com/default_discount_image.png" && (
                            <button
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <FaTrash size={12} />
                            </button>
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="promotion-image"
                            ref={fileInputRef}
                          />
                          <label
                            htmlFor="promotion-image"
                            className="cursor-pointer text-sm text-primary hover:underline"
                          >
                            Upload new image
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Default image will be used if none is uploaded
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-md text-gray-400 font-medium">
                  Text localization
                </p>
                <FaQuestionCircle className="text-primary cursor-pointer" />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Original content when not adding new */}
            <div className="mb-6">
              <div className="flex flex-row sm:flex-row gap-4 items-start">
                <AddNewButton
                  onClick={handleAddNewClick}
                  className="py-3 hover:bg-teal-700"
                  iconClassName="text-lg"
                />
                <div className="border border-primary rounded-lg px-4 py-3 max-w-xl flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FaQuestion className="text-primary mr-3" />
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">
                    Drive sales and attract new customers with targeted
                    promotions
                  </p>
                </div>
              </div>

              {/* Border below */}
              <div className="border-b border-gray-300 dark:border-gray-600 mt-4"></div>
            </div>

            {/* Table with headers */}
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group">
                      <div className="flex items-center">
                        Name
                        <FaArrowUp className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group">
                      <div className="flex items-center">
                        Description
                        <FaArrowUp className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group">
                      <div className="flex items-center">
                        Status
                        <FaArrowUp className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {promotions.length > 0 ? (
                    promotions.map((promo) => (
                      <tr key={promo.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                          {promo.name}
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                          <div className="line-clamp-2">
                            {promo.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`px-3 py-1 rounded-sm text-xs font-medium ${
                                promo.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {promo.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={promo.status === "Active"}
                                onChange={() => togglePromotionStatus(promo.id)}
                                className="sr-only peer"
                              />
                              <div className="relative w-12 h-4 overflow-visible">
                                {/* Track background */}
                                <div
                                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                                    promo.status === "Active"
                                      ? "bg-primary/20"
                                      : "bg-gray-400 dark:bg-gray-700"
                                  }`}
                                ></div>

                                {/* Thumb (circle) - White when left, primary when right */}
                                <div
                                  className={`absolute -top-[5px] ${
                                    promo.status === "Active"
                                      ? "left-[26px] bg-primary border-primary/50"
                                      : "left-0 bg-white border-white"
                                  } w-7 h-7 rounded-full border transform transition-all duration-200`}
                                ></div>
                              </div>
                            </label>
                            <button
                              onClick={() => handleEdit(promo.id)}
                              className="text-gray-500 hover:text-primary"
                              title="Edit"
                            >
                              <FaEdit className="text-primary" />
                            </button>
                            <button
                              onClick={() => {
                                setPromotionToDelete(promo.id);
                                setShowDeletePopup(true);
                              }}
                              className="text-gray-500 hover:text-red-500"
                              title="Delete"
                            >
                              <FaTrash className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="Empty"
                          className="mx-auto h-24 w-24 opacity-50"
                        />
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                          No promotions found
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {showDeletePopup && <DeleteConfirmationModal />}
      <ToastProvider />
    </div>
  );
}

export default Promotion;
