//D:\Astro-main\Astro-main\src\pages\SignUp.jsx
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignIn = () => {
    // Handle sign-in logic here
    navigate("/"); // redirect to home after sign-in
  };

  const handleCancel = () => {
    navigate("/"); // redirect to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822] text-neutral">
      <div className="relative bg-gradient-to-b from-[#6b2400] via-[#f76822] to-[#f76822] rounded-2xl max-w-md w-full p-6 text-center shadow-card">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-neutral hover:text-accent transition-colors"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-accent">Sign In</h2>
        <p className="text-sm mb-6 text-neutral/90">
          Access your account to get personalized insights and future predictions
        </p>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-4">
          <button className="w-full bg-neutral text-dark py-2 rounded-full font-semibold shadow-card hover:bg-primary-light transition-colors">
            Google
          </button>
          <button className="w-full bg-dark text-neutral py-2 rounded-full font-semibold shadow-card hover:brightness-110 transition">
            Apple
          </button>
        </div>

        <p className="text-xs text-neutral/80 mb-3">Or sign in with mobile</p>

        {/* Phone Input */}
        <div className="flex items-center bg-neutral text-dark rounded-full px-3 py-2 mb-3">
          <select className="bg-transparent outline-none pr-2 text-dark">
            <option>+1</option>
            <option>+91</option>
          </select>
          <input
            type="text"
            placeholder="Enter Mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-dark"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            className="w-full bg-accent text-dark py-2 rounded-full font-semibold hover:brightness-110 transition"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <button
            className="w-full text-neutral underline font-semibold hover:text-accent transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

        <p className="text-xs mt-3 text-neutral/80">
          By signing in, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Use</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
