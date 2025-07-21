import React, { useState } from "react";
import { FaDownload, FaArrowUp } from "react-icons/fa";
import SearchInput from "../../commons/SearchInput";

function FeedbackTab() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <button className="flex items-center border border-primary dark:border-gray-600 text-primary dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          <FaDownload className="mr-2 text-primary" />
          Download CSV
        </button>
        <SearchInput
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-[180px] sm:w-64"
        />
      </div>

      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
              {["Survey name", "Date"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 font-semibold group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {header}
                    <FaArrowUp className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                    alt="No feedback available"
                    className="w-24 h-24 mb-4 opacity-75"
                  />
                  <p className="text-gray-500 dark:text-gray-400">
                    No feedback surveys available
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeedbackTab;
