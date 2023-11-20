import React from "react";
import Form from "../molecules/Form";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <section className="bg-gray-200 flex items-center justify-center h-screen w-full">
      <div className="w-full md:w-2/3 max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <Form
          formTitle="Register"
          fields={[
            {
              name: "email",
              label: "Email",
              type: "text",
              placeholder: "Enter your email",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter your password",
            },
          ]}
          onSubmit={(event) => {
            // Handle form submission
            event.preventDefault();
            alert("ayam");
            // Your form submission logic here
          }}
        />
      </div>

      <div className="hidden md:flex md:w-1/3 bg-gray-800 h-screen  flex-col items-center justify-center">
        <h1 className="text-white text-5xl font-bold text-center">
          Already have account?
        </h1>
        <div className="mt-3">
          <p className="text-white text-center">
            Sign up and discover a great amount of new opportunities
          </p>
        </div>
        <div className="mt-3">
          <Link to={"/login"}>
            <Button type="button" text="Sign in" />
          </Link>
        </div>
      </div>
    </section>
  );
}
