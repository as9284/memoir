import React, { useState } from "react";
import Bg from "../assets/bg.webp";
import { LoginSection } from "../components/LoginSection";
import { SignupSection } from "../components/SignupSection";

export const Login = () => {
  const [section, setSection] = useState("login");

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${Bg})`,
        }}
        className="w-full min-h-dvh bg-cover m-auto flex flex-col justify-center items-center"
      >
        <div className="w-full min-h-screen bg-memoir-light/40 backdrop-blur-2xl flex flex-col justify-center items-center p-4">
          {section === "login" ? (
            <LoginSection setSection={setSection} />
          ) : (
            <SignupSection setSection={setSection} />
          )}
        </div>
      </div>
    </>
  );
};
