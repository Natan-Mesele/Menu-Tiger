import React from "react";
import { FaUtensils } from "react-icons/fa";

const OpenAppPanel = ({ onClick }) => {
  return (
    <div className="flex items-center space-x-4 cursor-pointer border border-gray-300 dark:border-gray-600 rounded-md p-2">
      <img
        src="https://www.app.menutigr.com/static/media/copy.f4a907cfacfdd8f91d823668cd6856bb.svg"
        alt="Copy Icon"
        className="w-6 h-6"
      />
      <img
        src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
        alt="QR Icon"
        className="w-6 h-6"
      />
      <button
        className="bg-primary text-white px-5 py-2 rounded-md flex items-center hover:bg-teal-700 transition-colors duration-200"
        onClick={onClick || (() => alert("Open App clicked!"))}
      >
        <FaUtensils className="mr-2" />
        Open App
      </button>
    </div>
  );
};

export default OpenAppPanel;
