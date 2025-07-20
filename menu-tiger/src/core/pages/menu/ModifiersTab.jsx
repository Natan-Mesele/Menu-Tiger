import { useState } from "react";
import { FaChevronLeft, FaQuestionCircle, FaTrash } from "react-icons/fa";
import AddNewButton from "../../commons/AddNewButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import BackButton from "../../commons/BackButton";
import SaveButton from "../../commons/SaveButton";

const ModifiersTab = () => {
  // State management
  const [showModifierForm, setShowModifierForm] = useState(false);
  const [currentSection, setCurrentSection] = useState("modifiers");
  const [modifierName, setModifierName] = useState("");
  const [editingModifierId, setEditingModifierId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modifierToDelete, setModifierToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modifierOptions, setModifierOptions] = useState([
    { name: "", price: 0, unit: "gram" },
  ]);
  const [errors, setErrors] = useState({
    modifierName: false,
    modifierOptions: [false],
  });
  const [modifiers, setModifiers] = useState([]);

  // Modifier option handlers
  const addModifierOption = () => {
    setModifierOptions([
      ...modifierOptions,
      { name: "", price: 0, unit: "gram" },
    ]);
    setErrors({
      ...errors,
      modifierOptions: [...errors.modifierOptions, false],
    });
  };

  const updateModifierOption = (index, field, value) => {
    const updatedOptions = [...modifierOptions];
    updatedOptions[index][field] = value;
    setModifierOptions(updatedOptions);

    if (field === "name") {
      const updatedErrors = [...errors.modifierOptions];
      updatedErrors[index] = !value.trim();
      setErrors({
        ...errors,
        modifierOptions: updatedErrors,
      });
    }
  };

  const deleteModifierOption = (index) => {
    const updatedOptions = [...modifierOptions];
    updatedOptions.splice(index, 1);
    setModifierOptions(updatedOptions);

    const updatedErrors = [...errors.modifierOptions];
    updatedErrors.splice(index, 1);
    setErrors({
      ...errors,
      modifierOptions: updatedErrors,
    });
  };

  const handleSaveModifier = () => {
    const nameError = !modifierName.trim();
    const optionErrors = modifierOptions.map((option) => !option.name.trim());

    if (nameError || optionErrors.some((error) => error)) {
      setErrors({
        modifierName: nameError,
        modifierOptions: optionErrors,
      });
      toast.error("Please fill all required fields");
      return;
    }

    const newModifier = {
      id: editingModifierId || Date.now(),
      name: modifierName,
      options: modifierOptions,
    };

    if (editingModifierId) {
      // Update existing modifier
      const updatedModifiers = modifiers.map((mod) =>
        mod.id === editingModifierId ? newModifier : mod
      );
      setModifiers(updatedModifiers);
      toast.success("Modifier updated successfully");
    } else {
      // Add new modifier
      setModifiers([...modifiers, newModifier]);
      toast.success("Modifier added successfully");
    }

    setShowModifierForm(false);
    resetForm();
  };

  const resetForm = () => {
    setModifierName("");
    setModifierOptions([{ name: "", price: 0, unit: "gram" }]);
    setErrors({
      modifierName: false,
      modifierOptions: [false],
    });
    setEditingModifierId(null); // Add this line
  };

  // Modifier actions
  const handleEditModifier = (id) => {
    const modifierToEdit = modifiers.find((mod) => mod.id === id);
    if (modifierToEdit) {
      setEditingModifierId(id); // <-- set ID here
      setModifierName(modifierToEdit.name);
      setModifierOptions(modifierToEdit.options);
      setErrors({
        modifierName: false,
        modifierOptions: modifierToEdit.options.map(() => false),
      });
      setShowModifierForm(true);
    }
  };

  const handleDeleteModifier = (id) => {
    setModifierToDelete(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setModifierToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      // If you have an API call:
      // await deleteModifierAPI(modifierToDelete);
      setModifiers(modifiers.filter((mod) => mod.id !== modifierToDelete));
      toast.success("Modifier deleted successfully");
    } catch (error) {
      toast.error("Failed to delete modifier");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setModifierToDelete(null);
    }
  };

  return (
    <div className="dark:bg-gray-900 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        {!showModifierForm && (
          <AddNewButton
            onClick={() => setShowModifierForm(true)}
            label="Add New"
          />
        )}
      </div>

      {showModifierForm ? (
        <div className="bg-white dark:bg-gray-700">
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-300 dark:border-gray-600">
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm rounded">
              <BackButton
                onClick={() => setShowModifierForm(false)}
                className="mr-2"
              />
              <div className="flex items-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-3 rounded-md">
                <span>Modifiers</span>
                <span className="mx-1">/</span>
                <span className="text-primary">Add new modifier</span>
              </div>
            </div>
            <SaveButton
              onClick={handleSaveModifier}
              disabled={!modifierName}
              label={editingModifierId ? "Update Modifier" : "Create Modifier"}
            />
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
            <div className="space-y-6 max-w-full sm:max-w-md">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                <label className="w-28 text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-2 cursor-pointer">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="border-l border-gray-300 dark:border-gray-600 flex-1 px-3 py-2">
                  <input
                    type="text"
                    value={modifierName}
                    onChange={(e) => {
                      setModifierName(e.target.value);
                      setErrors({
                        ...errors,
                        modifierName: !e.target.value.trim(),
                      });
                    }}
                    className={`w-full bg-transparent text-gray-700 dark:text-gray-100 focus:outline-none cursor-pointer ${
                      errors.modifierName ? "border-red-500" : ""
                    }`}
                    required
                  />
                </div>
              </div>
              {errors.modifierName && (
                <p className="text-xs text-red-500 mt-1">
                  Modifier name is required
                </p>
              )}

              <div className="space-y-2">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-md text-gray-500 dark:text-gray-400">
                    Type
                  </p>
                  <FaQuestionCircle className="text-primary text-lg cursor-pointer" />
                </div>
                <div className="flex flex-col items-start border border-gray-300 dark:border-gray-600 rounded-md py-6 px-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative w-5 h-5">
                        <input
                          type="radio"
                          name="modifierType"
                          value="optional"
                          className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          defaultChecked
                        />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary transition-colors"></div>
                        <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                        Optional
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative w-5 h-5">
                        <input
                          type="radio"
                          name="modifierType"
                          value="required"
                          className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary transition-colors"></div>
                        <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                        Required
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-300">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    id="allow-duplicates"
                    className="accent-primary w-5 h-5 cursor-pointer"
                  />
                  Allow adding same choice multiple times
                </label>
                <FaQuestionCircle className="text-primary text-xl cursor-pointer" />
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="text-md text-gray-500 dark:text-gray-400">
                  Modifiers
                </p>
                <FaQuestionCircle className="text-primary text-lg cursor-pointer" />
              </div>

              <div className="space-y-1">
                <div className="hidden sm:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  <span className="col-span-5 cursor-pointer">Name</span>
                  <span className="col-span-3 cursor-pointer">Price</span>
                  <span className="col-span-3 cursor-pointer">Unit</span>
                  <span className="col-span-1"></span>
                </div>

                {modifierOptions.map((option, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start"
                  >
                    <div className="col-span-1 sm:col-span-5 min-h-[64px]">
                      <div className="flex items-center sm:block">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden mr-2">
                          Name:
                        </span>
                        <div className="w-full">
                          <input
                            type="text"
                            className={`w-full px-2 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer ${
                              errors.modifierOptions[index]
                                ? "border-red-500"
                                : ""
                            }`}
                            value={option.name}
                            onChange={(e) =>
                              updateModifierOption(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            required
                          />
                          {errors.modifierOptions[index] && (
                            <p className="text-xs text-red-500 mt-1 whitespace-nowrap">
                              Name is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-3">
                      <div className="flex items-center sm:block">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden mr-2">
                          Price:
                        </span>
                        <input
                          type="number"
                          className="w-full px-2 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer"
                          value={option.price}
                          onChange={(e) =>
                            updateModifierOption(index, "price", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-3">
                      <div className="flex items-center sm:block">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden mr-2">
                          Unit:
                        </span>
                        <input
                          type="text"
                          className="w-full px-2 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none cursor-pointer"
                          value={option.unit}
                          onChange={(e) =>
                            updateModifierOption(index, "unit", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-1 flex justify-end sm:justify-start items-start">
                      {modifierOptions.length > 1 && (
                        <button
                          onClick={() => deleteModifierOption(index)}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer w-full sm:w-auto flex justify-end sm:justify-start mt-[10px] sm:mt-0"
                        >
                          <span className="sm:hidden mr-2 text-xs text-gray-500 dark:text-gray-400">
                            Action:
                          </span>
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="mt-2 px-3 py-2 border border-primary text-primary rounded-md text-sm hover:bg-primary hover:text-white transition cursor-pointer"
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
      ) : (
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
                          onClick={() => handleEditModifier(modifier.id)}
                          className="flex items-center px-3 py-1 text-sm rounded-md"
                        >
                          <img
                            src="https://www.app.menutigr.com/static/media/edit.15f245273e71fb843eeb7281dec04a52.svg"
                            alt="Edit"
                            className="w-4 h-4 mr-2"
                          />
                        </button>
                        <button
                          onClick={() => {
                            setModifierToDelete(modifier.id);
                            setShowDeleteModal(true);
                          }}
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
      {showDeleteModal && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          itemName={
            modifiers.find((m) => m.id === modifierToDelete)?.name ||
            "this modifier"
          }
          itemType="modifier"
          action="delete" // Explicitly setting action to "delete"
        />
      )}
    </div>
  );
};

export default ModifiersTab;
