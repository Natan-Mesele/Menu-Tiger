import React, { useState } from "react";
import {
  FaRocket,
  FaUtensils,
  FaPlus,
  FaQuestionCircle,
  FaArrowUp,
  FaChevronLeft,
  FaCheck,
  FaChevronRight,
} from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import SearchInput from "../../commons/SearchInput";
import AddNewButton from "../../commons/AddNewButton";
import BackButton from "../../commons/BackButton";
import SaveButton from "../../commons/SaveButton";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../commons/ToastProvider";

const Taxation = () => {
  const [showForm, setShowForm] = useState(false);
  const [taxName, setTaxName] = useState("");
  const [taxType, setTaxType] = useState("percentage");
  const [dineInRate, setDineInRate] = useState(0.0);
  const [takeOutRate, setTakeOutRate] = useState(0.0);
  const [taxCategories, setTaxCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleSave = () => {
    if (!taxName) {
      toast.error("Please enter a tax name", {});
      return;
    }

    const taxData = {
      id: editingId || Date.now(),
      name: taxName,
      type: taxType,
      dineInRate,
      takeOutRate,
    };

    if (editingId) {
      setTaxCategories(
        taxCategories.map((item) => (item.id === editingId ? taxData : item))
      );
      toast.success("Tax category updated successfully!", {});
    } else {
      setTaxCategories([...taxCategories, taxData]);
      toast.success("Tax category saved successfully!", {});
    }

    setTaxName("");
    setTaxType("percentage");
    setDineInRate(0.0);
    setTakeOutRate(0.0);
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeletePopup(true);
  };

  const handleEdit = (id) => {
    const categoryToEdit = taxCategories.find((item) => item.id === id);
    if (categoryToEdit) {
      setTaxName(categoryToEdit.name);
      setTaxType(categoryToEdit.type);
      setDineInRate(categoryToEdit.dineInRate);
      setTakeOutRate(categoryToEdit.takeOutRate);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const filteredCategories = taxCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold dark:text-gray-300">Taxations</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Manage Tax Categories and Taxable Items
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        {!showForm ? (
          <>
            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Left: Button and Info */}
              <div className="flex flex-wrap items-center gap-4">
                <AddNewButton onClick={() => setShowForm(true)} />
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 border border-primary dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 space-x-2">
                  <FaQuestionCircle className="text-primary" />
                  <span>Check local tax rates for accurate menu pricing</span>
                  <span className="flex items-center text-primary cursor-pointer">
                    Read more
                    <img
                      src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                      alt="Edit Icon"
                      className="w-5 h-5 ml-2"
                    />
                  </span>
                </div>
              </div>

              {/* Right: Search */}

              <SearchInput
                placeholder="Search tax categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Table */}
            <div className="overflow-x-auto scrollbar border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <th className="px-6 cursor-pointer space-x-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center group">
                      <span>Tax Category</span>
                      <FaArrowUp className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Dine In Rate
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Take Out Rate
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {category.type === "percentage"
                            ? "Percentage"
                            : "Fixed Amount"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {category.dineInRate}{" "}
                          {category.type === "percentage" ? "%" : "$"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {category.takeOutRate}{" "}
                          {category.type === "percentage" ? "%" : "$"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(category.id)}
                              className="hover:opacity-80"
                            >
                              <img
                                src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                                alt="Edit"
                                className="w-5 h-5"
                              />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="hover:opacity-80"
                            >
                              <img
                                src="https://www.app.menutigr.com/static/media/delete.f9fb3a4cc8c70107a50718ec2199a285.svg"
                                alt="Delete"
                                className="w-5 h-5"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-16">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="No Data"
                          className="mx-auto mb-4 w-20 h-20 opacity-70"
                        />
                        <p className="text-gray-500 dark:text-gray-400">
                          {searchTerm
                            ? "No matching tax categories found"
                            : "No tax categories found"}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Form View */
          <div>
            {/* Header with back button and save */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b border-gray-200 dark:border-gray-600">
              {/* Left Side: Back Button + Texts */}
              <div className="flex items-center mb-4 sm:mb-0">
                {/* Back Button */}
                <BackButton onClick={() => setShowForm(false)} />
                {/* Added Taxation Text */}
                <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none mr-4">
                  <span>Taxation</span> <span className="text-gray-400">/</span>{" "}
                  <span className="text-primary">Add Taxation</span>
                </div>

                {/* Texts */}
                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm border border-primary dark:border-gray-500 rounded-md px-3 py-2">
                  <FaQuestionCircle className="text-primary mr-2" />
                  Check local tax rates for accurate menu pricing
                </div>
              </div>
              {/* Right Side: Save Button */}
              <SaveButton onClick={handleSave} />
            </div>

            {/* Form Fields */}
            <div className="space-y-6 max-w-md">
              {/* Name */}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary">
                <label className="w-28 text-sm font-medium text-gray-700 dark:text-gray-300 px-4 py-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-4 py-2">
                  <input
                    type="text"
                    value={taxName}
                    onChange={(e) => setTaxName(e.target.value)}
                    className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                    placeholder="Enter tax name"
                  />
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary">
                <label className="w-28 text-sm font-medium text-gray-700 dark:text-gray-300 px-4 py-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-4 py-2">
                  <select
                    value={taxType}
                    onChange={(e) => setTaxType(e.target.value)}
                    className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>

              {/* Dine In Rate */}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary">
                <label className="w-28 text-sm font-medium text-gray-700 dark:text-gray-300 px-4 py-2">
                  Dine in <span className="text-red-500">*</span>
                </label>
                <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-4 py-2 relative">
                  <input
                    type="number"
                    value={dineInRate}
                    onChange={(e) => setDineInRate(parseFloat(e.target.value))}
                    className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                    step="0.01"
                    min="0"
                  />
                  <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 rounded">
                    {taxType === "percentage" ? "%" : "$"}
                  </span>
                </div>
              </div>

              {/* Take Out Rate */}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary">
                <label className="w-28 text-sm font-medium text-gray-700 dark:text-gray-300 px-4 py-2">
                  Take out <span className="text-red-500">*</span>
                </label>
                <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-4 py-2 relative">
                  <input
                    type="number"
                    value={takeOutRate}
                    onChange={(e) => setTakeOutRate(parseFloat(e.target.value))}
                    className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                    step="0.01"
                    min="0"
                  />
                  <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 rounded">
                    {taxType === "percentage" ? "%" : "$"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-base font-semibold mb-2 dark:text-white">
              Confirm Deletion
            </h3>
            <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
              Are you sure you want to delete this tax category? This action
              cannot be undone.
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
                  setTaxCategories(
                    taxCategories.filter((item) => item.id !== itemToDelete)
                  );
                  setShowDeletePopup(false);
                }}
                className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastProvider />
    </div>
  );
};

export default Taxation;
