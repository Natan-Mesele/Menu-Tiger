import React from "react";

const DuplicateConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Duplicate Menu</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to duplicate this menu?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary"
          >
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateConfirmationModal;
