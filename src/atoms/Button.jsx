import React from "react";

export default function Button({ type, variant, text, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${variant} `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  text: "Button",
  variant:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",
  disabled: false,
  onClick: () => {},
};
