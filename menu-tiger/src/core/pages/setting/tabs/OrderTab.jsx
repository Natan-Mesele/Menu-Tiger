import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SaveButton from "../../../commons/SaveButton";
import ToastProvider from "../../../commons/ToastProvider";

function OrderTab() {
  const [isCustomerTipEnabled, setIsCustomerTipEnabled] = useState(false);
  const [isCancelOrderEnabled, setIsCancelOrderEnabled] = useState(false);
  const [invoiceIdPrefix, setInvoiceIdPrefix] = useState("INVOICE");

  const handleSave = () => {
    setTimeout(() => {
      console.log("Saving order settings:", {
        isCustomerTipEnabled,
        isCancelOrderEnabled,
        invoiceIdPrefix,
      });
      toast.success("Order settings saved successfully!");
    }, 1000);
  };

  return (
    <div>
      {/* Header with Save Button (full width) */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md bg-gray-200 text-gray-700 px-4 py-3 rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
          Order Settings
        </h2>
        <SaveButton onClick={handleSave} />
      </div>

      {/* Divider Line (full width) */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

      {/* Content with restricted width */}
      <div className="max-w-md">
        {/* Customers Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 mb-6">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Customers
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
              <span>Enable Customer Tip</span>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isCustomerTipEnabled}
                  onChange={() =>
                    setIsCustomerTipEnabled(!isCustomerTipEnabled)
                  }
                />
                <div className="relative w-12 h-4 overflow-visible">
                  <div
                    className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                      isCustomerTipEnabled
                        ? "bg-primary/20"
                        : "bg-gray-400 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`absolute -top-[5px] ${
                      isCustomerTipEnabled
                        ? "left-[26px] bg-primary border-primary/50"
                        : "left-0 bg-white border-white"
                    } w-7 h-7 rounded-full border transform transition-all duration-200`}
                  ></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
              <span>Enable Cancel Order</span>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isCancelOrderEnabled}
                  onChange={() =>
                    setIsCancelOrderEnabled(!isCancelOrderEnabled)
                  }
                />
                <div className="relative w-12 h-4 overflow-visible">
                  <div
                    className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                      isCancelOrderEnabled
                        ? "bg-primary/20"
                        : "bg-gray-400 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`absolute -top-[5px] ${
                      isCancelOrderEnabled
                        ? "left-[26px] bg-primary border-primary/50"
                        : "left-0 bg-white border-white"
                    } w-7 h-7 rounded-full border transform transition-all duration-200`}
                  ></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Invoice Section */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Invoice
          </h3>

          <div className="space-y-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
              <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                Invoice ID Prefix <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={invoiceIdPrefix}
                onChange={(e) => setInvoiceIdPrefix(e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <ToastProvider />
    </div>
  );
}

export default OrderTab;
