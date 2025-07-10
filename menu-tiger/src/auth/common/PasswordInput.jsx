import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ label, id, value, onChange, required = false }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-4">
      <label
        htmlFor={id}
        className="block text-base font-medium text-gray-500 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={show ? "text" : "password"}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-gray-700 border border-[#d1fae5] rounded focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 bottom-3 text-gray-500"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
