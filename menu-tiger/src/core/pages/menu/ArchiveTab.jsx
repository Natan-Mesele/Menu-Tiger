import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaHistory,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArchiveTab = () => {
  const [archivedMenus, setArchivedMenus] = useState([
    {
      id: 1,
      name: "Summer Specials",
      description:
        "A limited-time summer menu featuring fresh fruits and light meals.",
      date: "2025-07-10",
    },
    {
      id: 2,
      name: "Winter Warmers",
      description: "Hearty dishes for the cold season.",
      date: "2024-12-15",
    },
    {
      id: 3,
      name: "Vegan Delights",
      description: "A full plant-based menu option.",
      date: "2025-01-05",
    },
  ]);

  const [deleteModalState, setDeleteModalState] = useState({
    show: false,
    menuId: null,
    menuName: "",
  });

  const [restoreModalState, setRestoreModalState] = useState({
    show: false,
    menuId: null,
    menuName: "",
  });

  const handleRestoreClick = (id) => {
    const menu = archivedMenus.find((item) => item.id === id);
    setRestoreModalState({
      show: true,
      menuId: id,
      menuName: menu.name,
    });
  };

  const handleConfirmRestore = () => {
    setArchivedMenus(
      archivedMenus.filter((item) => item.id !== restoreModalState.menuId)
    );
    setRestoreModalState({ show: false, menuId: null, menuName: "" });
    toast.success(
      `"${restoreModalState.menuName}" has been restored successfully!`
    );
  };

  const handleCancelRestore = () => {
    setRestoreModalState({ show: false, menuId: null, menuName: "" });
  };

  const handleDeleteClick = (id) => {
    const menu = archivedMenus.find((item) => item.id === id);
    setDeleteModalState({
      show: true,
      menuId: id,
      menuName: menu.name,
    });
  };

  const handleConfirmDelete = () => {
    setArchivedMenus(
      archivedMenus.filter((item) => item.id !== deleteModalState.menuId)
    );
    setDeleteModalState({ show: false, menuId: null, menuName: "" });
     toast.success(`"${deleteModalState.menuName}" has been permanently deleted!`);
  };

  const handleCancelDelete = () => {
    setDeleteModalState({ show: false, menuId: null, menuName: "" });
  };

  return (
    <div className="text-gray-500 dark:text-gray-300">
      <div className="items-center gap-2 mb-6">
        <p className="flex items-center gap-2 text-sm border border-primary dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-3 py-3 w-fit">
          <FaQuestionCircle className="text-primary dark:text-gray-500 text-base" />
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
                    onClick={() => handleRestoreClick(item.id)}
                  >
                    <FaHistory className="text-primary" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                    title="Delete"
                    onClick={() => handleDeleteClick(item.id)}
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

      {/* Delete Confirmation Modal */}
      {deleteModalState.show && (
        <DeleteConfirmationModal
          show={deleteModalState.show}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          itemName={deleteModalState.menuName}
          itemType="menu"
          action="delete"
        />
      )}

      {/* Restore Confirmation Modal */}
      {restoreModalState.show && (
        <DeleteConfirmationModal
          show={restoreModalState.show}
          onCancel={handleCancelRestore}
          onConfirm={handleConfirmRestore}
          itemName={restoreModalState.menuName}
          itemType="menu"
          action="restore"
        />
      )}
    </div>
  );
};

export default ArchiveTab;
