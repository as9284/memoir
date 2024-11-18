import React from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  return (
    <div className="absolute top-0 w-full h-24 flex flex-col justify-center items-center gap-4 my-6 select-none">
      <h1 className="text-3xl md:text-5xl font-bold">Memoir</h1>
      <div className="w-full flex justify-center items-center gap-2">
        <button className="memoir-header-btn">New</button>
        <button className="memoir-header-btn">Settings</button>
        <button onClick={handleLogout} className="memoir-header-btn">
          Logout
        </button>
      </div>
    </div>
  );
};
