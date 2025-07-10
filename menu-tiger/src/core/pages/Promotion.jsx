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
} from "react-icons/fa";

function Promotion() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [currentTab, setCurrentTab] = useState("promotion");
  const [promotions, setPromotions] = useState([]);
  const [editingId, setEditingId] = useState(null);
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
  const [focusedField, setFocusedField] = useState(null);
  const fileInputRef = useRef(null);

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
      alert("Please fill in all required fields!");
      return;
    }

    if (editingId) {
      // Update existing promotion
      setPromotions(
        promotions.map((promo) =>
          promo.id === editingId ? { ...promotionData, id: editingId } : promo
        )
      );
    } else {
      // Add new promotion
      const newPromotion = {
        ...promotionData,
        id: Date.now(),
        status: "Active",
        createdAt: new Date().toLocaleDateString(),
      };
      setPromotions([...promotions, newPromotion]);
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

      {/* Body Content */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {isAddingNew ? (
          <>
            {/* Back arrow and save button */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer flex items-center justify-center w-10 h-10"
                  onClick={handleBackClick}
                  aria-label="Back"
                  title="Back"
                >
                  <FaChevronLeft />
                </button>
                <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md select-none">
                  <span>Promotions</span>{" "}
                  <span className="text-gray-400">/</span>{" "}
                  <span className="text-primary">Add New</span>
                </div>
              </div>
              <button
                className="bg-secondary cursor-pointer text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
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
                  <div
                    className={`flex items-center border ${
                      focusedField === "type"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Promotion type <span className="text-red-500">*</span>
                    </span>
                    <select
                      name="type"
                      value={promotionData.type}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("type")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                    >
                      <option value="discount_on_cart">Discount on cart</option>
                      <option value="free_shipping">Free shipping</option>
                      <option value="buy_x_get_y">Buy X Get Y</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "name"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
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
                    className={`flex flex-col border ${
                      focusedField === "description"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                      Description <span className="text-red-500">*</span>
                    </span>
                    <textarea
                      name="description"
                      value={promotionData.description}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("description")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-b-md"
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
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
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
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
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
                  <div
                    className={`flex items-center border ${
                      focusedField === "stores"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Stores <span className="text-red-500">*</span>
                    </span>
                    <select
                      name="stores"
                      value={promotionData.stores}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("stores")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                    >
                      <option value="">Select store</option>
                      <option value="all">All stores</option>
                      <option value="main">Main store</option>
                    </select>
                  </div>

                  {/* Order type */}
                  <div
                    className={`flex items-center border ${
                      focusedField === "orderType"
                        ? "border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Order type <span className="text-red-500">*</span>
                    </span>
                    <select
                      name="orderType"
                      value={promotionData.orderType}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("orderType")}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                    >
                      <option value="">Select order type</option>
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  {/* Custom discount period */}
                  <div className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-md">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Custom discount period
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="customPeriod"
                        checked={promotionData.customPeriod}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

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
              <div className="space-y-4">
                <p>Localize content goes here...</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Original content when not adding new */}
            <div className="mb-6">
              <div className="flex flex-row sm:flex-row gap-4 items-start">
                <button
                  className="flex items-center cursor-pointer bg-primary text-white px-4 py-3 rounded-sm hover:bg-teal-700 transition-colors duration-200"
                  onClick={handleAddNewClick}
                >
                  <FaPlus className="mr-2" />
                  Add New
                </button>
                <div className="border border-primary rounded-lg px-4 py-1 max-w-xl flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
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
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={promo.status === "Active"}
                                onChange={() => togglePromotionStatus(promo.id)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </label>
                            <button
                              onClick={() => handleEdit(promo.id)}
                              className="text-gray-500 hover:text-primary"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(promo.id)}
                              className="text-gray-500 hover:text-red-500"
                              title="Delete"
                            >
                              <FaTrash />
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
    </div>
  );
}

export default Promotion;
