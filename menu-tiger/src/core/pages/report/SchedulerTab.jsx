import React, { useState } from "react";
import {
  FaDownload,
  FaChevronLeft,
  FaEdit,
  FaTrash,
  FaArrowUp,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewButton from "../../commons/AddNewButton";
import SearchInput from "../../commons/SearchInput";
import SaveButton from "../../commons/SaveButton";
import BackButton from "../../commons/BackButton";
import ToastProvider from "../../commons/ToastProvider";

function SchedulerTab() {
  const [addingNew, setAddingNew] = useState(false);
  const [schedulers, setSchedulers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [schedulerToDelete, setSchedulerToDelete] = useState(null);
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const frequencyOptions = ["Weekly", "Monthly", "Daily"];
  const [isSchedulingTypeOpen, setIsSchedulingTypeOpen] = useState(false);
  const schedulingTypeOptions = [
    { value: "", label: "Select Type" },
    { value: "type1", label: "Customers Report" },
    { value: "type2", label: "Sales Report" },
    { value: "type3", label: "Feedback Report" },
  ];
  const [formData, setFormData] = useState({
    name: "",
    frequency: "Weekly",
    schedulingType: "",
    emails: "",
  });

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

  const filteredSchedulers = schedulers.filter(
    (scheduler) =>
      scheduler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheduler.frequency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheduler.emails.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {!addingNew ? (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex gap-4">
              <AddNewButton
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
              />
              <button className="flex items-center border border-primary dark:border-gray-600 text-primary dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <FaDownload className="mr-2 text-primary" />
                Download CSV
              </button>
            </div>
            <SearchInput
              placeholder="Search modifiers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>

          <div className="border border-gray-200 dark:border-gray-600 shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
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
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <BackButton onClick={() => setAddingNew(false)} />
              <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md select-none">
                <span>Scheduler</span> <span className=" text-gray-400">/</span>{" "}
                <span className="text-primary">Add scheduler</span>
              </div>
            </div>
            <SaveButton onClick={handleSave} />
          </div>

          <div className="space-y-6 max-w-sm">
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

            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 transition-colors relative">
              <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                Frequency <span className="text-red-500">*</span>
              </label>
              <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 relative">
                <div
                  className="w-full bg-transparent text-gray-700 dark:text-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => setIsFrequencyOpen(!isFrequencyOpen)}
                >
                  <span>{formData.frequency}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 dark:text-gray-300 transition-transform ${
                      isFrequencyOpen ? "rotate-180" : ""
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

                {isFrequencyOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                    {["Weekly", "Monthly", "Daily"].map((option) => (
                      <div
                        key={option}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          formData.frequency === option
                            ? "bg-fifth dark:bg-gray-700"
                            : ""
                        }`}
                        onClick={() => {
                          setFormData({ ...formData, frequency: option });
                          setIsFrequencyOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 transition-colors relative mt-4">
              <label className="w-36 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2.5">
                Scheduling Type <span className="text-red-500">*</span>
              </label>
              <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2 relative">
                <div
                  className="w-full bg-transparent text-gray-700 dark:text-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => setIsSchedulingTypeOpen(!isSchedulingTypeOpen)}
                >
                  <span>
                    {formData.schedulingType
                      ? schedulingTypeOptions.find(
                          (opt) => opt.value === formData.schedulingType
                        )?.label
                      : "Select Type"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 dark:text-gray-300 transition-transform ${
                      isSchedulingTypeOpen ? "rotate-180" : ""
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

                {isSchedulingTypeOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                    {schedulingTypeOptions
                      .filter((option) => option.value !== "")
                      .map((option) => (
                        <div
                          key={option.value}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            formData.schedulingType === option.value
                              ? "bg-fifth dark:bg-gray-700"
                              : ""
                          } ${
                            option.value === ""
                              ? "text-gray-400 dark:text-gray-500"
                              : ""
                          }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              schedulingType: option.value,
                            });
                            setIsSchedulingTypeOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

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
      {showDeletePopup && <DeleteConfirmationModal />}
      <ToastProvider />
    </div>
  );
}

export default SchedulerTab;
