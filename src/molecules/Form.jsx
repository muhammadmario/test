import React from "react";

import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

const Form = ({
  formTitle,
  fields,
  onSubmit,
  className,
  helperText,
  helperTextLink,
  link,
  textButton,
}) => {
  return (
    <form className={`form ${className}`} onSubmit={onSubmit}>
      {formTitle && (
        <div className="mb-4 flex w-full justify-center">
          <h2 className="form-title text-xl font-bold">{formTitle}</h2>
        </div>
      )}
      {fields.map((field) => (
        <div key={field.name} className="form-field mb-2">
          <Label htmlFor={field.name} text={field.label} />
          <Input
            type={field.type}
            placeholder={field.placeholder}
            onChange={field.onChange}
            value={field.value}
          />
        </div>
      ))}
      <p className="block md:hidden text-center">
        {helperText}{" "}
        <Link className="text-blue-500" to={link}>
          {helperTextLink}
        </Link>
      </p>
      <div className="w-full flex justify-center items-center pt-4 ">
        <Button type="submit" text={textButton} />
      </div>
    </form>
  );
};

Form.defaultProps = {
  fields: [],
  onSubmit: () => {},
  className: "",
  helperText: "Already have a account?",
  textButton: "Submit",
};

export default Form;
