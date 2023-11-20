import React from "react";

export default function Label({ htmlFor, text, variant }) {
  return (
    <label htmlFor={htmlFor} className={`${variant}`}>
      {text}
    </label>
  );
}

Label.defaultProps = {
  variant: "block mb-2 text-sm font-medium text-gray-900",
  text: "label",
  htmlFor: "label",
};
