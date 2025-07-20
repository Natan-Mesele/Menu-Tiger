import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

function QRPreviewSection() {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Top notice */}
      <div className="flex items-center gap-2 border border-primary rounded-md px-4 py-2">
        <FaQuestionCircle className="text-primary w-4 h-4" />
        <p className="text-sm text-gray-600 text-center max-w-xs">
          Always scan to test that your QR works
        </p>
      </div>

      {/* Background wrapper for heading + image */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 flex flex-col items-center space-y-3 w-full max-w-sm">
        <h4 className="font-medium text-gray-700 dark:text-gray-200">
          QR Code Preview
        </h4>

        <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com&margin=10"
            alt="QR Code Preview"
            className="w-48 h-48"
          />
        </div>
      </div>
    </div>
  );
}

export default QRPreviewSection;
