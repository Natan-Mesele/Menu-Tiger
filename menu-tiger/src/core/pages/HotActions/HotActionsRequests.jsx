import React, { useState, useRef } from "react";
import {
  FaCar,
  FaChevronDown,
  FaArrowUp,
  FaStore,
  FaFilter,
} from "react-icons/fa";

function HotActionsRequests() {
  const [selectedRange, setSelectedRange] = useState("Today");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const firstDropdownRef = useRef(null);
  const secondDropdownRef = useRef(null);

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-4 w-full">
        {/* First three buttons */}
        <button
          className={`w-full px-4 py-3 border rounded-md text-sm transition-colors duration-200 cursor-pointer ${
            selectedRange === "Today"
              ? "bg-primary text-white border-primary font-medium"
              : "border-primary dark:border-gray-600 bg-white dark:bg-gray-800 text-primary font-medium dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => setSelectedRange("Today")}
        >
          Today
        </button>

        <button
          className={`w-full px-4 py-3 border rounded-md text-sm transition-colors duration-200 cursor-pointer ${
            selectedRange === "Week"
              ? "bg-primary text-white border-primary font-medium"
              : "border-primary dark:border-gray-600 bg-white dark:bg-gray-800 text-primary font-medium dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => setSelectedRange("Week")}
        >
          Week
        </button>

        <button
          className={`w-full px-4 py-3 border rounded-md text-sm transition-colors duration-200 cursor-pointer ${
            selectedRange === "Month"
              ? "bg-primary text-white font-medium border-primary"
              : "border-primary dark:border-gray-600 bg-white dark:bg-gray-800 text-primary font-medium dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => setSelectedRange("Month")}
        >
          Month
        </button>

        {/* First dropdown - Status */}
        <div className="relative w-full" ref={firstDropdownRef}>
          <button
            className="flex items-center w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 cursor-pointer text-left"
            onClick={() => setFirstDropdownOpen(!firstDropdownOpen)}
          >
            <FaStore className="absolute left-3 text-primary text-lg dark:text-gray-500" />
            <span className="ml-2 truncate">{selectedStatus}</span>
            <FaChevronDown className="absolute right-3 text-gray-400 dark:text-gray-500" />
          </button>

          {firstDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
              {["All", "Tiger"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedStatus(item);
                    setFirstDropdownOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Second dropdown - Payment */}
        <div className="relative w-full" ref={secondDropdownRef}>
          <button
            className="flex items-center w-full px-10 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 cursor-pointer text-left"
            onClick={() => setSecondDropdownOpen(!secondDropdownOpen)}
          >
            <FaCar className="absolute left-3 text-primary text-2xl dark:text-gray-500" />
            <span className="ml-2 truncate">{selectedPayment}</span>
            <FaChevronDown className="absolute right-3 text-gray-400 dark:text-gray-500" />
          </button>
          {secondDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
              {["All", "Active", "Approved"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedPayment(item);
                    setSecondDropdownOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Last button */}
        <button className="w-full bg-gray-300 text-gray-500 font-medium px-4 py-3 rounded-md text-sm cursor-pointer">
          Apply Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {[
                "Icon",
                "Header",
                "Table",
                "Status",
                "Requested By",
                "Approved on",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
                >
                  <div className="flex items-center justify-center cursor-pointer select-none">
                    <span>{header}</span>
                    <FaArrowUp className="ml-1 text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td colSpan="6" className="px-4 py-10 text-center">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                    alt="No Records"
                    className="w-20 h-20 sm:w-28 sm:h-28 mb-3"
                  />
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    No records available
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

export default HotActionsRequests;
