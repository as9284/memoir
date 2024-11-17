import React from "react";

import Mountains from "../assets/mountains.webp";
import { FaArrowRightLong } from "react-icons/fa6";

export const Login = () => {
  return (
    <>
      <div className="w-full min-h-dvh m-auto flex flex-col justify-center items-center p-4">
        <div className="relative w-full md:w-3/4 h-[26rem] lg:w-[55rem] lg:h-[36.5rem] bg-memoir-dark rounded-2xl flex justify-center items-center gap-2 p-1 text-memoir-light text-left select-none">
          <img
            className="hidden lg:block w-96 rounded-2xl"
            src={Mountains}
            alt="Image of mountains at dusk"
          />
          <div className="w-full flex flex-col justify-center items-center lg:gap-2">
            <button className="memoir-btn absolute w-36 lg:w-40 h-8 lg:h-12 top-2 right-2 flex justify-center items-center font-medium text-sm lg:text-base gap-2 ">
              Create Account
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
            <div className="w-full flex flex-col justify-center items-center gap-6 px-4">
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <h4 className="w-full lg:w-96">Email</h4>
                <input
                  className="w-full lg:w-96 h-12 rounded-md indent-3 bg-memoir-light text-memoir-dark shadow-md placeholder:text-neutral-500"
                  type="email"
                  name="login-email"
                  id="login-email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <h4 className="w-full lg:w-96">Password</h4>
                <input
                  className="w-full lg:w-96 h-12 rounded-md indent-3 bg-memoir-light text-memoir-dark shadow-md placeholder:text-neutral-500"
                  type="password"
                  name="login-password"
                  id="login-password"
                  placeholder="Enter your password"
                />
              </div>
              <button className="memoir-btn">Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
