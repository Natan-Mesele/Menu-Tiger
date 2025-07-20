import React from "react";

const DeleteConfirmationModal = ({
  show,
  onCancel,
  onConfirm,
  itemName,
  itemType,
  action = "delete",
}) => {
  if (!show) return null;

  const actionText = action === "delete" ? "delete" : "restore";
  const actionButtonClass =
    action === "delete"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-primary hover:bg-primary-dark";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Confirm {actionText}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to {actionText} "{itemName}" {itemType}? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-white ${actionButtonClass}`}
          >
            {action === "delete" ? "Delete" : "Restore"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
