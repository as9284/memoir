import React from "react";
import Bg from "../assets/bg.webp";
import { LoginSection } from "../components/LoginSection";

export const Login = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${Bg})`,
        }}
        className="w-full min-h-dvh bg-cover m-auto flex flex-col justify-center items-center"
      >
        <div className="absolute w-full min-h-dvh bg-memoir-light/80 backdrop-blur-2xl flex flex-col justify-center items-center p-4">
          <LoginSection />
        </div>
      </div>
    </>
  );
};
