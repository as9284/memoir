import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Login } from "./pages/Login";
import { Notes } from "./pages/Notes";
import { auth } from "./services/firebase";
import "ldrs/infinity";

export const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-dvh flex items-center justify-center bg-memoir-light z-50">
        <div className="text-lg font-semibold">
          <l-infinity
            size="55"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.3"
            color="black"
          ></l-infinity>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/notes" replace /> : <Login />}
        />
        <Route
          path="/notes"
          element={user ? <Notes /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
