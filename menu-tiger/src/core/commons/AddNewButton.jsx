import React from "react";
import { FaPlus } from "react-icons/fa";

const AddNewButton = ({ onClick, label = "Add New", className = "" }) => {
  return (
    <button
      className={`flex items-center bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary transition cursor-pointer shadow-lg hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      <FaPlus className="mr-2" />
      {label}
    </button>
  );
};

export default AddNewButton;
