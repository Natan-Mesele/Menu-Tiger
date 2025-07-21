import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaSearch,
  FaRocket,
  FaUtensils,
  FaChevronRight,
  FaArrowUp,
} from "react-icons/fa";
import OpenAppPanel from "../../commons/OpenAppPanel";
import SearchInput from "../../commons/SearchInput";

function Customers() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 dark:text-gray-100 bg-gray-200 min-h-screen dark:bg-gray-900">
      {/* Header Section (unchanged) */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Customers</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            Manage Your Customers
          </span>
        </div>
        <OpenAppPanel />
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        {/* Search Section */}
        <div className="flex md:flex-row justify-between items-start md:items-center gap-2 mb-6">
          {/* Left: Info with hover arrow (unchanged) */}
          <div className="flex items-center group flex-1">
            <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm border border-primary dark:border-gray-500 rounded-md px-3 py-3 group-hover:pr-2 transition-all duration-200">
              <FaQuestionCircle className="text-primary mr-2" />
              Manage your customers
              <FaChevronRight
                className="ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                size={12}
              />
            </div>
          </div>

          {/* Right: Search - now properly right-aligned */}
          <div className="flex justify-end">
            <SearchInput
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[200px]"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto scrollbar border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group cursor-pointer">
                  <div className="flex items-center">
                    <span>Name</span>
                    <FaArrowUp
                      className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      size={10}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group cursor-pointer">
                  <div className="flex items-center">
                    <span>Email</span>
                    <FaArrowUp
                      className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      size={10}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group cursor-pointer">
                  <div className="flex items-center">
                    <span>Contact No</span>
                    <FaArrowUp
                      className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      size={10}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group cursor-pointer">
                  <div className="flex items-center">
                    <span>Created At</span>
                    <FaArrowUp
                      className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      size={10}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Empty State */}
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                      alt="No customers"
                      className="w-24 h-24 mb-4 opacity-50 dark:opacity-70"
                    />
                    <p className="text-gray-500 dark:text-gray-400">
                      No customers found
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;
