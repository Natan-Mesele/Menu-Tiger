import React, { useState } from "react";
import {
  FaChevronLeft,
  FaQuestionCircle,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaArrowUp,
} from "react-icons/fa";
import AddNewButton from "../../../commons/AddNewButton";
import BackButton from "../../../commons/BackButton";
import SaveButton from "../../../commons/SaveButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../../commons/ToastProvider";
import DeleteModal from "../components/DeleteModal";

function UsersTab({
  users,
  setUsers,
  setItemToDelete,
  setDeleteType,
  setShowDeletePopup,
}) {
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accessLevel: "Admin",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setLocalItemToDelete] = useState(null);
  const [deleteType, setLocalDeleteType] = useState("user");
  const [isAccessLevelOpen, setIsAccessLevelOpen] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  };

  const handleSaveUser = () => {
    console.log("handleSaveUser called with userFormData:", userFormData);
    console.log("Editing user ID:", editingUserId);

    if (!userFormData.firstName.trim() || !userFormData.lastName.trim()) {
      console.log("Validation failed: Invalid first or last name");
      toast.error("Please enter valid first and last names!", toastOptions);
      return;
    }
    if (!userFormData.email.trim()) {
      console.log("Validation failed: Invalid email");
      toast.error("Please enter a valid email!", toastOptions);
      return;
    }
    if (
      !editingUserId &&
      (!userFormData.password || !userFormData.confirmPassword)
    ) {
      console.log("Validation failed: Password or confirm password missing");
      toast.error("Please enter and confirm the password!", toastOptions);
      return;
    }
    if (
      !editingUserId &&
      userFormData.password !== userFormData.confirmPassword
    ) {
      console.log("Validation failed: Passwords do not match");
      toast.error("Passwords do not match!", toastOptions);
      return;
    }
    if (!userFormData.accessLevel) {
      console.log("Validation failed: Access level not selected");
      toast.error("Please select an access level!", toastOptions);
      return;
    }

    const userData = {
      id: editingUserId || Date.now(),
      firstName: userFormData.firstName.trim(),
      lastName: userFormData.lastName.trim(),
      email: userFormData.email.trim(),
      accessLevel: userFormData.accessLevel,
    };
    console.log("Saving userData:", userData);

    if (editingUserId) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? userData : user
      );
      setUsers(updatedUsers);
      console.log("User updated, new users array:", updatedUsers);
      toast.success("User updated successfully!", toastOptions);
    } else {
      const newUsers = [...users, userData];
      setUsers(newUsers);
      console.log("User added, new users array:", newUsers);
      toast.success("User added successfully!", toastOptions);
    }

    setTimeout(() => {
      setShowUserForm(false);
      setEditingUserId(null);
      setUserFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accessLevel: "Admin",
      });
      console.log("Form reset, showUserForm:", false);
    }, 0);
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name}=${value}`);
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setUserFormData({
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        password: "",
        confirmPassword: "",
        accessLevel: userToEdit.accessLevel || "Admin",
      });
      setEditingUserId(id);
      setShowUserForm(true);
      console.log("Editing user:", userToEdit, "with ID:", id);
    }
  };

  const handleDeleteUser = (id) => {
    setLocalItemToDelete(id);
    setLocalDeleteType("user");
    setShowDeleteModal(true);
    setItemToDelete(id);
    setDeleteType("user");
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting user with id:", itemToDelete);
    setUsers(users.filter((user) => user.id !== itemToDelete));
    setShowDeleteModal(false);
    setLocalItemToDelete(null);
    setItemToDelete(null);
    setDeleteType("");
    setShowDeletePopup(false);
    toast.success("User deleted successfully!", toastOptions);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setLocalItemToDelete(null);
    setItemToDelete(null);
    setDeleteType("");
    setShowDeletePopup(false);
  };

  return (
    <div>
      <ToastProvider />
      {showUserForm ? (
        <div>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <BackButton onClick={() => setShowUserForm(false)} />
              <div className="text-gray-900 dark:text-gray-100 text-md bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md select-none">
                <span>Users</span> <span className="text-gray-400">/</span>{" "}
                <span className="text-primary">
                  {editingUserId ? "Edit User" : "Add New User"}
                </span>
              </div>
            </div>
            <SaveButton onClick={handleSaveUser} />
          </div>

          <div className="space-y-4 max-w-lg">
            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={userFormData.firstName}
                onChange={handleUserInputChange}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={userFormData.lastName}
                onChange={handleUserInputChange}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                placeholder="Enter last name"
                required
              />
            </div>

            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={userFormData.email}
                onChange={handleUserInputChange}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userFormData.password}
                  onChange={handleUserInputChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter password"
                  required={!editingUserId}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <label className="w-1/3 px-4 py-3 text-sm font-medium dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userFormData.confirmPassword}
                  onChange={handleUserInputChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Confirm password"
                  required={!editingUserId}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 transition-colors relative">
                <label className="w-1/4 px-4 py-3 text-sm font-medium dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                  Access Level <span className="text-red-500">*</span>
                </label>
                <div className="relative flex-1">
                  <div
                    className="w-full px-4 py-3 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsAccessLevelOpen(!isAccessLevelOpen)}
                  >
                    <span className="text-gray-700 dark:text-gray-100 truncate">
                      {userFormData.accessLevel || "Select access level"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 dark:text-gray-300 transition-transform ${
                        isAccessLevelOpen ? "rotate-180" : ""
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

                  {isAccessLevelOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden">
                      {["Admin", "User"].map((option) => (
                        <div
                          key={option}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            userFormData.accessLevel === option
                              ? "bg-fifth dark:bg-gray-700"
                              : ""
                          }`}
                          onClick={() => {
                            handleUserInputChange({
                              target: {
                                name: "accessLevel",
                                value: option,
                              },
                            });
                            setIsAccessLevelOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {userFormData.accessLevel === "OrderManager" && (
                <p className="text-xs text-gray-500 mt-1 ml-[25%] pl-4">
                  User can view and manage the orders section only
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm text-sm text-gray-700 dark:text-gray-300">
              <FaQuestionCircle className="text-primary" />
              <span>User can view and manage the orders section only</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <AddNewButton
              onClick={() => {
                setUserFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  accessLevel: "Admin",
                });
                setEditingUserId(null);
                setShowUserForm(true);
              }}
              label="Add New"
              className="py-3"
            />
            <div className="flex items-center gap-2 px-4 py-3 border border-primary dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <FaQuestionCircle className="text-primary" />
              <span>Manage your store users</span>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar border border-gray-300 dark:border-gray-600 rounded-md">
            <table className="min-w-full table-auto">
              <thead className="border-b border-gray-300 dark:border-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors max-w-[150px]">
                    <div className="flex items-center gap-2">
                      First Name
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors max-w-[150px]">
                    <div className="flex items-center gap-2">
                      Last Name
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors max-w-[200px]">
                    <div className="flex items-center gap-2">
                      Email
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors max-w-[150px]">
                    <div className="flex items-center gap-2">
                      Access Level
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider min-w-[80px] sticky right-0 bg-white dark:bg-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-[150px] whitespace-normal break-words">
                        {user.firstName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-[150px] whitespace-normal break-words">
                        {user.lastName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-[200px] whitespace-normal break-words">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-[150px] whitespace-normal break-words">
                        {user.accessLevel}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100 min-w-[80px] sticky right-0 bg-white dark:bg-gray-800">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit className="text-primary" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-sm text-gray-900 dark:text-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="No users"
                          className="w-16 h-16 mb-4"
                        />
                        <p className="text-gray-500 dark:text-gray-400">
                          No records available
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {showDeleteModal && (
            <DeleteModal
              deleteType={deleteType}
              onCancel={handleDeleteCancel}
              onConfirm={handleDeleteConfirm}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default UsersTab;
