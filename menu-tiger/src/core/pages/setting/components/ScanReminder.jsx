import React from "react";
import { FaQrcode } from "react-icons/fa";

function ScanReminder() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
      <FaQrcode className="text-primary" />
      <span>
        Ensure your QR code is scannable by customers to access your store’s
        menu or services.
      </span>
    </div>
  );
}

export default ScanReminder;
