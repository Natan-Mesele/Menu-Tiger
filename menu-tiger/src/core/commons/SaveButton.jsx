import React from "react";

const SaveButton = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-3 text-md rounded-md text-white shadow-lg transition-colors duration-200 ${
        disabled
          ? "bg-secondary cursor-not-allowed"
          : "bg-secondary hover:bg-primary"
      }`}
    >
      Save
    </button>
  );
};

export default SaveButton;
