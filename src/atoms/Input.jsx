import React from "react";

export default function Input({ type, placeholder, onChange, value, variant }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={variant}
      onChange={onChange}
      value={value}
      required
    />
  );
}

Input.defaultProps = {
  type: "text",
  placeholder: "",
  onChange: () => {},
  value: "",
  variant:
    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500",
};
