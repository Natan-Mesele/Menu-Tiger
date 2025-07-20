import React from "react";

function DeveloperTab() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
          Developer Settings
        </h2>
      </div>

      {/* Divider Line */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

      {/* Content */}
      <div className="max-w-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">
            Personal Access Tokens
          </h3>
          <button className="text-white text-sm font-medium bg-[#D84343] hover:bg-[#C62828] px-4 py-2 rounded-sm">
            Revoke All
          </button>
        </div>

        {/* Token Creation Form */}
        <div className="bg-gray-100 p-6 mb-8">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md mb-4">
            <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
              Token name
            </label>
            <input
              type="text"
              className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
              placeholder="Enter token name"
            />
          </div>

          <div className="flex justify-center mb-4">
            <span className="text-gray-500 bg-gray-300 px-4 py-3 rounded-sm">
              Generate New Token
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tokens you have generated that can be used to access Menutiger API
          </p>
        </div>

        {/* Tokens List */}
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
            alt="No tokens"
            className="h-24 w-24 mb-4"
          />
          <p className="text-gray-500 dark:text-gray-400">
            No records available
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeveloperTab;
