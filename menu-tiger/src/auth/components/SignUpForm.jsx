// src/auth/components/SignUpForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert("You must agree to the terms to continue.");
      return;
    }
    console.log("Sign Up with", email, password);
  };

  const handleGoogleSignUp = () => {
    alert("Google Sign-Up Popup Triggered");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4">
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        © 2025 Menu Tiger | All Rights Reserved
      </div>

      <div className="w-full max-w-lg bg-white p-10 rounded shadow relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://www.app.menutigr.com/static/media/logo.a0a99daa325519f7c096f10081e46fe8.svg"
            alt="Logo"
            className="h-20"
          />
        </div>

        {/* Header */}
        <h2 className="text-xl text-gray-700 font-semibold text-center mb-2">
          Sign Up
        </h2>
        <p className="text-base text-center text-gray-500 mb-6">
          Enter your credentials to continue
        </p>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center cursor-pointer justify-center border border-[#14b8a6] hover:bg-[#d7f7ef] text-[#14b8a6] font-medium py-3 px-4 rounded mb-6 text-base"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-base">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Form */}
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

          {/* Terms Checkbox */}
          <div className="flex items-start text-sm text-gray-600">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="w-5 h-5 mr-2 mt-0.5 cursor-pointer"
            />
            <label htmlFor="agree">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="text-[#14b8a6] cursor-pointer font-semibold"
              >
                Terms of Use
              </a>
            </label>
          </div>

          <Button type="submit">Get started</Button>
        </form>

        {/* Back to login */}
        <div className="text-center mt-6">
          <p className="text-base text-gray-600 mb-2">
            Already have an account?{" "}
            <Link to="/" className="text-[#14b8a6] font-semibold">
              Login
            </Link>
          </p>
          <a
            href="/"
            className="flex items-center justify-center text-[#14b8a6] text-sm font-semibold"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
