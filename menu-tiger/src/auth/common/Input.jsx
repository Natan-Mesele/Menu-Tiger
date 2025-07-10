import React from "react";

const Input = ({
  label,
  type = "text",
  id,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-base font-medium text-gray-500 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-gray-700 border border-[#d1fae5] rounded focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-base"
      />
    </div>
  );
};

export default Input;
