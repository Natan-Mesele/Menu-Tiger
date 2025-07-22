import React from "react";
import { FaTrash } from "react-icons/fa";

function DeleteModal({ deleteType = "item", onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Delete {deleteType.charAt(0).toUpperCase() + deleteType.slice(1)}
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete this {deleteType}? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 bg-red-600 text-sm text-white rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
