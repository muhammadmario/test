import React, { useState } from "react";
import Form from "../molecules/Form";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (email, password) => {
    try {
      const response = await axios.post("https://reqres.in/api/register", {
        email,
        password,
      });
      console.log("Response:", response).data;
    } catch (error) {
      toast.error(`${error.response.data.error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
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
              value: email,
              onChange: (e) => setEmail(e.target.value),
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter your password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
            },
          ]}
          helperText={"Already have a account?"}
          link={"/login"}
          onSubmit={(e) => {
            // Handle form submission
            e.preventDefault();
            handleRegister(email, password);
          }}
        />
      </div>

      <div className="hidden md:flex md:w-1/3 bg-gray-800 h-screen  flex-col items-center justify-center px-4">
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
      <ToastContainer />
    </section>
  );
}
