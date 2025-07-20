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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../../commons/ToastProvider";

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
    accessLevel: "",
  });

  const handleSaveUser = () => {
    // Validation with toast messages
    if (!userFormData.firstName.trim() || !userFormData.lastName.trim()) {
      toast.error("Please enter valid first and last names!", {});
      return;
    }

    if (!userFormData.email.trim()) {
      toast.error("Please enter a valid email!", {});
      return;
    }

    if (
      !editingUserId &&
      (!userFormData.password || !userFormData.confirmPassword)
    ) {
      toast.error("Please enter and confirm the password!", {});
      return;
    }

    if (
      !editingUserId &&
      userFormData.password !== userFormData.confirmPassword
    ) {
      toast.error("Passwords do not match!", {});
      return;
    }

    if (!userFormData.accessLevel) {
      toast.error("Please select an access level!", {});
      return;
    }

    // Save logic
    const userData = {
      id: editingUserId || Date.now(),
      firstName: userFormData.firstName.trim(),
      lastName: userFormData.lastName.trim(),
      email: userFormData.email.trim(),
      accessLevel: userFormData.accessLevel,
    };

    if (editingUserId) {
      setUsers(
        users.map((user) => (user.id === editingUserId ? userData : user))
      );
      toast.success("User updated successfully!", {});
    } else {
      setUsers([...users, userData]);
      toast.success("User added successfully!", {});
    }

    // Reset form
    setShowUserForm(false);
    setEditingUserId(null);
    setUserFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessLevel: "",
    });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
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
        accessLevel: userToEdit.accessLevel,
      });
      setEditingUserId(id);
      setShowUserForm(true);
    }
  };

  return (
    <div>
      {showUserForm ? (
        <div>
          {/* Form Header */}
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

          {/* User Form */}
          <div className="space-y-4 max-w-lg">
            {/* First Name */}
            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
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

            {/* Last Name */}
            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
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

            {/* Email */}
            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
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

            {/* Password */}
            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
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
                  required={!editingUserId} // Not required when editing
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

            {/* Confirm Password */}
            <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
              <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
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
                  required={!editingUserId} // Not required when editing
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

            {/* Access Level */}
            <div className="flex flex-col">
              <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-sm overflow-hidden">
                <label className="w-1/4 px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                  Access Level <span className="text-red-500">*</span>
                </label>
                <div className="relative flex-1">
                  <select
                    name="accessLevel"
                    value={userFormData.accessLevel}
                    onChange={handleUserInputChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none appearance-none"
                    required
                  >
                    <option value="">Select access level</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                    <option value="OrderManager">Order Manager</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
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
          {/* Table View */}
          <div className="flex items-center gap-4 mb-6">
            <AddNewButton
              onClick={() => {
                setUserFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  accessLevel: "",
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

          <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b border-gray-300 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 cursor-pointer text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      First Name
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      Last Name
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      Email
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider group dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      Access Level
                      <FaArrowUp className="opacity-0 group-hover:opacity-100 text-xs transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {user.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {user.accessLevel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit className="text-primary" />
                          </button>
                          <button
                            onClick={() => {
                              setItemToDelete(user.id);
                              setDeleteType("user");
                              setShowDeletePopup(true);
                            }}
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
                    <td colSpan="5" className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                          alt="No users"
                          className="w-16 h-16 mb-4"
                        />
                        <p className="text-gray-500 dark:text-gray-400">
                          No records availble
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ToastProvider />
    </div>
  );
}

export default UsersTab;
