import React, { useState, useRef } from "react";
import {
  FaPlus,
  FaLock,
  FaQuestionCircle,
  FaChevronLeft,
  FaLanguage,
} from "react-icons/fa";
import SearchInput from "../../commons/SearchInput";
import SaveButton from "../../commons/SaveButton";
import BackButton from "../../commons/BackButton";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../commons/ToastProvider";

function CreateHotActions() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionToDelete, setActionToDelete] = useState(null);
  const [callActions, setCallActions] = useState([
    {
      id: 1,
      header: "Call for notes change",
      image:
        "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-for-notes-change.svg",
      message: "Call someone to change the notes",
      isAvailable: true,
    },
    {
      id: 2,
      header: "Call to clean table",
      image:
        "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-to-clean-table.svg",
      message: "Call someone to clean the table",
      isAvailable: true,
    },
    {
      id: 3,
      header: "Call someone",
      image:
        "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-someone.svg",
      message: "Call someone to the table",
      isAvailable: true,
    },
    {
      id: 4,
      header: "Call to verify bill",
      image:
        "https://menutigr-resources.s3.us-west-2.amazonaws.com/feature-icons/SVG/call-to-verify-bill.svg",
      message: "Call someone to the table to verify the bill",
      isAvailable: true,
    },
  ]);

  const [editingAction, setEditingAction] = useState(null);
  const [editSection, setEditSection] = useState("hot-actions");
  const [showWifiPopup, setShowWifiPopup] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const addNewRef = useRef(null);
  const containerRef = useRef(null);

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

  const handleUpdate = (id) => {
    const actionToEdit = callActions.find((action) => action.id === id);
    if (actionToEdit) {
      setEditingAction({ ...actionToEdit });
      setEditSection("hot-actions");
    }
  };

  const handleDeleteClick = (id) => {
    const action = callActions.find((a) => a.id === id);
    setActionToDelete(action);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setCallActions((prev) =>
      prev.filter((action) => action.id !== actionToDelete.id)
    );
    setShowDeleteModal(false);
    toast.success("Action deleted successfully!");
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setActionToDelete(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAction((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (imageUrl) => {
    setEditingAction((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSaveEdit = () => {
    try {
      setCallActions((prev) =>
        prev.map((action) =>
          action.id === editingAction.id ? editingAction : action
        )
      );
      setEditingAction(null);

      toast.success("Changes saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to save changes");
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAction(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this action?"
    );
    if (confirmDelete) {
      setCallActions((prev) => prev.filter((action) => action.id !== id));
    }
  };

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Confirm Deletion
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete{" "}
          {actionToDelete ? `"${actionToDelete.header}"` : "this"} action? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancelDelete}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {editingAction ? (
        <div>
          {/* Edit form top bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <BackButton onClick={handleCancelEdit} />
              <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 px-4 py-3 rounded-md select-none">
                <span>Hot Actions</span>{" "}
                <span className="text-gray-400">/</span>{" "}
                <span className="text-primary">Edit Hot Action</span>
              </div>
            </div>
            <SaveButton onClick={handleSaveEdit} />
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
      ) : (
        <div className="space-y-6">
          {/* Top Controls */}
          <div className="flex lg:flex-row lg:items-center lg:justify-between gap-4 max-[639px]:flex-row max-[639px]:flex-wrap max-[639px]:gap-2 max-[639px]:overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 max-[639px]:flex-row max-[639px]:flex-wrap max-[639px]:gap-2 flex-grow w-full">
              {/* "Add New" Button - unchanged */}
              <div
                ref={containerRef}
                className="relative inline-block flex-shrink-0"
              >
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
                  className="flex items-center bg-gray-300 text-gray-600 px-4 py-3 max-[639px]:px-3 max-[639px]:py-2 rounded-md text-sm max-[639px]:text-xs whitespace-nowrap"
                >
                  <FaPlus className="mr-2 max-[639px]:text-xs" /> Add New{" "}
                  <FaLock className="ml-2 text-sm max-[639px]:text-xs" />
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
                      left: `max(10px, min(85vw - 500px, ${
                        addNewRef.current?.getBoundingClientRect().left +
                        window.scrollX
                      }px))`,
                      width: "min(500px, 85vw)",
                      maxWidth: "95vw",
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
                    <div className="text-sm max-[639px]:text-xs text-gray-700 dark:text-gray-300 text-left">
                      <div className="flex items-start justify-start mb-4">
                        <h3 className="text-lg max-[639px]:text-base font-semibold text-gray-800 dark:text-white">
                          Access Denied
                        </h3>
                      </div>

                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        You do not have permission to use this feature due to
                        limitations in your current plan. Please upgrade or
                        adjust your plan to gain access.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button className="w-full border border-primary text-primary dark:border dark:hover:border-secondary px-5 py-2 rounded-sm hover:bg-primary-dark text-base max-[639px]:text-xs shadow-md whitespace-nowrap">
                          Compare Plans
                        </button>
                        <button
                          onClick={() => setShowWifiPopup(false)}
                          className="w-full bg-secondary text-white shadow-md dark:text-white px-5 py-2 rounded-sm hover:bg-primary text-base max-[639px]:text-xs whitespace-nowrap"
                        >
                          Upgrade Your Plan
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info box - made responsive */}
              <div className="flex items-center gap-2 px-4 py-3 max-[639px]:px-3 max-[639px]:py-2 w-full sm:max-w-xl border border-gray-300 dark:border-gray-600 rounded-md text-sm max-[639px]:text-xs text-gray-700 dark:text-gray-300">
                <FaQuestionCircle className="text-primary flex-shrink-0 max-[639px]:text-xs" />
                <span className="truncate sm:whitespace-normal max-[639px]:whitespace-normal">
                  Create hot actions your customers can request when ordering
                </span>
                <a
                  href="#!"
                  className="ml-2 text-primary hover:underline whitespace-nowrap flex-shrink-0"
                >
                  Read more
                </a>
              </div>
            </div>

            {/* Search - unchanged */}
            <div className="relative w-full sm:w-48">
              <SearchInput
                placeholder="Search modifiers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
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
                    <label className="relative w-12 h-4 overflow-visible cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={action.isAvailable}
                        onChange={() =>
                          setCallActions((prev) =>
                            prev.map((a) =>
                              a.id === action.id
                                ? { ...a, isAvailable: !a.isAvailable }
                                : a
                            )
                          )
                        }
                      />
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                          action.isAvailable
                            ? "bg-primary/20"
                            : "bg-gray-400 dark:bg-gray-700"
                        }`}
                      ></div>
                      <div
                        className={`absolute -top-[5px] ${
                          action.isAvailable
                            ? "left-[26px] bg-primary border-primary/50"
                            : "left-0 bg-white border-gray-100 shadow-lg"
                        } w-7 h-7 rounded-full border transform transition-all duration-200 hover:bg-gray-50`}
                      ></div>
                    </label>

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
                      onClick={() => handleDeleteClick(action.id)}
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
      <ToastProvider />
      {showDeleteModal && <DeleteConfirmationModal />}
    </div>
  );
}

export default CreateHotActions;
