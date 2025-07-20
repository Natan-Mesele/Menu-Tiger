import React from "react";
import { FaChevronLeft } from "react-icons/fa";

const BackButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-secondary dark:bg-gray-700 w-11 h-11 cursor-pointer rounded-md hover:bg-primary dark:hover:bg-gray-600 transition-colors duration-200 shadow-lg ${className}`}
    >
      <FaChevronLeft className="text-gray-100 dark:text-gray-300" />
    </button>
  );
};

export default BackButton;
