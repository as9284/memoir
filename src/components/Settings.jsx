import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Settings = ({ closeModal, setMode, currentMode }) => {
  const [theme, setTheme] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      closeModal();
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("No user is currently signed in.");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setError("The password you entered is incorrect.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection.");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
          break;
      }
      setConfirmDelete(false);
    }
  };

  useEffect(() => {
    setTheme(currentMode);
  }, [currentMode]);

  return (
    <div
      id="modal-backdrop"
      onClick={handleOutsideClick}
      className="fixed w-full min-h-dvh bg-memoir-dark/60 flex flex-col justify-center items-center select-none"
    >
      <div className="relative w-80 h-auto bg-memoir-light drop-shadow-lg rounded-xl flex flex-col justify-center items-center gap-4 p-4 text-center dark:bg-memoir-darker duration-200">
        <h3 className="text-2xl font-bold">Settings</h3>
        <div className="w-full flex flex-col justify-center items-center">
          <h5 className="text-base font-medium">Theme</h5>
          <div className="relative w-3/4 h-10 rounded-xl shadow-md flex justify-center items-center dark:bg-memoir-light duration-200">
            <div
              className={`absolute w-1/2 h-full rounded-lg bg-memoir-dark duration-200 z-0 ${
                theme === "light" ? "left-0" : "left-1/2"
              }`}
            ></div>
            <button
              onClick={() => setMode("light")}
              className="w-full h-full rounded-lg text-memoir-light dark:text-memoir-dark z-10 duration-200"
            >
              Light
            </button>
            <button
              onClick={() => setMode("dark")}
              className="w-full h-full rounded-lg text-memoir-dark dark:text-memoir-light z-10 duration-200"
            >
              Dark
            </button>
          </div>
        </div>
        {confirmDelete && (
          <>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              className={`w-72 h-12 rounded-md indent-3 bg-memoir-dark text-memoir-light shadow-md placeholder:text-neutral-300 ${
                error ? "border-red-500 border-2" : ""
              }`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </>
        )}
        <div className="w-full flex justify-center items-center gap-2">
          <button
            onClick={handleLogout}
            className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className={`memoir-btn-dark w-32 dark:memoir-btn dark:w-32`}
          >
            {confirmDelete ? "Confirm Delete" : "Delete Account"}
          </button>
        </div>
        <button
          onClick={closeModal}
          className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
        >
          Close
        </button>
      </div>
    </div>
  );
};
