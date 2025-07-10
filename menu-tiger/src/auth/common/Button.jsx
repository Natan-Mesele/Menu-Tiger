import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white py-2 text-base rounded cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
