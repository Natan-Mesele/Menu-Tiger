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

const Taxation = () => {
  const [showForm, setShowForm] = useState(false);
  const [taxName, setTaxName] = useState("");
  const [taxType, setTaxType] = useState("percentage");
  const [dineInRate, setDineInRate] = useState(0.0);
  const [takeOutRate, setTakeOutRate] = useState(0.0);
  const [taxCategories, setTaxCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = () => {
    if (!taxName) return; // Basic validation

    const taxData = {
      id: editingId || Date.now(),
      name: taxName,
      type: taxType,
      dineInRate,
      takeOutRate,
    };

    if (editingId) {
      // Update existing category
      setTaxCategories(
        taxCategories.map((item) => (item.id === editingId ? taxData : item))
      );
    } else {
      // Add new category
      setTaxCategories([...taxCategories, taxData]);
    }

    // Reset form
    setTaxName("");
    setTaxType("percentage");
    setDineInRate(0.0);
    setTakeOutRate(0.0);
    setEditingId(null);
    setShowForm(false);
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tax category?")) {
      setTaxCategories(taxCategories.filter((item) => item.id !== id));
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

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        {!showForm ? (
          <>
            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Left: Button and Info */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="flex items-center bg-secondary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary transition-colors"
                  onClick={() => setShowForm(true)}
                >
                  <FaPlus className="mr-2" />
                  Add New
                </button>
                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm border border-dashed border-gray-400 dark:border-gray-500 rounded-md px-3 py-2">
                  <FaQuestionCircle className="text-primary mr-2" />
                  Check local tax rates for accurate menu pricing
                </div>
              </div>
              {/* Right: Search */}
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search tax categories..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                <button
                  className="flex items-center justify-center text-white dark:text-gray-300 cursor-pointer transition-colors bg-secondary hover:bg-primary w-10 h-10 rounded-sm mr-4 py-3"
                  onClick={() => setShowForm(false)}
                >
                  <FaChevronLeft />
                </button>

                {/* Texts */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 space-x-2">
                  <FaQuestionCircle className="text-primary" />
                  <span>Check local tax rates for accurate menu pricing</span>
                  <span className="flex items-center text-primary cursor-pointer">
                    Read more <FaChevronRight className="ml-1 text-lg" />
                  </span>
                </div>
              </div>
              {/* Right Side: Save Button */}
              <button
                className="bg-secondary cursor-pointer text-white px-3 py-1 sm:py-3 rounded-sm hover:bg-primary transition-colors flex items-center justify-center w-full sm:w-auto"
                onClick={handleSave}
              >
                <FaCheck className="mr-2" />
                Save
              </button>
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
    </div>
  );
};

export default Taxation;
