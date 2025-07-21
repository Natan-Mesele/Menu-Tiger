import React from "react";
import { FaTrash } from "react-icons/fa";

function DeleteModal({ deleteType = "item", onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs w-full text-left">
        <div className="flex items-start gap-3 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Delete {deleteType.charAt(0).toUpperCase() + deleteType.slice(1)}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Are you sure you want to delete this {deleteType}? This action
              cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-xs bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
