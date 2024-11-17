import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Mountains from "../assets/mountains.webp";

export const LoginSection = ({ setSection }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("Logged in user:", userCredential.user);

      alert("Login successful!");
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error.message);

      if (error.code === "auth/user-not-found") {
        setFormErrors((prev) => ({
          ...prev,
          email: "No account found with this email.",
        }));
      } else if (error.code === "auth/wrong-password") {
        setFormErrors((prev) => ({
          ...prev,
          password: "Incorrect password.",
        }));
      } else {
        alert("An error occurred. Please try again.");
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full sm:w-3/5 md:w-3/6 h-[26rem] lg:w-[55rem] lg:h-[36.5rem] bg-memoir-dark rounded-2xl shadow-xl flex justify-center items-center gap-2 p-1 text-memoir-light text-left select-none">
      <img
        className="hidden lg:block w-96 rounded-2xl"
        src={Mountains}
        alt="Image of mountains at dusk"
      />
      <div className="w-full flex flex-col justify-center items-center lg:gap-2">
        <button
          onClick={() => setSection("signup")}
          className="memoir-btn absolute w-44 h-8 top-2 right-2 flex justify-center items-center font-medium text-sm gap-2 "
        >
          Create new account
          <span>
            <FaArrowRightLong />
          </span>
        </button>
        <h1 className="text-2xl lg:text-5xl font-bold lg:py-2">
          Login to Memoir
        </h1>
        <p className="text-sm lg:text-base font-medium">
          because memories are priceless
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center gap-4 px-4"
        >
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <h4 className="w-full lg:w-96">Email</h4>
            <input
              className={`w-full lg:w-96 h-12 rounded-md indent-3 bg-memoir-light text-memoir-dark shadow-md placeholder:text-neutral-500 ${
                formErrors.email ? "error" : ""
              }`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={formErrors.email || "Enter your email"}
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <h4 className="w-full lg:w-96">Password</h4>
            <input
              className={`w-full lg:w-96 h-12 rounded-md indent-3 bg-memoir-light text-memoir-dark shadow-md placeholder:text-neutral-500 ${
                formErrors.password ? "error" : ""
              }`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={formErrors.password || "Enter your password"}
            />
          </div>
          <button
            type="submit"
            className="memoir-btn"
            disabled={isLoading || formErrors.email || formErrors.password}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
