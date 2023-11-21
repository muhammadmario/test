import React, { useState, useEffect } from "react";
import Form from "../molecules/Form";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    isLogin && navigate("/");
  }, [isLogin]);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      dispatch(loginUser(response.data));
      navigate("/");
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
          formTitle="Login"
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
          helperText={"Dont have a account?"}
          link={"/register"}
          onSubmit={(e) => {
            // Handle form submission
            e.preventDefault();
            handleLogin(email, password);
            // Your form submission logic here
          }}
        />
      </div>

      <div className="hidden md:flex md:w-1/3 bg-gray-800 h-screen  flex-col items-center justify-center">
        <h1 className="text-white text-5xl font-bold">New Here?</h1>
        <div className="mt-3">
          <p className="text-white text-center">
            Sign up and discover a great amount of new opportunities
          </p>
        </div>
        <div className="mt-3">
          <Link to={"/register"}>
            <Button type="button" text="Sign up" />
          </Link>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
