// src/auth/components/LoginForm.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with", email, password, remember);
    navigate("/loading");
  };

  const handleGoogleLogin = () => {
    alert("Google Login Popup Triggered");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4">
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        © 2025 Menu Tiger | All Rights Reserved
      </div>

      <div className="w-full max-w-lg bg-white p-10 rounded shadow relative z-10">
        <div className="flex justify-center mb-6">
          <img
            src="https://www.app.menutigr.com/static/media/logo.a0a99daa325519f7c096f10081e46fe8.svg"
            alt="Logo"
            className="h-20"
          />
        </div>

        <h2 className="text-xl text-gray-500 font-semibold text-center mb-5">
          Log in to your account
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border cursor-pointer border-[#14b8a6] hover:bg-[#d7f7ef] text-[#14b8a6] font-medium py-3 px-4 rounded mb-6 text-base"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-base">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-5">
          <Input
            id="email"
            type="email"
            label="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 mr-2 mt-0.5 cursor-pointer"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember
            </label>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 border border-gray-300 rounded p-3 w-full max-w-xs mx-auto bg-[#F9F9F9]">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-6 h-6 mr-2 cursor-pointer" />
              <span className="text-lg">I'm not a robot</span>
            </label>
            {/* Right side: image and terms */}
            <div className="flex flex-col items-center">
              <img
                src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                alt="reCAPTCHA"
                className="h-7 w-7 mb-1"
              />
              <div className="text-[10px] text-gray-500 font-medium">
                reCAPTCHA
              </div>
              <div className="text-[10px] text-gray-500 font-medium">
                Privacy - Terms
              </div>
            </div>
          </div>

          <Button type="submit">Sign in</Button>
        </form>

        <div className="text-center mb-4">
          <a
            href="#"
            className="text-[#14b8a6] text-md cursor-pointer font-semibold"
          >
            Forgot password?
          </a>
        </div>

        <p className="text-center text-base text-gray-600 cursor-pointer">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#14b8a6] font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
