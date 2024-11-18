import React from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export const Notes = () => {
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
    <>
      <div className="w-full min-h-dvh bg-cover m-auto flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Your notes</h1>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};
