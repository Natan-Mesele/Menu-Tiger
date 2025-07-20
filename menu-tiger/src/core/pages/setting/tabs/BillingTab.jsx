import React from "react";

function BillingTab() {
  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm sm:text-md px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-md text-primary dark:bg-gray-700 dark:text-gray-300">
          Billing & Plans
        </h2>
      </div>

      {/* Parallel Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Current Plan Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 sm:p-6">
          <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
            Current Plan
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-200 px-3 sm:px-4 py-4 sm:py-6">
            <div className="flex flex-row gap-2 sm:gap-4 items-center">
              <span className="text-lg sm:text-xl font-semibold text-primary">
                FREEMIUM
              </span>
              <span className="py-1 px-2 sm:px-3 cursor-pointer text-xs bg-secondary hover:bg-primary text-white dark:bg-green-900 dark:text-green-200 rounded-2xl">
                Active
              </span>
            </div>
            <button className="bg-secondary hover:bg-primary text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-2 text-white rounded-md shadow-md mt-2 sm:mt-0 w-full sm:w-auto text-center">
              Manage
            </button>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 sm:p-6">
          <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
            Payment method
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-200 px-3 sm:px-4 py-4 sm:py-6">
            <span className="text-sm sm:text-md text-gray-400">
              No payment method added
            </span>
            <button className="bg-secondary hover:bg-primary text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-2 text-white rounded-md shadow-md mt-2 sm:mt-0 w-full sm:w-auto text-center">
              Manage
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-end mb-4 text-sm sm:text-base">
        <span>Looking to cancel subscription?</span>
        <button className="border border-red-400 px-3 sm:px-4 py-1 rounded-md text-xs sm:text-sm text-red-400 font-medium w-full sm:w-auto text-center">
          Cancel Subscription
        </button>
      </div>

      {/* Upcoming Bill Section */}
      <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 sm:p-6 mb-6">
        <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
          Upcoming Bill
        </h3>
        <div className="w-full overflow-x-auto scrollbar border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="w-full min-w-[600px] text-sm">
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700 w-1/2">
                  Subscription
                </td>
                <td className="p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  1 × Freemium (at $0.00 / month)
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700">
                  Total
                </td>
                <td className="p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  $0.00
                </td>
              </tr>
              <tr>
                <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700">
                  Due on
                </td>
                <td className="p-2 sm:p-3 text-left text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Jul 17, 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Past Invoices Section */}
        <div className="mt-4">
          <h3 className="text-sm sm:text-md font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
            Past Invoices
          </h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <div className="overflow-x-auto scrollbar">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                    >
                      <div className="flex items-center">
                        ID
                        <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-up"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path
                              fill="currentColor"
                              d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                    >
                      <div className="flex items-center">
                        Date
                        <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-up"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path
                              fill="currentColor"
                              d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                    >
                      <div className="flex items-center justify-end">
                        Amount (USD)
                        <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-up"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path
                              fill="currentColor"
                              d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group"
                    >
                      <div className="flex items-center justify-end">
                        Status
                        <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-up"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path
                              fill="currentColor"
                              d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                      <a
                        href="#"
                        className="text-xs sm:text-sm text-primary hover:underline dark:text-primary-300 truncate block max-w-[120px] sm:max-w-none"
                      >
                        in_1Rb4u9BlBJOreIXbfGxIPxBiextenal-link
                      </a>
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Jun 17, 2025
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      $0
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right">
                      <span className="px-2 py-1 text-xs cursor-pointer  text-primary border border-primary  dark:bg-green-900 dark:text-green-200 rounded-md">
                        Paid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingTab;
