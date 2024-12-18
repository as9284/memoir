import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Mountains from "../assets/mountains.webp";

export const SignupSection = ({ setSection }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
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
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: inputValue });

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });
      setIsLoading(false);
      setSection("login");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full sm:w-3/5 md:w-3/6 h-[33rem] lg:w-[55rem] lg:h-[36.5rem] bg-memoir-dark rounded-2xl shadow-xl flex justify-center items-center gap-2 p-1 text-memoir-light text-left select-none">
      <img
        className="hidden lg:block w-96 rounded-2xl"
        src={Mountains}
        alt="Image of mountains at dusk"
      />
      <div className="w-full flex flex-col justify-center items-center lg:gap-2">
        <button
          onClick={() => setSection("login")}
          className="memoir-btn absolute w-44 h-8 top-2 right-2 flex justify-center items-center font-medium text-sm gap-2 "
        >
          Login to account
          <span>
            <FaArrowRightLong />
          </span>
        </button>
        <h1 className="text-2xl lg:text-5xl font-bold lg:py-2">
          Create an account
        </h1>
        <p className="text-sm lg:text-base font-medium">
          to make memories last forever
        </p>
        <form
          className="w-full flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col justify-center items-center gap-4 px-4">
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <h4 className="w-full lg:w-96">Name</h4>
              <input
                className={`w-full lg:w-96 h-12 rounded-md indent-3 bg-memoir-light text-memoir-dark shadow-md placeholder:text-neutral-500 ${
                  formErrors.name ? "error" : ""
                }`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={formErrors.name || "Enter your name"}
              />
            </div>
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
            <div className="w-full flex justify-center  items-center gap-2 px-4">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-5 h-5 accent-memoir-light hover:brightness-90"
              />
              <label className="text-sm lg:text-base text-memoir-light">
                I agree to the{" "}
                <span className="underline cursor-pointer font-bold">
                  Privacy Policy
                </span>
              </label>
            </div>
            {formErrors.agreeToTerms && (
              <p className="text-red-500 font-bold text-xs">
                {formErrors.agreeToTerms}
              </p>
            )}
            <button
              type="submit"
              className="memoir-btn"
              disabled={
                isLoading ||
                formErrors.name ||
                formErrors.email ||
                formErrors.password
              }
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
