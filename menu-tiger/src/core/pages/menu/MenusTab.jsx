import React, { useState } from "react";
import {
  FaPlus,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaDownload,
  FaUpload,
  FaCheck,
  FaFileExcel,
  FaTimes,
  FaCircle,
  FaBookOpen,
  FaCloudDownloadAlt,
  FaEllipsisV,
} from "react-icons/fa";
import { toast } from "react-toastify";
import AddNewButton from "../../commons/AddNewButton";
import BackButton from "../../commons/BackButton";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import DuplicateConfirmationModal from "./components/DuplicateConfirmationModal";
import SaveButton from "../../commons/SaveButton";

const MenusTab = () => {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [isChoosingSetupMethod, setIsChoosingSetupMethod] = useState(true);
  const [isStartingFromScratch, setIsStartingFromScratch] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menus, setMenus] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);
  const [itemToDuplicate, setItemToDuplicate] = useState(null);

  const sampleMenuItems = [
    {
      name: "Margherita Pizza",
      description: "Classic pizza with tomato and mozzarella",
      price: "$12.99",
    },
    {
      name: "Caesar Salad",
      description: "Fresh romaine with Caesar dressing",
      price: "$8.99",
    },
    {
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter",
      price: "$4.99",
    },
  ];

  const steps = [
    { id: 1, name: "Download Template", icon: <FaDownload /> },
    { id: 2, name: "Upload File", icon: <FaUpload /> },
    { id: 3, name: "Review Data", icon: <FaCheck /> },
    { id: 4, name: "Finish", icon: <FaCheck /> },
  ];

  const handleAddNewClick = () => {
    setShowAddOptions(true);
    setShowMainContent(false);
    setCurrentStep(1);
    setIsChoosingSetupMethod(true);
    resetImportState();
  };

  const resetImportState = () => {
    setSelectedFile(null);
    setFileName("");
    setValidationErrors([]);
    setIsImporting(false);
  };

  const handleBackClick = () => {
    if (isStartingFromScratch) {
      setIsStartingFromScratch(false);
      setIsChoosingSetupMethod(true);
    } else if (!isChoosingSetupMethod && currentStep === 1) {
      setIsChoosingSetupMethod(true);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowAddOptions(false);
      setShowMainContent(true);
    }
  };

  const handleNextClick = () => {
    if (currentStep === 2 && !selectedFile) {
      setValidationErrors(["Please select a file to upload"]);
      return;
    }

    if (currentStep === 4) {
      completeImport();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/sample-menu-template.xlsx";
    link.download = "menu-template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);

      if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        setValidationErrors([
          "File must be an Excel spreadsheet (.xlsx, .xls) or CSV",
        ]);
      } else {
        setValidationErrors([]);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileName("");
    setValidationErrors([]);
  };

  const completeImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setShowAddOptions(false);
      setShowMainContent(true);
      resetImportState();
      toast.success("Menu items imported successfully!");
    }, 1500);
  };

  const handleEdit = (id) => {
    const menuToEdit = menus.find((menu) => menu.id === id);
    if (menuToEdit) {
      setMenuName(menuToEdit.name);
      setMenuDescription(menuToEdit.description);
      setIsStartingFromScratch(true);
      setShowAddOptions(true);
      setShowMainContent(false);
      setOpenMenuId(null);
      setEditingMenuId(id);
    }
  };

  const handleDuplicate = (id) => {
    const menuToDuplicate = menus.find((menu) => menu.id === id);
    if (menuToDuplicate) {
      const newMenu = {
        id: Date.now(),
        name: menuToDuplicate.name,
        description: menuToDuplicate.description,
        items: [...menuToDuplicate.items],
      };
      setMenus([...menus, newMenu]);
      setOpenMenuId(null);
    }
  };

  const handleSaveMenu = () => {
    if (!menuName) {
      toast.error("Please enter a menu name");
      return;
    }

    if (editingMenuId) {
      setMenus(
        menus.map((menu) =>
          menu.id === editingMenuId
            ? { ...menu, name: menuName, description: menuDescription }
            : menu
        )
      );
      toast.success("Menu updated successfully");
    } else {
      const newMenu = {
        id: Date.now(),
        name: menuName,
        description: menuDescription,
        items: [],
      };
      setMenus([...menus, newMenu]);
      toast.success("Menu created successfully");
    }

    setMenuName("");
    setMenuDescription("");
    setIsStartingFromScratch(false);
    setShowAddOptions(false);
    setShowMainContent(true);
    setEditingMenuId(null);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const performDelete = (id) => {
    setMenus(menus.filter((menu) => menu.id !== id));
    toast.success("Menu deleted successfully");
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 w-full">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step Number + Label */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                currentStep >= step.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
              }`}
            >
              {step.id}
            </div>
            <span
              className={`text-sm ${
                currentStep >= step.id
                  ? "text-gray-700 dark:text-gray-300 font-medium"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.name}
            </span>
          </div>

          {/* Line between steps (not after the last one) */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-500 mx-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white dark:bg-gray-700 p-6 flex flex-col items-center text-center">
            <img
              src="https://www.app.menutigr.com/static/media/download-excel-template.e84b2c7c633ab9b44042.png"
              alt="Excel Template Preview"
              className="w-full max-w-[160px] mb-4"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Please download the sample sheet below and fill it with your
              items.
              <br />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                You may skip if you already have the sample sheet.
              </span>
            </p>
            <button
              onClick={downloadTemplate}
              className="mt-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              <FaCloudDownloadAlt className="text-secondary text-lg" />
              Download Template
            </button>
          </div>
        );

      case 2:
        return (
          <div className="bg-white dark:bg-gray-700 p-6">
            <div className="space-y-4">
              {validationErrors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  {validationErrors.map((error, index) => (
                    <div
                      key={index}
                      className="flex items-center text-red-600 dark:text-red-300"
                    >
                      <FaTimes className="mr-2" />
                      {error}
                    </div>
                  ))}
                </div>
              )}
              <div
                className={`border-2 border-dashed ${
                  selectedFile
                    ? "border-green-200 dark:border-green-800"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg p-8 text-center transition-colors duration-200`}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <FaFileExcel className="text-3xl text-green-600 mb-3" />
                    <p className="font-medium mb-1">{fileName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Ready to import
                    </p>
                    <button
                      onClick={removeFile}
                      className="text-red-600 dark:text-red-400 text-sm hover:underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <>
                    <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
                    <p className="mb-4">Drag and drop your Excel file here</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      The file must include:{" "}
                      <span className="font-semibold">Name</span>,{" "}
                      <span className="font-semibold">Description</span>, and{" "}
                      <span className="font-semibold">Price</span> columns
                    </p>
                    <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md inline-flex items-center hover:bg-teal-700 transition-colors duration-200">
                      <FaUpload className="mr-2" />
                      Select File
                      <input
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600">
            <div className="flex items-center mb-4">
              <FaCheck className="text-green-600 text-2xl mr-3" />
              <h3 className="text-lg font-semibold">Review Import</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <FaCheck className="mr-2" />
                  File successfully validated - {sampleMenuItems.length} items
                  found
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleMenuItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              {isImporting ? (
                <div className="animate-spin">
                  <FaCircle className="text-green-600 dark:text-green-300 text-xl" />
                </div>
              ) : (
                <FaCheck className="text-green-600 dark:text-green-300 text-2xl" />
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isImporting ? "Importing..." : "Import Complete!"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {isImporting
                ? "Please wait while we import your menu items"
                : "Your menu items have been successfully imported."}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderScratchForm = () => (
    <div className="bg-white dark:bg-gray-700">
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm rounded">
          <BackButton
            onClick={() => {
              setIsStartingFromScratch(false);
              setIsChoosingSetupMethod(true);
            }}
            className="mr-2" // Optional additional className
          />
          <div className="flex items-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100 px-3 py-3 rounded-md">
            <span>Menus</span>
            <span className="mx-1">/</span>
            <span className="text-primary">Add new menu</span>
          </div>
        </div>

        <SaveButton
          onClick={handleSaveMenu}
          disabled={!menuName}
          label="Create Menu"
        />
      </div>

      <div className="space-y-6 max-w-sm">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
          <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2">
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus-within:border-primary transition-colors">
          <label className="w-28 pt-2 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
            Description
          </label>
          <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2">
            <textarea
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none resize-none"
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showMainContent && (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
            <AddNewButton
              onClick={handleAddNewClick}
              className="text-sm py-3"
            />
            <div className="flex items-center border border-primary px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 text-sm">
              <FaQuestionCircle className="mr-2 text-primary text-sm" />
              Go to Store setting to connect your favorite menu
            </div>
          </div>

          {menus.length > 0 ? (
            <div className="space-y-4">
              {menus.map((menu) => (
                <div
                  key={menu.id}
                  className="relative border border-gray-200 dark:border-gray-600 rounded-md p-4 w-64 h-52 flex flex-col justify-between bg-[#EEF2F6] dark:bg-gray-700"
                >
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === menu.id ? null : menu.id)
                      }
                      className="text-gray-600 hover:text-black dark:text-gray-300"
                    >
                      <FaEllipsisV />
                    </button>

                    {openMenuId === menu.id && (
                      <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleEdit(menu.id)}
                          className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <img
                            src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                            alt="Edit"
                            className="w-4 h-4 mr-2"
                          />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(menu.id)}
                          className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <img
                            src="https://www.app.menutigr.com/static/media/delete.f9fb3a4cc8c70107a50718ec2199a285.svg"
                            alt="Delete"
                            className="w-4 h-4 mr-2"
                          />
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setItemToDuplicate(menu.id);
                            setShowDuplicatePopup(true);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Duplicate
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-lg dark:text-white">
                      {menu.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {menu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#F8FAFC] dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-4 sm:p-6 h-52 flex items-center justify-center w-64">
              <button
                className="bg-secondary text-white p-6 cursor-pointer rounded-md flex items-center justify-center hover:bg-primary transition-colors duration-200"
                onClick={handleAddNewClick}
              >
                <FaPlus className="text-lg" />
              </button>
            </div>
          )}
        </div>
      )}

      {showAddOptions && (
        <div>
          {currentStep === 1 && isChoosingSetupMethod && (
            <div className="flex items-center mb-4 px-2 w-fit">
              <BackButton onClick={handleBackClick} />
              <span className="ml-3 flex items-center text-sm text-gray-700 dark:text-gray-300 border border-primary py-3 px-2 rounded-md">
                <FaQuestionCircle className="mr-2 text-gray-600 dark:text-gray-400" />
                Learn how to setup your digital menu
              </span>
            </div>
          )}

          {isChoosingSetupMethod ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600 hover:border-primary cursor-pointer transition-colors duration-200">
                <div className="flex justify-left mb-4">
                  <FaBookOpen className="text-xl mt-1 flex-shrink-0" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Import Menu</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Download the sample sheet and fill it with your items.
                </p>
                <button
                  className="flex items-center justify-between cursor-pointer w-full bg-secondary text-white px-4 py-3 rounded-sm text-sm hover:bg-teal-700 transition-colors duration-200"
                  onClick={() => {
                    setIsChoosingSetupMethod(false);
                    setCurrentStep(1);
                  }}
                >
                  <span>Setup Menu</span>
                  <FaArrowLeft className="transform rotate-180" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600 hover:border-primary cursor-pointer transition-colors duration-200">
                <div className="flex justify-left mb-4">
                  <FaBookOpen className="text-xl mt-1 flex-shrink-0" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Start from Scratch
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Start with an empty menu and build your items manually.
                </p>
                <button
                  className="flex items-center justify-between cursor-pointer w-full bg-secondary text-white px-4 py-3 rounded-sm text-sm hover:bg-teal-700 transition-colors duration-200"
                  onClick={() => {
                    setIsChoosingSetupMethod(false);
                    setIsStartingFromScratch(true);
                  }}
                >
                  <span>Setup Menu</span>
                  <FaArrowLeft className="transform rotate-180" />
                </button>
              </div>
            </div>
          ) : isStartingFromScratch ? (
            renderScratchForm()
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-600 pb-4">
                <div className="flex items-center">
                  <BackButton onClick={handleBackClick} />
                  <span className="ml-3 text-base bg-gray-50 dark:bg-gray-700 rounded-sm py-3 px-2 text-gray-500 dark:text-gray-200">
                    Import menu from template
                  </span>
                </div>

                <button
                  onClick={handleNextClick}
                  disabled={(currentStep === 2 && !selectedFile) || isImporting}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                    (currentStep === 2 && !selectedFile) || isImporting
                      ? "bg-secondary dark:bg-gray-500 text-gray-100 dark:text-gray-300 cursor-not-allowed"
                      : "bg-secondary text-white hover:bg-teal-700"
                  }`}
                >
                  {currentStep === 3 ? "Finish Import" : "Next"}
                </button>
              </div>

              {renderStepIndicator()}
              {renderStepContent()}
            </div>
          )}
        </div>
      )}

      {showMainContent && (
        <div className="flex justify-end items-center mt-6">
          <span className="mr-4 text-gray-600 dark:text-gray-400">
            Rows per page: 10
          </span>
          <span className="mr-4 text-gray-600 dark:text-gray-400">
            1–1 of 1
          </span>
          <button className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
            <FaChevronLeft />
          </button>
          <button className="ml-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
            <FaChevronRight />
          </button>
        </div>
      )}

      {showModal && (
        <DeleteConfirmationModal
          show={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            performDelete(itemToDelete);
            setShowModal(false);
          }}
          itemName={menus.find((menu) => menu.id === itemToDelete)?.name || ""}
          itemType="menu"
        />
      )}

      {showDuplicatePopup && (
        <DuplicateConfirmationModal
          onCancel={() => setShowDuplicatePopup(false)}
          onConfirm={() => {
            handleDuplicate(itemToDuplicate);
            setShowDuplicatePopup(false);
            toast.success("Menu duplicated successfully");
          }}
        />
      )}
    </>
  );
};

export default MenusTab;
