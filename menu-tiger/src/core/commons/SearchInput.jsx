import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChange(e);
  };

  return (
    <div className={`relative w-full sm:w-auto ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 text-sm" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange} // Use the modified handler
        className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary w-full"
      />
    </div>
  );
};

export default SearchInput;
