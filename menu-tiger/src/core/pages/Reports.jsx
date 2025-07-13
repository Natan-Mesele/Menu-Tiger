import React, { useState } from "react";
import {
  FaRocket,
  FaUtensils,
  FaCalendarAlt,
  FaEnvelope,
  FaCommentAlt,
  FaPlus,
  FaDownload,
  FaSearch,
  FaChevronLeft,
  FaArrowUp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reports() {
  const [activeTab, setActiveTab] = useState("scheduler");
  const [addingNew, setAddingNew] = useState(false);
  const [schedulers, setSchedulers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [schedulerToDelete, setSchedulerToDelete] = useState(null);

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Confirm Deletion
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this scheduler? This action cannot be
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
              setSchedulers(
                schedulers.filter(
                  (scheduler) => scheduler.id !== schedulerToDelete
                )
              );
              setShowDeletePopup(false);
              toast.success("Scheduler deleted successfully");
            }}
            className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    frequency: "Weekly",
    schedulingType: "",
    emails: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.schedulingType || !formData.emails) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (editingId) {
      // Update existing scheduler
      setSchedulers(
        schedulers.map((scheduler) =>
          scheduler.id === editingId
            ? { ...formData, id: editingId }
            : scheduler
        )
      );
      toast.success("Scheduler updated successfully");
      setEditingId(null);
    } else {
      // Add new scheduler
      const newScheduler = {
        id: Date.now(),
        ...formData,
      };
      setSchedulers([...schedulers, newScheduler]);
      toast.success("Scheduler created successfully");
    }

    setAddingNew(false);
    setFormData({
      name: "",
      frequency: "Weekly",
      schedulingType: "",
      emails: "",
    });
  };

  const handleDelete = (id) => {
    setSchedulers(schedulers.filter((scheduler) => scheduler.id !== id));
  };

  const filteredSchedulers = schedulers.filter(
    (scheduler) =>
      scheduler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheduler.frequency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheduler.emails.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    const schedulerToEdit = schedulers.find((scheduler) => scheduler.id === id);
    if (schedulerToEdit) {
      setFormData({
        name: schedulerToEdit.name,
        frequency: schedulerToEdit.frequency,
        schedulingType: schedulerToEdit.schedulingType,
        emails: schedulerToEdit.emails,
      });
      setEditingId(id);
      setAddingNew(true);
    }
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Scheduler</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Organize Task
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

      {/* Tabs */}
      <div className="bg-gray-100 dark:bg-gray-800 px-6 pt-2 flex space-x-6 border-b border-gray-300 dark:border-gray-700 shadow-md rounded-t-lg">
        {[
          {
            key: "scheduler",
            label: "Scheduler",
            icon: <FaCalendarAlt className="mr-2" />,
          },
          {
            key: "newsletters",
            label: "Newsletters Signup",
            icon: <FaEnvelope className="mr-2" />,
          },
          {
            key: "feedback",
            label: "Feedback",
            icon: <FaCommentAlt className="mr-2" />,
          },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`pb-3 pt-2 text-sm font-semibold flex items-center cursor-pointer ${
              activeTab === key
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="dark:bg-gray-800 p-6 rounded-b-lg shadow-lg bg-white">
        {activeTab === "scheduler" && (
          <div className="space-y-6">
            {!addingNew ? (
              <>
                {/* Top Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex gap-4">
                    <button
                      className="flex items-center bg-secondary text-white px-4 py-2 rounded-md hover:bg-teal-700 transition cursor-pointer"
                      onClick={() => {
                        setFormData({
                          name: "",
                          frequency: "Weekly",
                          schedulingType: "",
                          emails: "",
                        });
                        setEditingId(null);
                        setAddingNew(true);
                      }}
                    >
                      <FaPlus className="mr-2" />
                      Add New
                    </button>
                    <button className="flex items-center border border-primary dark:border-gray-600 text-primary dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <FaDownload className="mr-2 text-primary" />
                      Download CSV
                    </button>
                  </div>
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
                  </div>
                </div>

                {/* Report Table */}
                <div className="border border-gray-200 dark:border-gray-600 shadow-sm rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    {/* Table Header */}
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        {["Name", "Frequency", "Report To", "Actions"].map(
                          (label) => (
                            <th
                              key={label}
                              scope="col"
                              className="px-4 py-3 cursor-pointer text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
                            >
                              <div className="flex items-center space-x-2 group">
                                <span>{label}</span>
                                {label !== "Actions" && (
                                  <FaArrowUp className="text-gray-400 dark:text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                              </div>
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                      {filteredSchedulers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-12">
                            <div className="flex flex-col items-center justify-center space-y-4">
                              <img
                                src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                                alt="Empty State"
                                className="w-32 h-32"
                              />
                              <p className="text-gray-500 dark:text-gray-400">
                                {schedulers.length === 0
                                  ? "No reports available"
                                  : "No matching reports found"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredSchedulers.map((scheduler) => (
                          <tr
                            key={scheduler.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                              {scheduler.name}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {scheduler.frequency}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {scheduler.emails}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex space-x-2">
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => handleEdit(scheduler.id)}
                                >
                                  <FaEdit className="text-primary" />
                                </button>
                                <button
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    setSchedulerToDelete(scheduler.id);
                                    setShowDeletePopup(true);
                                  }}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              // Add New form with back arrow button and save button + new header text
              <div>
                {/* Top bar with back arrow, text, and save */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <button
                      className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer flex items-center justify-center w-10 h-10"
                      onClick={() => setAddingNew(false)}
                      aria-label="Back"
                      title="Back"
                    >
                      <FaChevronLeft />
                    </button>
                    <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md select-none">
                      <span>Scheduler</span>{" "}
                      <span className=" text-gray-400">/</span>{" "}
                      <span className="text-primary">Add scheduler</span>
                    </div>
                  </div>
                  <button
                    className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary transition cursor-pointer"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-6 max-w-sm">
                  {/* Name Field */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
                    <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 focus-within:border-primary transition-colors">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                  </div>

                  {/* Frequency Field */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
                    <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                      Frequency <span className="text-red-500">*</span>
                    </label>
                    <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 focus-within:border-primary transition-colors">
                      <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                        required
                      >
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Daily</option>
                      </select>
                    </div>
                  </div>

                  {/* Scheduling Type Field as Dropdown */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
                    <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                      Scheduling Type <span className="text-red-500">*</span>
                    </label>
                    <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 focus-within:border-primary transition-colors">
                      <select
                        name="schedulingType"
                        value={formData.schedulingType}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                        <option value="type3">Type 3</option>
                      </select>
                    </div>
                  </div>

                  {/* Emails Field */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
                    <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                      Emails <span className="text-red-500">*</span>
                    </label>
                    <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 focus-within:border-primary transition-colors">
                      <input
                        type="email"
                        name="emails"
                        value={formData.emails}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                        placeholder="Enter emails (comma separated)"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "newsletters" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button className="flex items-center border border-primary dark:border-gray-600 text-primary dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <FaDownload className="mr-2 text-primary" />
                Download CSV
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="overflow-x-auto scrollbar border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                    {[
                      "Email",
                      "First Name",
                      "Last Name",
                      "Contact Number",
                      "Date",
                      "Image",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 font-semibold group hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          {header}
                          <FaArrowUp className="text-xs opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="No records"
                          className="w-24 h-24 mb-4"
                        />
                        <p className="text-gray-500 dark:text-gray-400">
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
        {activeTab === "feedback" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button className="flex items-center border border-primary dark:border-gray-600 text-primary dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <FaDownload className="mr-2 text-primary" />
                Download CSV
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                    {["Survey name", "Date"].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 font-semibold group hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          {header}
                          <FaArrowUp className="text-xs opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="No feedback available"
                          className="w-24 h-24 mb-4 opacity-75"
                        />
                        <p className="text-gray-500 dark:text-gray-400">
                          No feedback surveys available
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

export default Reports;
