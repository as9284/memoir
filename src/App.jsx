import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Login } from "./pages/Login";
import { Notes } from "./pages/Notes";
import { auth } from "./services/firebase";
import { Loading } from "./components/Loading";

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
    return <Loading />;
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
