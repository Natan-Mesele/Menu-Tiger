import React, { useState, useRef, useEffect } from "react";
import {
  FaRocket,
  FaUtensils,
  FaPlus,
  FaList,
  FaLock,
  FaQuestionCircle,
  FaChevronLeft,
  FaLanguage,
  FaArrowUp,
  FaChevronDown,
  FaCar,
  FaSearch,
  FaStore,
  FaMoneyBillWave,
  FaFilter,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HotActions() {
  const [activeTab, setActiveTab] = useState("create");
  const [editSection, setEditSection] = useState("hot-actions");
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Today");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const [editingAction, setEditingAction] = useState(null);
  const [showWifiPopup, setShowWifiPopup] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState(null);
  const firstDropdownRef = useRef(null);
  const secondDropdownRef = useRef(null);
  const addNewRef = useRef(null);
  const containerRef = useRef(null);
  const targetRef = editingAction ? null : addNewRef;
  const [popupStyle, setPopupStyle] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [actionToDelete, setActionToDelete] = useState(null);

  const actionImages = [
    {
      id: 1,
      name: "Call for notes change",
      url: "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-for-notes-change.svg",
    },
    {
      id: 2,
      name: "Call to clean table",
      url: "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-to-clean-table.svg",
    },
    {
      id: 3,
      name: "Call someone",
      url: "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-someone.svg",
    },
    {
      id: 4,
      name: "Call to verify bill",
      url: "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-to-verify-bill.svg",
    },
  ];

  const [callActions, setCallActions] = useState([
    {
      id: 1,
      header: "Call for notes change",
      image: actionImages[0].url,
      message: "Call someone to change the notes",
      isAvailable: true,
    },
    {
      id: 2,
      header: "Call to clean table",
      image: actionImages[1].url,
      message: "Call someone to clean the table",
      isAvailable: true,
    },
    {
      id: 3,
      header: "Call someone",
      image: actionImages[2].url,
      message: "Call someone to the table",
      isAvailable: true,
    },
    {
      id: 4,
      header: "Call to verify bill",
      image: actionImages[3].url,
      message: "Call someone to the table to verify the bill",
      isAvailable: true,
    },
  ]);

  // Delete handler
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this action?"
    );
    if (confirmDelete) {
      setCallActions((prev) => prev.filter((action) => action.id !== id));
    }
  };

  // Open edit form with selected action
  const handleUpdate = (id) => {
    const actionToEdit = callActions.find((action) => action.id === id);
    if (actionToEdit) {
      setEditingAction({ ...actionToEdit });
      setEditSection("hot-actions");
    }
  };

  // Handle input change in edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAction((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageSelect = (imageUrl) => {
    setEditingAction((prev) => ({ ...prev, image: imageUrl }));
    setShowImageSelector(false);
  };

  // Save edited action
  const handleSaveEdit = () => {
    setCallActions((prev) =>
      prev.map((action) =>
        action.id === editingAction.id ? editingAction : action
      )
    );
    setEditingAction(null);
    toast.success("Action updated successfully");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingAction(null);
  };

  useEffect(() => {
    if (showWifiPopup && addNewRef.current && containerRef.current) {
      const buttonRect = addNewRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Calculate position relative to container
      const top = buttonRect.bottom - containerRect.top + 5; // 5px gap below button
      const left = buttonRect.left - containerRect.left;

      setPopupStyle({
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: "500px", // Fixed width or 'auto' if you prefer
        zIndex: 50,
      });
    }
  }, [showWifiPopup]);

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Confirm Deletion
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this action? This action cannot be
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
              setCallActions(
                callActions.filter((action) => action.id !== actionToDelete)
              );
              setShowDeletePopup(false);
              toast.success("Action deleted successfully");
            }}
            className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Hot Actions</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Create and view customer requested hot actions
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

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-0 bg-[#fafcff] rounded-md dark:bg-gray-800">
        <button
          className={`flex items-center cursor-pointer px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
            activeTab === "create"
              ? "text-primary border-primary"
              : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("create")}
        >
          <img
            src="https://www.app.menutigr.com/static/media/hot-actions-selected.ce5ab478b4446f64ed692c3777c18ded.svg"
            alt=""
            className="mr-2 w-4 h-4"
          />
          Create Hot Actions
        </button>
        <button
          className={`flex items-center cursor-pointer px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
            activeTab === "requests"
              ? "text-primary border-primary"
              : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          <FaList className="mr-2" />
          Hot Actions Requests
        </button>
      </div>

      {/* Content Box */}
      <div
        className="mt-0 pt-6 bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow"
        ref={containerRef}
      >
        {activeTab === "create" && !editingAction && (
          <div className="space-y-6">
            {/* Top Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-grow">
                {/* "Add New" Button */}
                <div ref={containerRef} className="relative inline-block">
                  {/* "Add New" Button */}
                  <div className="relative inline-block">
                    <button
                      ref={addNewRef}
                      onMouseEnter={() => {
                        if (popupTimeout) clearTimeout(popupTimeout);
                        setShowWifiPopup(true);
                      }}
                      onMouseLeave={() => {
                        const timer = setTimeout(() => {
                          if (!isPopupHovered) setShowWifiPopup(false);
                        }, 300);
                        setPopupTimeout(timer);
                      }}
                      className="flex items-center bg-gray-300 text-gray-600 px-4 py-3 rounded-md text-sm"
                    >
                      <FaPlus className="mr-2" /> Add New{" "}
                      <FaLock className="ml-2 text-sm" />
                    </button>

                    {showWifiPopup && (
                      <div
                        style={{
                          position: "fixed",
                          top: `${
                            addNewRef.current?.getBoundingClientRect().bottom +
                            window.scrollY +
                            5
                          }px`,
                          left: `${
                            addNewRef.current?.getBoundingClientRect().left +
                            window.scrollX
                          }px`,
                          width: "500px",
                          zIndex: 50,
                        }}
                        onMouseEnter={() => {
                          clearTimeout(popupTimeout);
                          setIsPopupHovered(true);
                        }}
                        onMouseLeave={() => {
                          setIsPopupHovered(false);
                          setShowWifiPopup(false);
                        }}
                        className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                      >
                        {/* Popup content remains the same */}
                        <div className="text-sm text-gray-700 dark:text-gray-300 text-left">
                          <div className="flex items-start justify-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                              Access Denied
                            </h3>
                          </div>

                          <p className="mb-4 text-gray-600 dark:text-gray-400">
                            You do not have permission to use this feature due
                            to limitations in your current plan. Please upgrade
                            or adjust your plan to gain access.
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            <button
                              onClick={() => {
                                setCurrentPage("billing");
                                setShowWifiPopup(false);
                              }}
                              className="w-full border border-primary text-primary dark:border dark:hover:border-secondary px-5 py-2 rounded-sm hover:bg-primary-dark text-base shadow-md"
                            >
                              Compare Plans
                            </button>
                            <button
                              onClick={() => setShowWifiPopup(false)}
                              className="w-full bg-secondary  text-white shadow-md dark:text-white px-5 py-2 rounded-sm hover:bg-primary text-base"
                            >
                              Upgrade Your Plan
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 max-w-xl border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300">
                  <FaQuestionCircle className="text-primary" />
                  <span>
                    Create hot actions your customers can request when ordering
                  </span>
                  <a
                    href="#!"
                    className="ml-2 text-primary hover:underline whitespace-nowrap"
                  >
                    Read more
                  </a>
                </div>
              </div>

              <div className="relative w-full sm:w-48">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:border-primary focus:ring-0 outline-none"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
                  />
                </svg>
              </div>
            </div>

            {/* Call Actions Table */}
            <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-white dark:bg-gray-800">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <div className="col-span-3 font-medium text-gray-800 dark:text-gray-100">
                    Header
                  </div>
                  <div className="col-span-3 font-medium text-gray-800 dark:text-gray-100">
                    Image
                  </div>
                  <div className="col-span-4 font-medium text-gray-800 dark:text-gray-100">
                    Message
                  </div>
                  <div className="col-span-2 font-medium text-gray-800 dark:text-gray-100">
                    Action
                  </div>
                </div>

                {/* Action Rows */}
                {callActions.map((action, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700  dark:hover:bg-gray-700"
                  >
                    {/* Header */}
                    <div className="md:col-span-3">
                      <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Header
                      </p>
                      <p className="text-sm text-gray-800 dark:text-gray-100">
                        {action.header}
                      </p>
                    </div>

                    {/* Image */}
                    <div className="md:col-span-3">
                      <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Image
                      </p>
                      <div className="flex justify-start md:justify-left">
                        <img
                          src={action.image}
                          alt={action.header}
                          className="w-8 h-8 object-contain dark:filter dark:brightness-0 dark:invert-[90%]"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-4">
                      <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Message
                      </p>
                      <p className="text-sm text-gray-800 dark:text-gray-100">
                        {action.message}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="md:col-span-2 flex items-center gap-4">
                      {/* Toggle Availability Switch */}
                      <button
                        title="Toggle Availability"
                        onClick={() =>
                          setCallActions((prev) =>
                            prev.map((a) =>
                              a.id === action.id
                                ? { ...a, isAvailable: !a.isAvailable }
                                : a
                            )
                          )
                        }
                        className={`relative w-10 h-4 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          action.isAvailable ? "bg-[#14b8a6]" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-secondary cursor-pointer w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                            action.isAvailable
                              ? "translate-x-6"
                              : "translate-x-0"
                          }`}
                        />
                      </button>

                      {/* Update Icon */}
                      <button
                        title="Update"
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                        onClick={() => handleUpdate(action.id)}
                      >
                        <img
                          src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                          alt="Edit"
                          className="w-5 h-5"
                        />
                      </button>

                      {/* Delete Icon */}
                      <button
                        title="Delete"
                        onClick={() => {
                          setActionToDelete(action.id);
                          setShowDeletePopup(true);
                        }}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <img
                          src="https://www.app.menutigr.com/static/media/delete.f9fb3a4cc8c70107a50718ec2199a285.svg"
                          alt="Delete"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "create" && editingAction && (
          <div>
            {/* Edit form top bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <button
                  className="bg-primary text-white p-2 rounded-md hover:bg-teal-700 transition cursor-pointer flex items-center justify-center w-10 h-10"
                  onClick={handleCancelEdit}
                  aria-label="Back"
                  title="Back"
                >
                  <FaChevronLeft />
                </button>
                <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 px-4 py-2 rounded-md select-none">
                  <span>Hot Actions</span>{" "}
                  <span className="text-gray-400">/</span>{" "}
                  <span className="text-primary">Edit Hot Action</span>
                </div>
              </div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-teal-700 transition cursor-pointer"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>

            {/* Edit section tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                className={`flex items-center cursor-pointer px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                  editSection === "hot-actions"
                    ? "text-primary border-primary"
                    : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setEditSection("hot-actions")}
              >
                <img
                  src="https://www.app.menutigr.com/static/media/hot-actions-selected.ce5ab478b4446f64ed692c3777c18ded.svg"
                  alt="Hot Action"
                  className="w-4 h-4 mr-2"
                />
                Hot Action
              </button>
              <button
                className={`flex items-center cursor-pointer px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                  editSection === "localize"
                    ? "text-primary border-primary"
                    : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setEditSection("localize")}
              >
                <FaLanguage className="mr-2" />
                Localize
              </button>
            </div>

            {/* Edit form fields - Hot Action */}
            {editSection === "hot-actions" && (
              <div className="space-y-4 max-w-sm">
                {/* Header Field */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <label className="w-24 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600">
                    Header <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="header"
                    value={editingAction.header}
                    onChange={handleEditChange}
                    className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
                    placeholder="Call to clean table"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <label className="w-24 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="message"
                    value={editingAction.message}
                    onChange={handleEditChange}
                    className="flex-1 px-3 py-2 bg-transparent focus:outline-none"
                    placeholder="Call someone to clean the table"
                    required
                  />
                </div>

                {/* Stores Field */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <label className="w-24 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600">
                    Stores <span className="text-red-500">*</span>
                  </label>
                  <select className="flex-1 px-3 py-2 bg-transparent focus:outline-none">
                    <option>Select store</option>
                    <option>Main Store</option>
                    <option>Branch 1</option>
                    <option>Branch 2</option>
                  </select>
                </div>

                {/* Icon Section */}
                <div className="pt-4">
                  <div className="flex flex-col">
                    <label className="w-24 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                      Icon <span className="text-red-500">*</span>
                    </label>
                    <div className="flex-1 px-3 py-2">
                      {/* Current Icon */}
                      <div className="flex justify-left py-2">
                        <img
                          src={editingAction.image}
                          alt="Current icon"
                          className="w-32 h-32 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Available Icons */}
                  <div className="mt-3">
                    <div className="grid grid-cols-4 gap-2">
                      {actionImages.map((img) => (
                        <div
                          key={img.id}
                          className={`p-1 rounded-md cursor-pointer flex flex-col items-center ${
                            editingAction.image === img.url
                              ? "ring-2 ring-primary"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleImageSelect(img.url)}
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Localization section */}
            {editSection === "localize" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg text-gray-500">Text localization</h2>
                  <FaQuestionCircle
                    className="text-primary hover:text-primary cursor-pointer"
                    title="Help"
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "requests" && (
          <div className="space-y-4">
            {/* Filter Controls */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-4 w-full">
              {/* First three buttons */}
              <button
                className={`w-full px-4 py-3 border rounded-md text-sm transition-colors duration-200 cursor-pointer ${
                  selectedRange === "Today"
                    ? "bg-primary text-white border-primary font-medium"
                    : "border-primary dark:border-gray-600 bg-white dark:bg-gray-800 text-primary font-medium dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedRange("Today")}
              >
                Today
              </button>

              <button
                className={`w-full px-4 py-3 border rounded-md text-sm transition-colors duration-200 cursor-pointer ${
                  selectedRange === "Week"
                    ? "bg-primary text-white border-primary font-medium"
                    : "border-primary dark:border-gray-600 bg-white dark:bg-gray-800 text-primary font-medium dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedRange("Week")}
              >
                Week
              </button>

              <button
                className={`w-full px-4 py-3 border rounded-md text-sm transition-colors duration-200 cursor-pointer ${
                  selectedRange === "Month"
                    ? "bg-primary text-white font-medium border-primary"
                    : "border-primary dark:border-gray-600 bg-white dark:bg-gray-800 text-primary font-medium dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedRange("Month")}
              >
                Month
              </button>

              {/* First dropdown - Status */}
              <div className="relative w-full" ref={firstDropdownRef}>
                <button
                  className="flex items-center w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 cursor-pointer text-left"
                  onClick={() => setFirstDropdownOpen(!firstDropdownOpen)}
                >
                  <img
                    src="https://www.app.menutigr.com/static/media/store.e0808a2a2a59e39e07e4c4eb3c95ad92.svg"
                    alt="Store Icon"
                    className="absolute left-3 w-5 h-5"
                  />
                  <span className="ml-2 truncate">{selectedStatus}</span>
                  <FaChevronDown className="absolute right-3 text-gray-400 dark:text-gray-500" />
                </button>

                {firstDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                    {["All", "Tiger"].map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setSelectedStatus(item);
                          setFirstDropdownOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Second dropdown - Payment */}
              <div className="relative w-full" ref={secondDropdownRef}>
                <button
                  className="flex items-center w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 cursor-pointer text-left"
                  onClick={() => setSecondDropdownOpen(!secondDropdownOpen)}
                >
                  <FaCar className="absolute left-3 text-primary text-2xl dark:text-gray-500" />
                  <span className="ml-2 truncate">{selectedPayment}</span>
                  <FaChevronDown className="absolute right-3 text-gray-400 dark:text-gray-500" />
                </button>
                {secondDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                    {["All", "Active", "Approved"].map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setSelectedPayment(item);
                          setSecondDropdownOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Last button */}
              <button className="w-full bg-gray-300 text-gray-500 font-medium px-4 py-3 rounded-md text-sm cursor-pointer">
                Apply Filter
              </button>
            </div>
            {/* Table */}
            <div className="overflow-x-auto scrollbar border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {[
                      "Icon",
                      "Header",
                      "Table",
                      "Status",
                      "Requested By",
                      "Approved on",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                      >
                        <div className="flex items-center justify-center cursor-pointer select-none">
                          <span>{header}</span>
                          <FaArrowUp className="ml-1 text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td colSpan="6" className="px-4 py-10 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="No Records"
                          className="w-20 h-20 sm:w-28 sm:h-28 mb-3"
                        />
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                          No records available
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {showDeletePopup && <DeleteConfirmationModal />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          background: "#0d9488",
          color: "#f8fafc",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
        className="custom-toast-container" // Add this
      />
    </div>
  );
}

export default HotActions;
