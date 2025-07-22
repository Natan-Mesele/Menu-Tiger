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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-base font-semibold mb-2 dark:text-white">
          Confirm {action === "delete" ? "Deletion" : "Restoration"}
        </h3>
        <p className="text-sm mb-4 dark:text-gray-300 leading-relaxed">
          Are you sure you want to {actionText} "{itemName}" {itemType}? This
          action cannot be undone.
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
            className={`px-3 py-1.5 text-sm text-white rounded-full ${actionButtonClass}`}
          >
            {action === "delete" ? "Delete" : "Restore"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
