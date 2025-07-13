import React, { useState } from "react";
import {
  FaRocket,
  FaPlus,
  FaUtensils,
  FaQuestionCircle,
  FaListUl,
  FaTags,
  FaArchive,
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
  FaChevronUp,
  FaSearch,
  FaHistory,
  FaTrash,
  FaEllipsisV,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("Menus");
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
  const [showModifierForm, setShowModifierForm] = useState(false);
  const [modifierName, setModifierName] = useState("");
  const [modifierDescription, setModifierDescription] = useState("");
  const [modifiers, setModifiers] = useState([]);
  const [editingModifierId, setEditingModifierId] = useState(null);
  const [openModifierId, setOpenModifierId] = useState(null);
  const [currentSection, setCurrentSection] = useState("modifiers");
  const [modifierOptions, setModifierOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);
  const [itemToDuplicate, setItemToDuplicate] = useState(null);

  const tabs = [
    { name: "Menus", icon: <FaListUl className="mr-2" /> },
    { name: "Modifiers", icon: <FaTags className="mr-2" /> },
    { name: "Archive", icon: <FaArchive className="mr-2" /> },
  ];

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

  const [archivedMenus, setArchivedMenus] = useState([
    {
      id: 1,
      name: "Sample Item",
      description: "Temporarily removed from menu",
      date: "2025-06-21",
    },
    {
      id: 2,
      name: "Old Breakfast",
      description: "No longer served",
      date: "2025-06-20",
    },
    {
      id: 3,
      name: "Summer Menu",
      description: "Archived for season",
      date: "2025-06-19",
    },
  ]);

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Confirm Deletion
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this {deleteType}? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (deleteType === "menu") {
                performDelete(itemToDelete);
              } else if (deleteType === "modifier") {
                performDeleteModifier(itemToDelete);
              } else if (deleteType === "archive") {
                performArchiveDelete(itemToDelete);
              }
              setShowModal(false);
            }}
            className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const DuplicateConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Duplicate menu?
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you would like to make a duplicate copy of this menu?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowDuplicatePopup(false)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-sm text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDuplicate(itemToDuplicate);
              setShowDuplicatePopup(false);
              toast.success("Menu duplicated successfully");
            }}
            className="px-3 py-1.5 bg-primary text-sm text-white rounded-sm hover:bg-teal-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

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
      alert("Menu items imported successfully!");
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

  const handleEditModifier = (id) => {
    const modifierToEdit = modifiers.find((modifier) => modifier.id === id);
    if (modifierToEdit) {
      setModifierName(modifierToEdit.name);
      setModifierDescription(modifierToEdit.description);
      setShowModifierForm(true);
      setOpenModifierId(null);
      setEditingModifierId(id);
    }
  };

  const handleSaveModifier = () => {
    if (!modifierName) {
      toast.error("Please enter a modifier name");
      return;
    }

    if (editingModifierId) {
      setModifiers(
        modifiers.map((modifier) =>
          modifier.id === editingModifierId
            ? {
                ...modifier,
                name: modifierName,
                description: modifierDescription,
              }
            : modifier
        )
      );
      toast.success("Modifier updated successfully");
    } else {
      const newModifier = {
        id: Date.now(),
        name: modifierName,
        description: modifierDescription,
      };
      setModifiers([...modifiers, newModifier]);
      toast.success("Modifier created successfully");
    }

    setModifierName("");
    setModifierDescription("");
    setShowModifierForm(false);
    setEditingModifierId(null);
  };

  const addModifierOption = () => {
    setModifierOptions([...modifierOptions, { name: "", price: "", unit: "" }]);
  };

  const updateModifierOption = (index, field, value) => {
    const updated = [...modifierOptions];
    updated[index][field] = value;
    setModifierOptions(updated);
  };

  const deleteModifierOption = (index) => {
    if (modifierOptions.length > 1) {
      const updated = [...modifierOptions];
      updated.splice(index, 1);
      setModifierOptions(updated);
    }
  };

  const handleRestore = (id) => {
    const item = archivedMenus.find((m) => m.id === id);
    console.log("Restoring:", item);
    setArchivedMenus(archivedMenus.filter((m) => m.id !== id));
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setDeleteType("menu");
    setShowModal(true);
  };

  const handleDeleteModifier = (id) => {
    setItemToDelete(id);
    setDeleteType("modifier");
    setShowModal(true);
  };

  const handleArchiveDelete = (id) => {
    setItemToDelete(id);
    setDeleteType("archive");
    setShowModal(true);
  };

  const performDelete = (id) => {
    setMenus(menus.filter((menu) => menu.id !== id));
  };

  const performDeleteModifier = (id) => {
    setModifiers(modifiers.filter((modifier) => modifier.id !== id));
  };

  const performArchiveDelete = (id) => {
    setArchivedMenus(archivedMenus.filter((item) => item.id !== id));
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
          <div
            onClick={() => {
              setIsStartingFromScratch(false);
              setIsChoosingSetupMethod(true);
            }}
            className="flex items-center bg-secondary text-white px-4 py-4 rounded mr-2 cursor-pointer hover:bg-primary transition-colors"
          >
            <FaChevronLeft />
          </div>
          <div className="flex items-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100 px-3 py-3 rounded-md">
            <span>Menus</span>
            <span className="mx-1">/</span>
            <span className="text-primary">Add new menu</span>
          </div>
        </div>

        <button
          onClick={handleSaveMenu}
          disabled={!menuName}
          className={`px-4 py-3 text-md rounded-md text-white ${
            !menuName
              ? "bg-secondary cursor-not-allowed"
              : "bg-secondary hover:bg-primary"
          }`}
        >
          Save
        </button>
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
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Menu</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Craft Your Digital Menu
          </span>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer border border-gray-300 dark:border-gray-600 rounded-md p-2">
          <img
            src="https://www.app.menutigr.com/static/media/copy.f4a907cfacfdd8f91d823668cd6856bb.svg"
            alt="Copy Icon"
            className="w-6 h-6"
          />
          <img
            src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
            alt="QR Icon"
            className="w-6 h-6"
          />
          <button
            className="bg-primary text-white px-5 py-2 rounded-md flex items-center hover:bg-teal-700 transition-colors duration-200"
            onClick={() => alert("Open App clicked!")}
          >
            <FaUtensils className="mr-2" />
            Open App
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tabs Section */}
        <div className="flex space-x-6 border-b border-gray-300 dark:border-gray-700 px-6 pt-6 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`pb-2 px-4 font-semibold flex items-center cursor-pointer ${
                activeTab === tab.name
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => {
                setActiveTab(tab.name);
                setShowAddOptions(false);
                setShowMainContent(true);
              }}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "Menus" && (
            <>
              {showMainContent && (
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
                    <button
                      onClick={handleAddNewClick}
                      className="flex items-center bg-secondary text-white px-4 py-3 rounded-md text-sm hover:bg-primary cursor-pointer transition-colors duration-200"
                    >
                      <FaPlus className="mr-2" />
                      Add New
                    </button>

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
                                setOpenMenuId(
                                  openMenuId === menu.id ? null : menu.id
                                )
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
                    <div className="flex items-center mb-4 p-2 w-fit">
                      <button
                        onClick={handleBackClick}
                        className="flex items-center justify-center bg-secondary dark:bg-gray-700 w-11 h-11 cursor-pointer rounded-md hover:bg-primary dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <FaChevronLeft className="text-gray-100 dark:text-gray-300" />
                      </button>
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
                        <h3 className="text-lg font-semibold mb-2">
                          Import Menu
                        </h3>
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
                          Start with an empty menu and build your items
                          manually.
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
                          <button
                            onClick={handleBackClick}
                            className="flex items-center bg-secondary w-11 h-11 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-primary cursor-pointer dark:hover:bg-gray-500 transition-colors duration-200"
                          >
                            <FaChevronLeft className="text-gray-100 dark:text-gray-300" />
                          </button>
                          <span className="ml-3 text-base bg-gray-50 dark:bg-gray-700 rounded-sm py-3 px-2 text-gray-500 dark:text-gray-200">
                            Import menu from template
                          </span>
                        </div>

                        <button
                          onClick={handleNextClick}
                          disabled={
                            (currentStep === 2 && !selectedFile) || isImporting
                          }
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
            </>
          )}

          {activeTab === "Modifiers" && (
            <div className="text-gray-500 dark:text-gray-300">
              {/* Header Buttons */}
              {!showModifierForm && (
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    className="flex items-center bg-secondary text-white px-4 py-3 rounded-md text-sm hover:bg-primary cursor-pointer transition-colors duration-200"
                    onClick={() => setShowModifierForm(true)}
                  >
                    <FaPlus className="mr-2" />
                    Add New
                  </button>

                  <div className="relative w-full sm:w-auto">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 text-sm" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              {/* Add New Form */}
              {showModifierForm && (
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600 mb-6">
                  <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-300 dark:border-gray-600">
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm rounded">
                      <button
                        onClick={() => setShowModifierForm(false)}
                        className="flex items-center bg-secondary text-white px-4 py-4 rounded mr-2 cursor-pointer hover:bg-primary transition-colors"
                      >
                        <FaChevronLeft className="text-sm" />
                      </button>
                      <div className="flex items-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-3 rounded-md">
                        <span>Modifiers</span>
                        <span className="mx-1">/</span>
                        <span className="text-primary">Add new modifier</span>
                      </div>
                    </div>
                    <button
                      onClick={handleSaveModifier}
                      className="px-4 py-3 text-sm rounded-md cursor-pointer text-white bg-secondary hover:bg-primary"
                    >
                      Save
                    </button>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex gap-8 border-b border-gray-200 dark:border-gray-600 mb-6">
                    <button
                      className={`py-2 font-medium ${
                        currentSection === "modifiers"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => setCurrentSection("modifiers")}
                    >
                      Modifiers
                    </button>
                    <button
                      className={`py-2 font-medium ${
                        currentSection === "localize"
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => setCurrentSection("localize")}
                    >
                      Localize
                    </button>
                  </div>

                  {/* Modifiers Section */}
                  {currentSection === "modifiers" && (
                    <div className="space-y-6 max-w-sm">
                      {/* Modifier Group Name */}
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                        <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2">
                          <input
                            type="text"
                            value={modifierName}
                            onChange={(e) => setModifierName(e.target.value)}
                            className="w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Type: Optional / Required */}
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Type
                        </p>
                        <div className="flex flex-col items-start border border-gray-300 dark:border-gray-600 rounded-sm py-6 px-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="modifierType"
                              value="optional"
                              className="accent-primary"
                              defaultChecked
                            />
                            Optional
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="modifierType"
                              value="required"
                              className="accent-primary"
                            />
                            Required
                          </label>
                        </div>
                      </div>

                      {/* Allow duplicate checkbox */}
                      <div className="flex justify-between items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-300">
                        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <input
                            type="checkbox"
                            id="allow-duplicates"
                            className="accent-primary w-5 h-5"
                          />
                          Allow adding same choice multiple times
                        </label>
                        <FaQuestionCircle className="text-primary text-xl" />
                      </div>

                      {/* Modifiers Input Section */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                          <span>Name</span>
                          <span>Price</span>
                          <span>Unit</span>
                          <span></span>
                        </div>

                        {modifierOptions.map((option, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-4 gap-4 items-center"
                          >
                            <input
                              type="text"
                              className="px-2 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none"
                              value={option.name}
                              onChange={(e) =>
                                updateModifierOption(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type="number"
                              className="px-2 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none"
                              value={option.price}
                              onChange={(e) =>
                                updateModifierOption(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type="text"
                              className="px-2 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none"
                              value={option.unit}
                              onChange={(e) =>
                                updateModifierOption(
                                  index,
                                  "unit",
                                  e.target.value
                                )
                              }
                            />
                            {modifierOptions.length > 1 && (
                              <button
                                onClick={() => deleteModifierOption(index)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add Modifier Option Button */}
                      <button
                        className="mt-3 px-3 py-3 border cursor-pointer border-primary text-primary rounded-sm text-sm hover:bg-primary hover:text-white transition"
                        onClick={addModifierOption}
                      >
                        + Add Modifier Option
                      </button>
                    </div>
                  )}

                  {/* Localize Section */}
                  {currentSection === "localize" && (
                    <div className="space-y-6 max-w-sm">
                      <div className="p-4">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Text localization
                          </span>
                          <FaQuestionCircle className="text-primary dark:text-gray-500" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Table List */}
              {!showModifierForm && (
                <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Group Modifier Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {modifiers.length > 0 ? (
                        modifiers.map((modifier) => (
                          <tr
                            key={modifier.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                              {modifier.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleEditModifier(modifier.id)
                                  }
                                  className="flex items-center px-3 py-1 text-sm rounded-md"
                                >
                                  <img
                                    src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                                    alt="Edit"
                                    className="w-4 h-4 mr-2"
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteModifier(modifier.id)
                                  }
                                  className="flex items-center px-3 py-1 text-sm rounded-md"
                                >
                                  <img
                                    src="https://www.app.menutigr.com/static/media/delete.f9fb3a4cc8c70107a50718ec2199a285.svg"
                                    alt="Delete"
                                    className="w-4 h-4 mr-2"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="px-4 py-4">
                            <div className="flex flex-col items-center justify-center text-center space-y-4 py-10">
                              <img
                                src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                                alt="No Records"
                                className="w-20 h-20"
                              />
                              <p className="text-sm text-gray-600 dark:text-gray-400 pb-4">
                                No records available
                                <br />
                                <span className="text-xs">
                                  Click 'Add New' to create a new record
                                </span>
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "Archive" && (
            <div className="text-gray-500 dark:text-gray-300">
              <div className="items-center gap-2 mb-6">
                <p className="flex items-center gap-2 text-sm border border-primary bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-3 py-3 w-fit">
                  <FaQuestionCircle className="text-gray-400 dark:text-gray-500 text-base" />
                  You can restore or permanently delete the archived menu
                </p>
              </div>

              <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                        Name
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                        Description
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                        Date
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {archivedMenus.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                          {item.name}
                        </td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                          {item.description}
                        </td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                          {item.date}
                        </td>
                        <td className="px-4 py-2 text-center space-x-4">
                          <button
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                            title="Restore"
                            onClick={() => handleRestore(item.id)}
                          >
                            <FaHistory className="text-primary" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                            title="Delete"
                            onClick={() => handleArchiveDelete(item.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {archivedMenus.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-sm text-gray-500 dark:text-gray-400 py-6"
                        >
                          No archived items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end items-center px-4 py-3 text-sm mt-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <span className="mr-4 text-gray-600 dark:text-gray-400">
                  Rows per page: 10
                </span>
                <span className="mr-4 text-gray-600 dark:text-gray-400">
                  1–{archivedMenus.length} of {archivedMenus.length}
                </span>
                <button className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  <FaChevronLeft />
                </button>
                <button className="ml-2 text-gray-600 dark:text-gray-400 hover:text-primary">
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && <DeleteConfirmationModal />}
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
      {showDuplicatePopup && <DuplicateConfirmationModal />}
    </div>
  );
};

export default Menu;
