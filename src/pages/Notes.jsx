import React from "react";
import { Header } from "../components/Header";

export const Notes = () => {
  return (
    <>
      <div className="w-full min-h-dvh bg-cover m-auto flex flex-col justify-center items-center">
        <Header />
        <h4 className="text-lg opacity-50 font-medium text-center select-none">
          Looks very empty in here...
        </h4>
      </div>
    </>
  );
};
