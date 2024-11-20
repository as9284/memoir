import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Notes } from "../pages/Notes";

export const AppContent = ({ user }) => {
  return (
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
  );
};
